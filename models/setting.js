'use strict'

const { Model } = require('sequelize')

class Setting extends Model {
  static init (sequelize, DataTypes) {
    return super.init({
      key: DataTypes.STRING,
      value: {
        type: DataTypes.STRING,
        get () {
          const val = this.getDataValue('value')
          try {
            const retval = JSON.parse(val)
            return retval
          } catch (e) {
            return val
          }
        },
        set (val) {
          this.setDataValue('value', typeof val === 'object' ? JSON.stringify(val) : val)
        }
      }
    }, {
      sequelize,
      underscored: true
    })
  }
}

module.exports = Setting
