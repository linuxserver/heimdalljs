const express = require('express')
const router = express.Router()
const { Item } = require('../models/index')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  if (!req.user) {
    return res.status(403).json([])
  }

  const items = await Item.findAll({
    where: {
      userId: req.user.id
    }
  })

  return res.json(items.map(item => item.toJSON()))
})

router.post('/', async (req, res, next) => {
  if (!req.user) {
    return res.status(403).json([])
  }

  const item = await Item.create({
    ...req.body,
    userId: req.user.id
  })

  return res.json(item.toJSON())
})

router.put('/', async (req, res, next) => {
  if (!req.user) {
    return res.status(403).json([])
  }

  const item = await Item.findOne({
    where: {
      id: req.body.id
    }
  })

  await item.update(req.body)

  return res.json(item.toJSON())
})

module.exports = router
