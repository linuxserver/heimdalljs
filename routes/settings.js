const express = require('express')
const router = express.Router()
const { User, Setting } = require('../models/index')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const settings = await Setting.findAll()

  return res.json({
    status: 'ok',
    data: settings
  })
})

router.put('/', async (req, res, next) => {
  if (!req.user || req.user.level !== User.ADMIN) {
    return res.status(403).json({
      status: 'error',
      data: 'unauthorized'
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
    data: null
  })
})

module.exports = router
