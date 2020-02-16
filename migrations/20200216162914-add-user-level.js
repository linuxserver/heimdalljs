'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'level', {
      type: Sequelize.TINYINT,
      after: 'settings',
      defaultValue: 1
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'level')
  }
}
