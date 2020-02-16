'use strict'

const { Model } = require('sequelize')

class Item extends Model {
  static init (sequelize, DataTypes) {
    return super.init({
      userId: {
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      color: DataTypes.STRING,
      icon: DataTypes.STRING,
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.STRING,
      pinned: {
        type: DataTypes.BOOLEAN,
        default: false
      },
      order: {
        type: DataTypes.INTEGER,
        default: 0
      }
    }, {
      sequelize,
      underscored: true,
      tableName: 'items'
    })
  }

  static associate (models) {
    this.belongsToMany(models.Tag, {
      through: 'item_tags'
    })
  }

  toJSON () {
    return this.get()
  }
}

module.exports = Item
