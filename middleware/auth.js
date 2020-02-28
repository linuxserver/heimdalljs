'use strict'

const passport = require('passport')

module.exports = {
  authorize: (req, res, next) => {
    passport.authorize('jwt', { session: false }, (err, user) => {
      if (err) {
        req.user = null
      }

      req.user = user
      next()
    })(req, res, next)
  }
}
