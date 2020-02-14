'use strict'

const { Model } = require('sequelize')
const bcrypt = require('bcrypt')

class User extends Model {
  static init (sequelize, DataTypes) {
    return super.init({
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set (val) {
          this.setDataValue('password', bcrypt.hashSync(val, 10))
        }
      }
    }, {
      sequelize,
      underscored: true,
      tableName: 'users'
    })
  }

  verifyPassword (check) {
    return bcrypt.compareSync(check, this.password)
  }
}

module.exports = User
