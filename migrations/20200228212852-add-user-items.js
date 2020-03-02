'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_items', {
      user_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        unique: 'userItem'
      },
      item_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
          model: 'items',
          key: 'id'
        },
        onDelete: 'CASCADE',
        unique: 'userItem'
      },
      active: {
        type: Sequelize.BOOLEAN,
        default: false
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_items')
  }
}
