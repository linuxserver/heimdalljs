// const env = process.env.NODE_ENV || 'development'
const express = require('express')
// const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const path = require('path')
const config = require('./config/config')
const fs = require('fs')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const itemsRouter = require('./routes/items')
const settingsRouter = require('./routes/settings')
const enhancedRouter = require('./routes/enhanced')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))

/**
 * Set up and register passport for authentication
 */
const passport = require('passport')
app.use(passport.initialize())
require('./passport')(passport)

/**
 * Handle CORS
 */
const cors = require('cors')
app.use(
  cors({
    // ...(env === 'development' ? { origin: 'http://localhost:8080' } :
    origin: true,
    credentials: true
  })
)

// Create upload directories
for (const subdir of ['avatars', 'icons', 'backgrounds']) {
  fs.mkdirSync(path.resolve(path.join(config.uploadDir, subdir)), {
    recursive: true
  })
}

app.use(express.static(path.join(__dirname, './dist/spa/')))
app.use(express.static(config.uploadDir))

/**
 * Authentication middleware to attach the currently logged
 * in user to the request
 */
const auth = require('./middleware/auth')
app.use(auth.authorize)

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/items', itemsRouter)
app.use('/settings', settingsRouter)
app.use('/enhanced', enhancedRouter)

// Our own error handler to make sure everything returns as JSON
app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({
      status: 'error',
      result: err.message
    })
  }

  return next()
})

module.exports = app
