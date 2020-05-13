const express = require('express')
const router = express.Router()
const { User, Setting } = require('../models/index')
const errorHandler = require('../middleware/error-handler')
const multer = require('multer')
const config = require('../config/config')
const upload = multer({ dest: config.uploadDir })
const fs = require('fs')
const path = require('path')

/**
 * Retrieve all avialable settings
 */
router.get('/', errorHandler(async (req, res, next) => {
  const settings = await Setting.findAll()

  return res.json({
    status: 'ok',
    result: settings
  })
}))

/**
 * Update all settings passed in request
 */
router.put('/', errorHandler(async (req, res, next) => {
  const usersCount = await User.count()
  if ((!req.user || req.user.level !== User.ADMIN) && usersCount !== 0 ) {
    return res.status(403).json({
      status: 'error',
      result: 'unauthorized'
    })
  }

  for (const key in req.body) {
    await Setting.update({
      value: req.body[key]
    }, {
      where: {
        key
      }
    })
  }

  return res.json({
    status: 'ok',
    result: null
  })
}))

/**
 * Upload an icon file to associate with the item
 */
router.put('/background', upload.single('background'), errorHandler(async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      result: 'unauthorized'
    })
  }

  const setting = await Setting.findOne({
    where: {
      key: 'background'
    }
  })

  if (!setting) {
    return res.status(404).json({
      status: 'error',
      result: null
    })
  }

  if (!req.file) {
    return res.status(400).json({
      status: 'error',
      result: 'upload file missing'
    })
  }

  const newBackground = `${req.file.filename}${path.extname(req.file.originalname)}`
  fs.renameSync(path.join(req.file.destination, req.file.filename), path.join(config.uploadDir, 'backgrounds', newBackground))
  const background = `/backgrounds/${newBackground}`

  if (setting.value) {
    try {
      fs.unlinkSync(path.join(config.uploadDir, setting.value))
    } catch (e) { }
  }

  await setting.update({ value: background })

  return res.json({ status: 'ok' })
}))

module.exports = router
