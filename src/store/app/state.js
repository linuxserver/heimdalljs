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
      search_provider: null,
      default_tag: null,
      default_public_page: null
    }
  }
}
