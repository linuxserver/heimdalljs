'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING
      },
      icon: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      order: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      application_type: {
        type: Sequelize.STRING
      },
      config: {
        type: Sequelize.TEXT
      },
      tags: {
        type: Sequelize.TEXT
      },
      system: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      link_tab: {
        type: Sequelize.STRING,
        default: null
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE,
        default: null
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('items')
  }
}
