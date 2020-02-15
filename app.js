const express = require('express')
// const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const itemsRouter = require('./routes/items')

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
app.use(cors())

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/items', itemsRouter)

module.exports = app
