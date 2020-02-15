const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { User } = require('../models/index')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

router.post('/login', async (req, res, next) => {
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  })

  if (!user || !user.verifyPassword(req.body.password)) {
    return res.status(403).json([])
  }

  const payload = {
    id: user.id,
    email: user.email,
    updated: user.updatedAt.toString()
  }

  /**
   * @TODO: centralize signing token into config
   */
  const token = jwt.sign(payload, 'CHANGE_ME', {
    expiresIn: 36000
  })

  return res.json({
    ...user.toJSON(),
    token: token
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
        status: 'setup'
      })
    }

    return res.json({
      status: 'unauthorized',
      data: 'You are either not logged in or do not have access to this data'
    })
  }

  return res.json({
    status: 'ok',
    data: req.user.toJSON()
  })
})

module.exports = router
