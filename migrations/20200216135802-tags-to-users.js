'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'user_tags',
      {
        tag_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          unique: 'userTag',
          references: {
            model: 'tags',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        user_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          unique: 'userTag',
          references: {
            model: 'users',
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
    return queryInterface.dropTable('user_tags')
  }
}
