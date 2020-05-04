export default function () {
  return {
    status: null,
    user: null,
    loginStatus: null,
    setup: {
      step: 1
    },
    users: null,
    tab: 'user',
    admin_apps: false,
    admin_users: false,
    admin_proxies: false,
    languages: [
      {
        value: 'en-us',
        label: 'English (US)'
      },
      {
        value: 'en-gb',
        label: 'English (British)'
      }
    ],
    settings: {
      background: null,
      show_usernames: 'no',
      language: 'en-US',
      app_version: null,
      search_on_dashboard: 'no',
      search_provider: null,
      active_search_providers: [],
      search_providers: [],
      background_options: [
        {
          value: 'none',
          label: 'none'
        },
        {
          value: 'background_image',
          label: 'background_image'
        },
        {
          value: 'colour',
          label: 'colour'
        } /* ,
        {
          value: 'unsplash',
          label: 'unsplash'
        },
        {
          value: 'trianglify',
          label: 'trianglify'
        } */
      ],
      default_tag: null,
      default_public_page: null
    }
  }
}
