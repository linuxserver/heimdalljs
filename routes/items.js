const express = require('express')
const router = express.Router()
const { Item } = require('../models/index')
const multer = require('multer')
const upload = multer({ dest: require('../config/config').uploadDir })
const path = require('path')
const fs = require('fs')
const config = require('../config/config')
const axios = require('axios')
const FileType = require('file-type')
const errorHandler = require('../middleware/error-handler')

/**
 * Retrieve all items belonging to a user
 */
router.get('/', errorHandler(async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      result: 'unauthorized'
    })
  }

  const items = await Item.findAll({
    where: {
      userId: req.user.id
    }
  })

  return res.json({
    status: 'ok',
    result: items.map(item => item.toJSON())
  })
}))

/**
 * Create new items
 */
router.post('/', errorHandler(async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      result: 'unauthorized'
    })
  }

  if (req.body.icon) {
    try {
      const iconFile = await axios.get(req.body.icon, { responseType: 'arraybuffer' })
      const fileType = await FileType.fromBuffer(iconFile.data)
      const randomFilename = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

      fs.writeFileSync(path.join(config.uploadDir, 'icons', `${randomFilename}.${fileType.ext}`), iconFile.data)
      req.body.icon = `/icons/${randomFilename}.${fileType.ext}`
    } catch (e) {
      return res.status(500).json({
        status: 'error',
        result: 'Failed to retrieve icon image'
      })
    }
  }

  const item = await Item.create({
    ...req.body,
    userId: req.user.id
  })

  return res.json({
    status: 'ok',
    result: item.toJSON()
  })
}))

/**
 * Edit items
 */
router.put('/:id', errorHandler(async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      result: 'unauthorized'
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
      result: null
    })
  }

  if (item.userId !== req.user.id) {
    return res.status(401).json({
      status: 'error',
      result: 'unauthorized'
    })
  }

  if (req.body.icon) {
    try {
      const iconFile = await axios.get(req.body.icon, { responseType: 'arraybuffer' })
      const fileType = await FileType.fromBuffer(iconFile.data)
      const randomFilename = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

      fs.writeFileSync(path.join(config.uploadDir, 'icons', `${randomFilename}.${fileType.ext}`), iconFile.data)
      req.body.icon = `/icons/${randomFilename}.${fileType.ext}`

      if (item.icon) {
        try {
          fs.unlinkSync(path.join(config.uploadDir, item.icon))
        } catch (e) { }
      }
    } catch (e) {
      return res.status(500).json({
        status: 'error',
        result: 'Failed to retrieve icon image'
      })
    }
  }

  await item.update(req.body)

  return res.json({
    status: 'ok',
    result: item.toJSON()
  })
}))

/**
 * Delete an item
 */
router.delete('/:id', errorHandler(async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      result: 'unauthorized'
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
      result: null
    })
  }

  if (item.userId !== req.user.id) {
    return res.status(401).json({
      status: 'error',
      result: 'unauthorized'
    })
  }

  await item.destroy()

  return res.json({
    status: 'ok',
    result: null
  })
}))

/**
 * Upload an icon file to associate with the item
 */
router.put('/:id/icon', upload.single('icon'), errorHandler(async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      result: 'unauthorized'
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
      result: null
    })
  }

  if (item.userId !== req.user.id) {
    return res.status(401).json({
      status: 'error',
      result: 'unauthorized'
    })
  }

  let icon = null
  if (!req.file) {
    return res.status(400).json({
      status: 'error',
      result: 'upload file missing'
    })
  }

  const newIcon = `${req.file.filename}${path.extname(req.file.originalname)}`
  fs.renameSync(path.join(req.file.destination, req.file.filename), path.join(config.uploadDir, 'avatars', newIcon))
  icon = `/icons/${newIcon}`

  if (item.icon) {
    try {
      fs.unlinkSync(path.join(config.uploadDir, item.icon))
    } catch (e) { }
  }

  await item.update({ icon })

  return res.json({ status: 'ok' })
}))

module.exports = router
