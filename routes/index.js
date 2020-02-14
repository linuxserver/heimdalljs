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

router.get('/ping', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  return res.json(req.user)
})

module.exports = router
