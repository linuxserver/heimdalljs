const express = require('express')
const router = express.Router()
const { Item } = require('../models/index')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({
      status: 'error',
      data: 'unauthorized'
    })
  }

  const items = await Item.findAll({
    where: {
      userId: req.user.id
    }
  })

  return res.json({
    status: 'ok',
    data: items.map(item => item.toJSON())
  })
})

router.post('/', async (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({
      status: 'error',
      data: 'unauthorized'
    })
  }

  const item = await Item.create({
    ...req.body,
    userId: req.user.id
  })

  return res.json({
    status: 'ok',
    data: item.toJSON()
  })
})

router.put('/:id', async (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({
      status: 'error',
      data: 'unauthorized'
    })
  }

  const item = await Item.findOne({
    where: {
      id: req.params.id
    }
  })

  if (!item) {
    return res.status(404).json({
      status: 'error',
      data: null
    })
  }

  if (item.userId !== req.user.id) {
    return res.status(403).json({
      status: 'error',
      data: 'unauthorized'
    })
  }

  await item.update(req.body)

  return res.json({
    status: 'ok',
    data: item.toJSON()
  })
})

router.delete('/:id', async (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({
      status: 'error',
      data: 'unauthorized'
    })
  }

  const item = await Item.findOne({
    wheree: {
      id: req.params.id
    }
  })

  if (!item) {
    return res.status(404).json({
      status: 'error',
      data: null
    })
  }

  if (item.userId !== req.user.id) {
    return res.status(403).json({
      status: 'error',
      data: 'unauthorized'
    })
  }

  await item.destroy()

  return res.json({
    status: 'ok',
    data: null
  })
})

module.exports = router
