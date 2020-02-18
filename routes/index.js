const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { User } = require('../models/index')
const config = require('../config/config')

router.post('/login', async (req, res, next) => {
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  })

  if (!user || !user.verifyPassword(req.body.password)) {
    return res.status(403).json({
      status: 'error',
      result: 'unauthorized'
    })
  }

  const payload = {
    id: user.id,
    username: user.username,
    updated: user.updatedAt.toString()
  }

  /**
   * @TODO: centralize signing token into config
   */
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

router.get('/ping', async (req, res, next) => {
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

    return res.json({
      status: 'unauthorized',
      result: 'You are either not logged in or do not have access to this data'
    })
  }

  return res.json({
    status: 'ok',
    result: req.user.toJSON()
  })
})

module.exports = router
