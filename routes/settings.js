const express = require('express')
const router = express.Router()
const { User, Setting } = require('../models/index')
const errorHandler = require('../middleware/error-handler')

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
  if (!req.user || req.user.level !== User.ADMIN) {
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

module.exports = router
