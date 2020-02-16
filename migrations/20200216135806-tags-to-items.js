'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'item_tags',
      {
        tag_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          unique: 'itemTag',
          references: {
            model: 'tags',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        item_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          unique: 'itemTag',
          references: {
            model: 'items',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('item_tags')
  }
}
