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
        value: 'ar',
        label: 'العربية (Arabic)'
      },
      {
        value: 'cs',
        label: 'čeština (Czech)'
      },
      {
        value: 'de',
        label: 'Deutsch (German)'
      },
      {
        value: 'en-gb',
        label: 'English (British)'
      },
      {
        value: 'es',
        label: 'Español (Spanish)'
      },
      {
        value: 'fr',
        label: 'français (French)'
      },
      {
        value: 'it',
        label: 'Italiano (Italian)'
      },
      {
        value: 'ja',
        label: '日本語 (Japanese)'
      },
      {
        value: 'nl',
        label: 'Nederlands (Dutch)'
      },
      {
        value: 'no',
        label: 'Norsk (Norwegian)'
      },
      {
        value: 'pl',
        label: 'język polski (German)'
      },
      {
        value: 'pt',
        label: 'Português (Portuguese)'
      },
      {
        value: 'ro',
        label: 'Română (Romanian)'
      },
      {
        value: 'ru',
        label: 'русский (Russian)'
      },
      {
        value: 'sv',
        label: 'Svenska (Swedish)'
      },
      {
        value: 'tr',
        label: 'Türkçe (Turkish)'
      },
      {
        value: 'uk',
        label: 'Українська (Ukrainian)'
      },
      {
        value: 'zh-Hans',
        label: '中文 (Chinese)'
      }
    ],
    settings: {
      background: null,
      show_usernames: 'no',
      language: 'en-us',
      app_version: null,
      search_on_dashboard: 'no',
      search_provider: null,
      active_search_providers: [],
      search_providers: [],
      open_tab: '0',
      open_tabs: [
        {
          value: '0',
          label: 'Same tab'
        },
        {
          value: '1',
          label: 'New tab'
        },
        {
          value: '2',
          label: 'Current tab'
        }
      ],
      background_options: [
        {
          value: 'none',
          label: 'default'
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
