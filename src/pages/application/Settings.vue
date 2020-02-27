<template>
  <q-page class="flex">
    <div class="tab-list">
      <q-list>
        <q-item :class="{ active: tab === 'general' }" @click="tab = 'general'" clickable>
          <q-item-section>
            <q-item-label>General Settings</q-item-label>
            <q-item-label caption>Choose general system settings</q-item-label>
          </q-item-section>
        </q-item>
        <q-item :class="{ active: tab === 'search' }" @click="tab = 'search'" clickable>
          <q-item-section>
            <q-item-label>Search settings</q-item-label>
            <q-item-label caption>Select which search engines to use</q-item-label>
          </q-item-section>
        </q-item>
        <q-item :class="{ active: tab === 'dashboard' }" @click="tab = 'dashboard'" clickable>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
            <q-item-label caption>Settings for the dashboard</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

    </div>
    <div class="page">
      <q-tab-panels v-model="tab" animated class="">
        <q-tab-panel name="general">
          <q-select
            outlined
            :options="languages"
            :label="this.$t('select_language')"
            option-value="value"
            option-label="label"
            v-model="language"
            map-options
          ></q-select>

          <q-select
            outlined
            :options="username_options"
            :label="this.$t('show_usernames')"
            option-value="value"
            option-label="label"
            v-model="show_usernames"
            map-options
          ></q-select>

        </q-tab-panel>
        <q-tab-panel name="search">
          <h6>Search</h6>
          <q-select
            outlined
            :options="showsearch_options"
            :label="this.$t('show_search')"
            option-value="value"
            option-label="label"
            v-model="showsearch"
          ></q-select>

          <h6>Search Providers</h6>
          <div class="search-providers">
            <div class="active providers">
              Active
              <ul class="">
                <li>Application</li>
                <li>Google</li>
                <li>DuckDuckGo</li>
                <li>Qwant</li>
              </ul>
            </div>
            <div class="inactive providers">
              Inactive
              <ul class="">
                <li>Bing</li>
                <li>Startpage</li>
                <li>NZBHydra</li>
              </ul>
            </div>
          </div>
          List of providers
          add a new providers
          default
        </q-tab-panel>
        <q-tab-panel name="dashboard">
          Background type - image, color, gradient
        </q-tab-panel>
      </q-tab-panels>
    </div>

  </q-page>
</template>

<script>

export default {
  name: 'Settings',

  components: {
  },

  props: ['applications', 'allapps'],

  computed: {
    createapp () {
      return {
        id: null,
        color: '',
        applicationtype: '',
        title: '',
        tags: [],
        url: '',
        icon: 'statics/img/heimdall-icon-small.png'
      }
    },
    show_usernames: {
      get () {
        return this.$store.state.app.settings.show_usernames
      },
      set (val) {
        this.$store.dispatch('app/saveSettings', {
          show_usernames: val.value
        })
      }
    },
    language: {
      get () {
        return this.$store.state.app.settings.language
      },
      set (val) {
        this.$store.dispatch('app/saveSettings', {
          language: val.value
        })
      }
    },
    create: {
      get () {
        return this.$store.state.tiles.create
      },
      set (val) {
        this.$store.commit('tiles/create', val)
      }
    }
  },

  data () {
    return {
      tab: 'general',
      username_options: [
        {
          label: this.$t('username_yes'),
          value: 'yes'
        },
        {
          label: this.$t('username_no'),
          value: 'no'
        }
      ],
      showsearch: null,
      showsearch_options: [
        {
          label: this.$t('yes'),
          value: 'yes'
        },
        {
          label: this.$t('no'),
          value: 'no'
        }
      ],
      languages: [
        {
          value: 'en-us',
          label: 'English (US)'
        },
        {
          value: 'en-gb',
          label: 'English (British)'
        }
      ]
    }
  },
  methods: {
    addApp: function () {
      this.$store.commit('tiles/create', true)
    }
  },
  mounted () {
    this.$store.commit('app/tab', 'admin')
    this.$store.commit('app/adminApps', true)
  }
}
</script>
<style lang="scss">
.bg {
  background-image: linear-gradient(to right, rgba(51, 88, 94, 0.95), rgba(49, 66, 84, 0.95)), url('/statics/applications.jpg');
  background-size: cover;
  background-position: center;
  height: 300px;
  position:fixed;
  top: 75px;
  left: 0;
  right: 0;
}
.options {
  height: 100px;
  margin: 0 -40px;
}
</style>
<style lang="scss" scoped>
.list-items {
}
</style>
