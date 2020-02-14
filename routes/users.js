const express = require('express')
const router = express.Router()
const { User } = require('../models/index')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  // res.render('index', { title: 'Express' })
  const users = await User.findAll()

  if (!users.length) {
    return res.json({
      error: true,
      message: 'no users'
    })
  }

  return res.json(users)
})

router.post('/', async (req, res, next) => {
  const usersCount = await User.count()

  // Do we want to prevent user registration unless logged in?
  if (usersCount !== 0 && !req.user) {
    return res.status(403).json([])
  }

  const existing = await User.findOne({
    where: {
      email: req.body.email
    }
  })

  if (existing) {
    return res.status(400).json({
      success: false,
      message: 'Email already exists'
    })
  }

  const user = await User.create(req.body)

  return res.json(user)
})

router.put('/', async (req, res, next) => {
  if (!req.user) {
    return res.status(403).json([])
  }

  if (req.body.currentPassword) {
    if (!req.user.verifyPassword(req.body.currentPassword)) {
      return res.status(400).json({
        message: 'Incorrect password'
      })
    }
  } else {
    // If we didn't pass up the current password, don't submit a new password
    delete req.body.password
  }

  await req.user.update(req.body)

  return res.json([])
})

module.exports = router
