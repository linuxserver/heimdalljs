'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('settings', [
      {
        key: 'language',
        value: JSON.stringify('en-US'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        key: 'show_usernames',
        value: JSON.stringify('yes'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        key: 'background',
        value: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        key: 'app_version',
        value: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        key: 'search_on_dashboard',
        value: JSON.stringify('no'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        key: 'active_search_providers',
        value: JSON.stringify([]),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        key: 'default_tag',
        value: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        key: 'default_public_page',
        value: null,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('settings', null, {})
  }
}
