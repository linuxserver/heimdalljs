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
    settings: {
      background: null,
      show_usernames: 'no',
      language: 'en-US',
      app_version: null,
      search_on_dashboard: 'no',
      search_provider: {
        id: 'google',
        url: 'https://www.google.com/search',
        name: 'Google',
        method: 'get',
        target: '_blank',
        query: 'q'
      },
      active_search_providers: [
        {
          id: 'tiles',
          name: 'Tiles',
          target: '_self'
        },
        {
          id: 'google',
          url: 'https://www.google.com/search',
          name: 'Google',
          method: 'get',
          target: '_blank',
          query: 'q'
        },
        {
          id: 'bing',
          url: 'https://www.bing.com/search',
          name: 'Bing',
          method: 'get',
          target: '_blank',
          query: 'q'
        }
      ],
      default_tag: null,
      default_public_page: null
    }
  }
}
