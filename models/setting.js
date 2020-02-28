'use strict'

const { Model } = require('sequelize')

class Setting extends Model {
  static init (sequelize, DataTypes) {
    return super.init({
      key: DataTypes.STRING,
      value: {
        type: DataTypes.STRING,
        get () {
          return JSON.parse(this.getDataValue('value'))
        },
        set (val) {
          this.setDataValue('value', JSON.stringify(val))
        }
      }
    }, {
      sequelize,
      underscored: true
    })
  }
}

module.exports = Setting
