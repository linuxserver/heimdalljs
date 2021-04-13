'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('items', 'link_tab', {
      type: Sequelize.STRING,
      after: 'system',
      defaultValue: 'default'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('items', 'link_tab')
  }
}
