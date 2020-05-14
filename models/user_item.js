'use strict'

const { Model } = require('sequelize')

class UserItem extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        active: {
          type: DataTypes.BOOLEAN,
          default: false
        }
      },
      {
        sequelize,
        underscored: true,
        tableName: 'user_items',
        timestamps: false
      }
    )
  }

  toJSON() {
    return this.get()
  }
}

module.exports = UserItem
