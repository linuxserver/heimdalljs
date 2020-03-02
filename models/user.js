'use strict'

const { Model } = require('sequelize')
const bcrypt = require('bcrypt')

const ADMIN = 0
const USER = 1
const READ_ONLY = 2

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
      },
      settings: {
        type: DataTypes.TEXT,
        set (val) {
          this.setDataValue('settings', JSON.stringify(val))
        },
        get () {
          const settings = this.getDataValue('settings')
          if (settings === undefined) {
            return null
          }

          return JSON.parse(settings)
        }
      },
      level: DataTypes.TINYINT,
      totpSecret: DataTypes.STRING,
      multifactorEnabled: DataTypes.BOOLEAN
    }, {
      sequelize,
      underscored: true,
      tableName: 'users'
    })
  }

  static associate (models) {
    this.belongsToMany(models.Item, {
      foreignKey: 'user_id',
      otherKey: 'item_id',
      through: models.UserItem
    })
  }

  static get ADMIN () {
    return ADMIN
  }

  static get USER () {
    return USER
  }

  static get READ_ONLY () {
    return READ_ONLY
  }

  verifyPassword (check) {
    return bcrypt.compareSync(check, this.password)
  }

  toJSON () {
    const retval = this.get()
    retval.hasPasssword = retval.password !== null
    delete retval.password

    return retval
  }
}

module.exports = User
