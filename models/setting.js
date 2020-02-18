'use strict'

const { Model } = require('sequelize')

class Setting extends Model {
  static init (sequelize, DataTypes) {
    return super.init({
      key: DataTypes.STRING,
      value: DataTypes.STRING
    }, {
      sequelize,
      underscored: true
    })
  }
}

module.exports = Setting
