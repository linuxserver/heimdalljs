const path = require('path')

require('dotenv').config()

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'CHANG_ME',
  uploadDir:
    process.env.UPLOAD_DIR || path.resolve(path.join(__dirname, '../uploads'))
}
