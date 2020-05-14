const express = require('express')
const router = express.Router()
const { Item } = require('../models/index')
const errorHandler = require('../middleware/error-handler')
const EnhancedApps = require('../enhanced')

/**
 * enhanced endpoint
 */

router.get(
  '/:id',
  errorHandler(async (req, res, next) => {
    const item = await Item.findOne({ where: { id: req.params.id } })

    const config = item.config
    const enhanced = new EnhancedApps(config)
    const response = await enhanced.call()

    return res.json({
      status: 'ok',
      result: response
    })
  })
)

module.exports = router
