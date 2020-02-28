const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { User } = require('../models/index')
const config = require('../config/config')
const path = require('path')
const Speakeasy = require('speakeasy')
const axios = require('axios')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendfile(path.join(__dirname, '../dist/spa/index.html'))
})

router.post('/login', async (req, res, next) => {
  if (req.user) {
    // User is already logged in
    return res.json({
      status: 'ok',
      result: null
    })
  }

  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  })

  if (!user || !user.verifyPassword(req.body.password)) {
    return res.status(403).json({
      status: 'error',
      result: 'invalid_user'
    })
  }

  if (user.multifactorEnabled && !req.body.totp) {
    return res.json({
      status: 'multifactor'
    })
  }

  if (user.multifactorEnabled && req.body.totp) {
    const valid = Speakeasy.totp.verify({
      secret: user.totpSecret,
      encoding: 'base32',
      token: req.body.totp,
      window: 0
    })

    if (!valid) {
      return res.status(403).json({
        status: 'error',
        result: 'invalid_code'
      })
    }
  }

  const payload = {
    id: user.id,
    username: user.username,
    updated: user.updatedAt.toString()
  }

  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: 36000
  })

  return res.json({
    status: 'ok',
    result: {
      ...user.toJSON(),
      token: token
    }
  })
})

router.get('/auth', async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'unauthorized',
      result: null
    })
  }

  return res.json({
    status: 'ok',
    result: req.user.toJSON()
  })
})

router.get('/status', async (req, res, next) => {
  if (!req.user) {
    // If unauthenticated, check to make sure we have a user at all
    const userCount = await User.count({
      where: {}
    })

    if (userCount === 0) {
      return res.json({
        status: 'setup',
        result: null
      })
    }
  }

  const status = req.user ? req.user.toJSON() : null

  return res.json({
    status: 'ok',
    result: status
  })
})

router.get('/cors/:url*', async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'unauthorized',
      result: null
    })
  }

  const response = await axios.get(req.params.url)

  return res.send(response.data)
})

module.exports = router
