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
      active: {
        type: DataTypes.BOOLEAN,
        default: false
      },
      order: {
        type: DataTypes.INTEGER,
        default: 0
      },
      applicationType: {
        type: DataTypes.STRING
      },
      config: {
        type: DataTypes.TEXT
      },
      tags: {
        type: DataTypes.TEXT,
        set (val) {
          this.setDataValue('tags', JSON.stringify(val))
        },
        get () {
          return JSON.parse(this.getDataValue('tags'))
        }
      },
      system: {
        type: DataTypes.BOOLEAN,
        default: false
      }
    }, {
      sequelize,
      underscored: true,
      tableName: 'items'
    })
  }

  toJSON () {
    return this.get()
  }
}

module.exports = Item
