'use strict'

const { Model } = require('sequelize')

class Tag extends Model {
  static init (sequelize, DataTypes) {
    return super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    }, {
      sequelize,
      underscored: true
    })
  }

  static associate (models) {
    this.belongsToMany(models.User, {
      through: 'user_tags'
    })

    this.belongsToMany(models.Item, {
      through: 'item_tags'
    })
  }
}

module.exports = Tag
