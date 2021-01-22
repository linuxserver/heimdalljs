'use strict'

const passport = require('passport')

module.exports = {
  authorize: (req, res, next) => {
    passport.authorize('jwt', { session: false }, (err, user) => {
      if (err) {
        req.user = null
      }

      if (user && !req.originalUrl.match(/\/logout/)) {
        // Extend the tokens life while the user is browsing
        const token = user.generateJWT()
        res.cookie('jwt', token, {
          domain: `.${req.host.split('.').slice(-2).join('.')}`, // Set cookie on top level domain for auth proxying
          maxAge: 3600000
        })
      }

      req.user = user
      next()
    })(req, res, next)
  }
}
