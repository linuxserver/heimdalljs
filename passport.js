/**
 * Passport for authentication
 */
const { Strategy } = require('passport-jwt')
const { User } = require('./models/index')
const config = require('./config/config')

module.exports = passport => {
  passport.use(
    new Strategy(
      {
        secretOrKey: config.jwtSecret,
        jwtFromRequest(req) {
          let token = null

          // Pull the token from cookies, maybe support headers later?
          if (req && req.cookies) {
            token = req.cookies.jwt
          }

          return token
        }
      },
      async (payload, done) => {
        try {
          const user = await User.findOne({
            where: {
              id: payload.id
            }
          })

          return done(null, user)
        } catch (err) {
          return done(null, false)
        }
      }
    )
  )
}
