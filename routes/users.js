const express = require('express')
const router = express.Router()
const { User, Setting } = require('../models/index')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const Speakeasy = require('speakeasy')
const QRCode = require('qrcode')
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: require('../config/config').uploadDir })
const fs = require('fs')
const config = require('../config/config')
const errorHandler = require('../middleware/error-handler')

/**
 * Retrieve all users
 */
router.get(
  '/',
  errorHandler(async (req, res, next) => {
    const users = await User.findAll()

    if (req.user.level === User.ADMIN) {
      return res.json({
        status: 'ok',
        result: users.map(user => user.toJSON())
      })
    }

    const showUsers = await Setting.findOne({
      where: { key: 'show_usernames' }
    })
    if (!showUsers || showUsers.value !== 'yes') {
      return res.json({
        status: 'ok',
        result: null
      })
    }

    if (!users.length) {
      return res.json({
        status: 'ok',
        result: []
      })
    }

    return res.json({
      status: 'ok',
      result: users.map(user => ({
        id: user.id,
        username: user.username,
        hasPassword: user.password !== null,
        avatar: user.avatar,
        publicPage: _.get(user.options, 'publicPage', false)
      }))
    })
  })
)

/**
 * Create a new user
 */
router.post(
  '/',
  errorHandler(async (req, res, next) => {
    const usersCount = await User.count()

    // Do we want to prevent user registration unless logged in?
    if (usersCount !== 0 && !req.user) {
      return res.status(403).json({
        status: 'error',
        result: 'unauthorized'
      })
    }
    //Only admins can create users
    if (usersCount > 0 && req.user.level !== User.ADMIN) {
      delete req.body.level
    }

    const existing = await User.findOne({
      where: {
        username: req.body.username
      }
    })

    if (existing) {
      return res.status(400).json({
        status: 'error',
        result: 'username_exists'
      })
    }
    let pass = null
    if (req.body.password) {
      pass = bcrypt.hashSync(req.body.password, 10)
    } else {
      pass = null
    }

    const user = await User.create({
      username: req.body.username,
      password: pass,
      email: req.body.email,
      level: req.body.level,
      settings: req.body.settings
    })

    return res.json({
      status: 'ok',
      result: user.toJSON()
    })
  })
)

/**
 * Update an existing user record
 */
router.put(
  '/:id',
  errorHandler(async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        result: 'unauthorized'
      })
    }

    // Only admins can alter user levels
    if (req.user.level !== User.ADMIN) {
      delete req.body.level
    }

    // only admins can edit other users
    if (req.user.id.toString() !== req.params.id && req.user.level !== User.ADMIN) {
      return res.status(401).json({
        status: 'error',
        result: 'unauthorized'
      })
    }

    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    })

    if (req.body.updatePass) {
      if (req.body.password) {
        let pass = bcrypt.hashSync(req.body.password, 10)
        user.update({
          password: pass
        })
      } else {
        user.update({
          password: null
        })
      }
      delete req.body.password
    } else if (!req.body.updatePass) {
      delete req.body.password
    }

    /**
     * This is just a security precaution.
     * ALWAYS DELETE totp, this should only be set by the server.
     */
    delete req.body.totpSecret

    // Begin process to set up and confirm multi-factor authentication
    if (user.multifactorEnabled === false && !!req.body.multifactorEnabled === true) {
      const secret = Speakeasy.generateSecret({ length: 10 })
      const url = Speakeasy.otpauthURL({
        secret: secret.base32,
        encoding: 'base32',
        issuer: 'Heimdall',
        label: user.username
      })
      const qrcode = await QRCode.toDataURL(url, { scale: 6 })
      user.update({
        totpSecret: secret.base32
      })

      return res.json({
        status: 'confirm totp',
        qrcode: qrcode,
        code: secret.base32
      })
    } else if (user.multifactorEnabled === false && req.body.totp) {
      if (
        Speakeasy.totp.verify({
          secret: user.totpSecret,
          encoding: 'base32',
          token: parseInt(req.body.totp, 10),
          window: 0
        })
      ) {
        user.update({
          multifactorEnabled: true
        })

        return res.json({
          status: 'ok'
        })
      }

      return res.json({
        status: 'error',
        result: 'invalid_totp'
      })
    } else if (user.multifactorEnabled === true && !!req.body.multifactorEnabled === false) {
      user.update({
        multifactorEnabled: false,
        totpSecret: null
      })

      return res.json({ status: 'ok' })
    }
    await user.update(req.body)

    return res.json({
      status: 'ok'
    })
  })
)

/**
 * Upload an avatar file for a user
 */
router.put(
  '/:id/avatar',
  upload.single('avatar'),
  errorHandler(async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        result: 'unauthorized'
      })
    }

    // users can only change their avatar
    if (req.user.id.toString() !== req.params.id && req.user.level !== User.ADMIN) {
      return res.status(401).json({
        status: 'error',
        result: 'unauthorized'
      })
    }

    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    })

    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        result: 'upload file missing'
      })
    }

    const newAvatar = `${req.file.filename}${path.extname(req.file.originalname)}`
    fs.renameSync(path.join(req.file.destination, req.file.filename), path.join(config.uploadDir, 'avatars', newAvatar))

    if (user.avatar) {
      try {
        fs.unlinkSync(path.join(config.uploadDir, user.avatar))
      } catch (e) {}
    }

    await user.update({ avatar: `/avatars/${newAvatar}` })

    return res.json({
      status: 'ok'
    })
  })
)

module.exports = router
