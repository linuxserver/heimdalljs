'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'totp_secret', {
      type: Sequelize.STRING,
      after: 'level',
      defaultValue: null
    })

    await queryInterface.addColumn('users', 'multifactor_enabled', {
      type: Sequelize.BOOLEAN,
      after: 'totp',
      defaultValue: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'totp_secret')
    await queryInterface.removeColumn('users', 'multifactor_enabled')
  }
}
