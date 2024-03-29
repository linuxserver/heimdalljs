'use strict'

const { Model } = require('sequelize')

class Item extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
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
        order: {
          type: DataTypes.INTEGER,
          default: 0
        },
        applicationType: {
          type: DataTypes.STRING
        },
        config: {
          type: DataTypes.TEXT,
          set(val) {
            this.setDataValue('config', JSON.stringify(val))
          },
          get() {
            const config = this.getDataValue('config')
            if (config === undefined) {
              return null
            }

            return JSON.parse(config)
          }
        },
        tags: {
          type: DataTypes.TEXT,
          set(val) {
            this.setDataValue('tags', JSON.stringify(val))
          },
          get() {
            const tags = this.getDataValue('tags')
            if (tags === undefined) {
              return null
            }

            return JSON.parse(tags)
          }
        },
        system: {
          type: DataTypes.BOOLEAN,
          default: false
        },
        link_tab: {
          type: DataTypes.STRING,
          default: 'default'
        }
      },
      {
        sequelize,
        underscored: true,
        tableName: 'items'
      }
    )
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      foreignKey: 'item_id',
      otherKey: 'user_id',
      through: models.UserItem
    })
  }

  toJSON() {
    return this.get()
  }
}

module.exports = Item
