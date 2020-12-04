const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { User } = require('../models/index')
const config = require('../config/config')
const path = require('path')
const Speakeasy = require('speakeasy')
const axios = require('axios')
const fs = require('fs')
const Docker = require('dockerode')
const errorHandler = require('../middleware/error-handler')
const https = require('https')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendfile(path.join(__dirname, '../dist/spa/index.html'))
})

/**
 * Login endpoint
 */
router.post(
  '/login',
  errorHandler(async (req, res, next) => {
    if (req.user) {
      // User is already logged in
      return res.json({
        status: 'ok',
        result: null
      })
    }

    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    })

    if (!user || !user.verifyPassword(req.body.password)) {
      return res.status(403).json({
        status: 'error',
        result: 'invalid_user'
      })
    }

    if (user.multifactorEnabled && !req.body.totp) {
      return res.json({
        status: 'multifactor'
      })
    }

    if (user.multifactorEnabled && req.body.totp) {
      const valid = Speakeasy.totp.verify({
        secret: user.totpSecret,
        encoding: 'base32',
        token: req.body.totp,
        window: 0
      })

      if (!valid) {
        return res.status(403).json({
          status: 'error',
          result: 'invalid_code'
        })
      }
    }

    const payload = {
      id: user.id,
      username: user.username,
      updated: user.updatedAt.toString()
    }

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
)

/**
 * Auth endpoint - returns authentication status
 */
router.get(
  '/auth',
  errorHandler(async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'unauthorized',
        result: null
      })
    }

    return res.json({
      status: 'ok',
      result: req.user.toJSON()
    })
  })
)

/**
 * Status endpoint - returns application status
 */
router.get(
  '/status',
  errorHandler(async (req, res, next) => {
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
    }

    const status = req.user ? req.user.toJSON() : null

    return res.json({
      status: 'ok',
      result: status
    })
  })
)

/**
 * searchproviders endpoint - returns all configured search providers
 */
router.get(
  '/searchproviders',
  errorHandler(async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'unauthorized',
        result: null
      })
    }

    const jsonFile = path.join(__dirname, '../searchproviders.json')
    const providers = JSON.parse(fs.readFileSync(jsonFile))

    return res.json({
      status: 'ok',
      result: providers
    })
  })
)

/**
 * CORS Proxy endpoint - used for proxying requests through the app
 */
router.get(
  '/cors/:url*',
  errorHandler(async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'unauthorized',
        result: null
      })
    }
    let response
    try {
      let targetUrl = `${req.url.replace('/cors/', '')}`
      response = await axios({
        url: targetUrl,
        method: 'GET'
      })
      return res.send(response.data)
    } catch (e) {
      return res.json({
        result: e
      })
    }
  })
)

router.post(
  '/cors',
  errorHandler(async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'unauthorized',
        result: null
      })
    }
    let response
    try {
      const { allowSelfSignedCertificates, url } = req.body
      response = await axios({
        url,
        method: 'GET',
        httpsAgent: new https.Agent({
          rejectUnauthorized: allowSelfSignedCertificates === false
        })
      })
      return res.send(response.data)
    } catch (e) {
      return res.json({
        result: e
      })
    }
  })
)

/**
 * Return http images as an arraybuffer so they can be displayed
 */
router.get(
  '/image/:url*',
  errorHandler(async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'unauthorized',
        result: null
      })
    }

    const response = await axios.get(req.url.replace('/image/', ''), {
      responseType: 'arraybuffer'
    })

    return res.send(Buffer.from(response.data, 'binary').toString('base64'))
  })
)

/**
 * Containers endpoint to retrieve information of docker containers
 */
router.get(
  '/containers',
  errorHandler(async (req, res, next) => {
    if (!req.user || req.user.level !== User.ADMIN) {
      return res.status(401).json({
        status: 'unauthorized',
        result: null
      })
    }

    const docker = new Docker({ socketPath: '/var/run/docker.sock' })
    const containers = await docker.listContainers({ all: true })

    return res.json({
      status: 'ok',
      result: containers.map(container => ({
        id: container.Id,
        names: container.Names,
        image: container.Image,
        created: container.Created,
        state: container.State,
        status: container.Status
      }))
    })
  })
)

module.exports = router
