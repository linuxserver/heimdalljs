const express = require('express')
const router = express.Router()
const { User, Setting } = require('../models/index')
const _ = require('lodash')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const showUsers = await Setting.findOne({ where: { key: 'show_usernames' } })
  if (!showUsers || showUsers.value !== 'yes') {
    return res.status(403).json({
      status: 'ok',
      result: null
    })
  }

  const users = await User.findAll()

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
      avatar: user.avatar,
      publicPage: _.get(user.options, 'publicPage', false)
    }))
  })
})

router.post('/', async (req, res, next) => {
  const usersCount = await User.count()

  // Do we want to prevent user registration unless logged in?
  if (usersCount !== 0 && !req.user) {
    return res.status(403).json({
      status: 'error',
      result: 'unauthorized'
    })
  }

  if (usersCount > 0 && req.user.level !== User.ADMIN) {
    delete req.body.level
  }

  const existing = await User.findOne({
    where: {
      email: req.body.email
    }
  })

  if (existing) {
    return res.status(400).json({
      stattus: 'error',
      result: 'Email already exists'
    })
  }

  const user = await User.create(req.body)

  return res.json({
    status: 'ok',
    result: user.toJSON()
  })
})

router.put('/', async (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({
      status: 'error',
      result: 'unauthorized'
    })
  }

  // Only admins can alter user levels
  if (req.user.level !== User.ADMIN) {
    delete req.body.level
  }

  if (req.body.currentPassword) {
    if (!req.user.verifyPassword(req.body.currentPassword)) {
      return res.status(400).json({
        status: 'error',
        result: 'Incorrect password'
      })
    }
  } else {
    // If we didn't pass up the current password, don't submit a new password
    delete req.body.password
  }

  await req.user.update(req.body)

  return res.json({
    status: 'ok'
  })
})

module.exports = router
