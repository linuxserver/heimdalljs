const express = require('express')
const router = express.Router()
const { Item, User, UserItem } = require('../models/index')
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
router.get(
  '/',
  errorHandler(async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        result: 'unauthorized'
      })
    }

    const items = await req.user.getItems()
    const allitems = {
      items: items.map(item => item.toJSON())
    }

    if (req.user.level === User.ADMIN) {
      const system = await Item.findAll({
        include: [
          {
            model: User
          }
        ],
        where: {
          system: true
        }
      })
      allitems.system = system.map(item => item.toJSON())
    }

    return res.json({
      status: 'ok',
      result: allitems
    })
  })
)

/**
 * Create new items
 */
router.post(
  '/',
  errorHandler(async (req, res, next) => {
    if (!req.user || req.user.level === User.READ_ONLY) {
      return res.status(401).json({
        status: 'error',
        result: 'unauthorized'
      })
    }
    if (req.body.icon) {
      try {
        const iconFile = await axios.get(req.body.icon, {
          responseType: 'arraybuffer'
        })
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

    // Only admins can change 'system' flag and assign items to other users
    if (req.user.level !== User.ADMIN) {
      delete req.body.system
      delete req.body.users
    }

    const item = await Item.create(req.body)

    if (req.body.users === undefined || req.body.users === null) {
      req.body.users = [req.user.id]
    }

    await item.setUsers(req.body.users)

    // Set active flag on association
    if (req.body.active !== undefined) {
      await UserItem.update(
        {
          active: req.body.active
        },
        {
          where: {
            user_id: req.body.user_id || req.user.id,
            item_id: item.id
          }
        }
      )
    }

    return res.json({
      status: 'ok',
      result: item.toJSON()
    })
  })
)

/**
 * Edit items
 */
router.put(
  '/:id',
  errorHandler(async (req, res, next) => {
    if (!req.user || req.user.level === User.READ_ONLY) {
      return res.status(401).json({
        status: 'error',
        result: 'unauthorized'
      })
    }

    const item = await Item.findOne({ where: { id: req.params.id } })

    if (!item) {
      return res.status(404).json({
        status: 'error',
        result: null
      })
    }

    if (!(await req.user.hasItem(item)) && req.user.level !== User.ADMIN) {
      return res.status(401).json({
        status: 'error',
        result: 'unauthorized'
      })
    }

    if (req.body.icon) {
      try {
        const iconFile = await axios.get(req.body.icon, {
          responseType: 'arraybuffer'
        })
        const fileType = await FileType.fromBuffer(iconFile.data)
        const randomFilename = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        fs.writeFileSync(path.join(config.uploadDir, 'icons', `${randomFilename}.${fileType.ext}`), iconFile.data)
        req.body.icon = `/icons/${randomFilename}.${fileType.ext}`

        if (item.icon) {
          try {
            fs.unlinkSync(path.join(config.uploadDir, item.icon))
          } catch (e) {}
        }
      } catch (e) {
        return res.status(500).json({
          status: 'error',
          result: 'Failed to retrieve icon image'
        })
      }
    }

    // Only admins can change 'system' flag and alter user associations
    if (req.user.level !== User.ADMIN) {
      delete req.body.system
    }

    await item.update(req.body)

    // Set active flag on association
    if (req.body.active !== undefined) {
      await UserItem.update(
        {
          active: req.body.active
        },
        {
          where: {
            user_id: req.body.user_id || req.user.id,
            item_id: item.id
          }
        }
      )
    }

    return res.json({
      status: 'ok',
      result: item.toJSON()
    })
  })
)

/**
 * Delete an item
 */
router.delete(
  '/:id',
  errorHandler(async (req, res, next) => {
    if (!req.user || req.user.level === User.READ_ONLY) {
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

    if (!(await req.user.hasItem(item))) {
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
  })
)

router.put(
  '/:id/users',
  errorHandler(async (req, res, next) => {
    if (!req.user || req.user.level !== User.ADMIN) {
      return res.status(401).json({
        status: 'error',
        result: 'unauthorized'
      })
    }

    const item = await Item.findOne({ where: { id: req.params.id } })
    if (!item) {
      return res.status(404).json({
        status: 'error',
        result: null
      })
    }

    if (item.system === false) {
      return res.status(400).json({
        status: 'error',
        result: 'not a system item'
      })
    }

    await item.setUsers(req.body.users)

    return res.json({
      status: 'ok'
    })
  })
)

router.delete(
  '/:id/users',
  errorHandler(async (req, res, next) => {
    if (!req.user || req.user.level !== User.ADMIN) {
      return res.status(401).json({
        status: 'error',
        result: 'unauthorized'
      })
    }

    const item = await Item.findOne({ where: { id: req.params.id } })
    if (!item) {
      return res.status(404).json({
        status: 'error',
        result: null
      })
    }

    if (item.system === false) {
      return res.status(400).json({
        status: 'error',
        result: 'not a system item'
      })
    }

    await item.removeUsers(req.body.user_ids)

    return res.json({
      status: 'ok'
    })
  })
)

/**
 * Upload an icon file to associate with the item
 */
router.put(
  '/:id/icon',
  upload.single('icon'),
  errorHandler(async (req, res, next) => {
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

    if (!(await req.user.hasItem(item))) {
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
    fs.renameSync(path.join(req.file.destination, req.file.filename), path.join(config.uploadDir, 'icons', newIcon))
    icon = `/icons/${newIcon}`

    if (item.icon) {
      try {
        fs.unlinkSync(path.join(config.uploadDir, item.icon))
      } catch (e) {}
    }

    await item.update({ icon })

    return res.json({ status: 'ok' })
  })
)

module.exports = router
