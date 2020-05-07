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
            v-model="search_on_dashboard"
            map-options
          ></q-select>

          <h6>Search Providers</h6>
          <div class="search-providers">
            <div class="active providers">
              Active
              <draggable tag="ul" group="providers" v-model="active_search_providers">
                <li v-for="provider in active_search_providers" :key="provider.id">{{ provider.name }}</li>
              </draggable>
            </div>
            <div class="inactive providers">
              Inactive
                <draggable tag="ul" group="providers" v-model="inactive_search_providers">
                <li v-for="provider in inactive_search_providers" :key="provider.id">{{ provider.name }}</li>
                </draggable>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="dashboard">
          <q-select
            outlined
            :options="background_options.map(e => ({
              label: $t(e.label),
              value: e.value
            }))"
            :label="this.$t('background_type')"
            v-model="background_type"
            map-options
            emit-value
          ></q-select>
          <div class="background_colour_selector" v-if="background_type === 'colour'">
            <div class="details">
                <q-input
                  outlined
                  v-model="colour1"
                  :label="this.$t('colour') + ' 1'"
                >
                  <template v-slot:append>
                    <q-icon name="colorize" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-color v-model="colour1" format-model="hexa" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <q-input
                  outlined
                  v-model="colour2"
                  :label="this.$t('colour') + ' 2'"
                >
                  <template v-slot:append>
                    <q-icon name="colorize" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-color v-model="colour2" format-model="hexa" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <q-btn-toggle
                  v-if="colour2 !== null"
                  style="margin-bottom: 20px;"
                  v-model="gradient"
                  no-caps
                  rounded
                  unelevated
                  toggle-color="primary"
                  color="white"
                  text-color="primary"
                  :options="[
                    {label: $t('linear'), value: 'linear'},
                    {label: $t('radial'), value: 'radial'}
                  ]"
                />

              <q-select
                v-if="colour2 !== null && gradient === 'linear'"
                outlined
                :options="[0,45,90,135,180,225,270,315,360]"
                :label="this.$t('Degrees')"
                v-model="degrees"
                emit-value
              ></q-select>

          </div>
          <div :style="preview" class="preview">

          </div>
          </div>

          <div v-if="background_type === 'background_image'">
            background
          </div>

        </q-tab-panel>
      </q-tab-panels>
    </div>

  </q-page>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'Settings',

  components: {
    draggable
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
    languages () {
      return this.$store.state.app.languages
    },
    search_providers () {
      return this.$store.state.app.settings.search_providers
    },
    active_search_providers: {
      get () {
        return this.$store.state.app.settings.active_search_providers
      },
      set (value) {
        this.$store.dispatch('app/saveSettings', {
          active_search_providers: value
        })
      }
    },
    inactive_search_providers: {
      get () {
        const obj1 = this.$store.state.app.settings.search_providers
        const obj2 = this.$store.state.app.settings.active_search_providers
        return obj1.filter(obj => obj2.every(s => s.id !== obj.id))
      },
      set (value) {
        /* this.$store.dispatch('app/saveSettings', {
          active_search_providers: value
        }) */
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
    background_options () {
      return this.$store.state.app.settings.background_options
    },
    background_type: {
      get () {
        if (this.$store.state.app.settings.background !== null) {
          return this.$store.state.app.settings.background.type || null
        }
        return null
      },
      set (val) {
        this.$store.dispatch('app/saveSettings', {
          background: {
            type: val
          }
        })
      }
    },
    colour1: {
      get () {
        if (this.$store.state.app.settings.background !== null) {
          return this.$store.state.app.settings.background.colour1 || null
        }
        return null
      },
      set (val) {
        const background = this.$store.state.app.settings.background
        const update = Object.assign(background, {
          colour1: val
        })
        // console.log(update)
        this.$store.dispatch('app/saveSettings', {
          update
        })
      }
    },
    colour2: {
      get () {
        if (this.$store.state.app.settings.background !== null) {
          return this.$store.state.app.settings.background.colour2 || null
        }
        return null
      },
      set (val) {
        const background = this.$store.state.app.settings.background
        const update = Object.assign(background, {
          colour2: val
        })
        // console.log(update)
        this.$store.dispatch('app/saveSettings', {
          update
        })
      }
    },
    gradient: {
      get () {
        if (this.$store.state.app.settings.background !== null) {
          return this.$store.state.app.settings.background.gradient || 'linear'
        }
        return 'linear'
      },
      set (val) {
        const background = this.$store.state.app.settings.background
        const update = Object.assign(background, {
          gradient: val
        })
        // console.log(update)
        this.$store.dispatch('app/saveSettings', {
          update
        })
      }
    },
    degrees: {
      get () {
        if (this.$store.state.app.settings.background !== null) {
          return this.$store.state.app.settings.background.degrees || 0
        }
        return 0
      },
      set (val) {
        const background = this.$store.state.app.settings.background
        const update = Object.assign(background, {
          degrees: val
        })
        // console.log(update)
        this.$store.dispatch('app/saveSettings', {
          update
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
    search_on_dashboard: {
      get () {
        return this.$store.state.app.settings.search_on_dashboard
      },
      set (val) {
        this.$store.dispatch('app/saveSettings', {
          search_on_dashboard: val.value
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
    },
    preview () {
      return this.$store.getters['app/getBackground']
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
      showsearch_options: [
        {
          label: this.$t('yes'),
          value: 'yes'
        },
        {
          label: this.$t('no'),
          value: 'no'
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
    this.$store.dispatch('app/getSearchProviders')
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
