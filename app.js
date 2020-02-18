const env = process.env.NODE_ENV || 'development'
const express = require('express')
// const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const path = require('path')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const itemsRouter = require('./routes/items')
const settingsRouter = require('./routes/settings')

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
 * Authentication middleware to attach the currently logged
 * in user to the request
 */
const auth = require('./middleware/auth')
app.use(auth.authorize)

/**
 * Handle CORS
 */
const cors = require('cors')
app.use(cors({
  credentials: true,
  ...env === 'development' && { origin: 'http://localhost:8080' }
}))

app.use(express.static(path.join(__dirname, './dist/spa/')))
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/items', itemsRouter)
app.use('/settings', settingsRouter)

module.exports = app
