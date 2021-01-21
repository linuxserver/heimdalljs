<template>
  <div class="userdetails fit">
    <q-form @submit="onSubmit" class="fit userform">
      <q-scroll-area style="height: 100%">
        <div id="create" class="create fit">
          <div class="tile-details">
            <div class="buttons">
              <q-btn unelevated @click="loadApplication" color="grey-5">{{ $tc('application') }}</q-btn>
              <q-btn unelevated @click="websitedialog = true" color="grey-5">{{ $t('website') }}</q-btn>
              <!--<q-btn unelevated @click="dockerdialog = true" color="grey-5"
                >Docker</q-btn>-->
            </div>
            <tile :application="preview" :stat1valueinit="stat1value" :stat2valueinit="stat2value"></tile>

            <div v-if="changeicon">
              <q-file outlined v-model="avatar" :label="this.$t('upload_file')">
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
              <q-input outlined v-model="urlavatar" type="url" :label="this.$t('url')">
                <template v-slot:prepend>
                  <q-icon name="http" />
                </template>
              </q-input>
            </div>
            <div class="name"></div>
            <div class="email"></div>
          </div>
          <div class="user-options">
            <q-tabs v-model="tab" indicator-color="purple" align="justify" inline-label>
              <q-tab clickable v-ripple name="general" :label="$t('general')" />
              <q-tab clickable v-ripple name="image" :label="$t('appearance')" />
              <q-tab clickable v-ripple name="enhanced" :label="$t('enhanced')" />
              <q-tab v-if="$route.path === '/admin/application'" clickable v-ripple name="users" :label="$tc('user')" />
            </q-tabs>

            <q-tab-panels v-model="tab" animated class="">
              <q-tab-panel name="general">
                <q-checkbox v-model="useritemactive" :label="this.$t('active')" />
                <q-input outlined v-model="title" :label="this.$t('title')" :rules="[val => !!val || this.$t('required_field')]"></q-input>
                <q-select outlined :label="this.$t('protocol')" v-model="websiteprotocol" :options="['https', 'http']"></q-select>
                <q-input outlined v-model="url" :label="this.$t('url')" :rules="[val => !!val || this.$t('required_field')]"></q-input>
                <q-checkbox v-model="allowselfsignedcerts" v-show="websiteprotocol === 'https'" :label="this.$t('allow_self_signed_certificates')" />
                <q-input v-model="description" :label="this.$t('description')" outlined type="textarea" />
                <q-select :label="this.$t('Tags')" outlined v-model="tags" multiple :options="possibletags" use-input new-value-mode="add-unique" emit-value use-chips ref="tags" @new-value="updateInput" @filter="filterFn" />
              </q-tab-panel>

              <q-tab-panel name="image">
                <q-input outlined v-model="color" :label="this.$t('colour')">
                  <template v-slot:append>
                    <q-icon name="colorize" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-color v-model="color" format-model="hexa" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <div class="icon-container">
                  <div class="upload-btn-wrapper">
                    <q-file outlined ref="icon" v-model="newicon" label="Icon" />
                  </div>
                </div>
              </q-tab-panel>
              <q-tab-panel v-if="$route.path === '/admin/application'" name="users">
                <q-select :label="this.$t('users')" outlined v-model="users" multiple :options="possibleusers" use-input new-value-mode="add-unique" use-chips option-value="id" option-label="username" map-options emit-value ref="users" />
              </q-tab-panel>

              <q-tab-panel name="enhanced">
                <q-select outlined v-model="enhancedType" :label="this.$t('authtype')" :options="possibletypes" option-value="id" option-label="value" emit-value map-options></q-select>

                <div class="enhanced-tab" v-if="enhancedType !== 'disabled'">
                  <q-tab-panels v-model="enhancedType" animated class="">
                    <q-tab-panel name="none">No auth</q-tab-panel>
                    <q-tab-panel name="apikey">
                      <q-input outlined v-model="apikey" :label="this.$t('enter_apikey')"></q-input>
                    </q-tab-panel>
                    <q-tab-panel name="cookie">Cookie based</q-tab-panel>
                    <q-tab-panel name="basic_auth">
                      <q-input outlined v-model="basic_auth_user" :label="this.$t('enter_basic_auth_user')"></q-input>
                      <q-input outlined v-model="basic_auth_password" :label="this.$t('enter_basic_auth_password')" :type="basic_auth_hide_password ? 'password' : 'text'">
                        <template v-slot:append>
                          <q-icon :name="basic_auth_hide_password ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="basic_auth_hide_password = !basic_auth_hide_password" />
                        </template>
                      </q-input>
                    </q-tab-panel>
                  </q-tab-panels>
                  <div class="stats">
                    <div class="stat">
                      <div class="text-h6">Stat 1</div>
                      <q-input outlined v-model="enhanced1name" :label="this.$t('name')"></q-input>
                      <q-input outlined v-model="enhanced1url" :label="this.$t('url')"></q-input>
                      <q-input outlined v-model="enhanced1key" :label="this.$t('key')"></q-input>
                      <q-select outlined v-model="enhanced1filter" :label="this.$t('filter')" :options="filters" option-value="id" option-label="value" map-options emit-value></q-select>
                      <q-select outlined v-model="enhanced1updateOnChange" :label="this.$t('update_on_change')" :options="['Yes', 'No']"></q-select>
                    </div>
                    <div class="stat">
                      <div class="text-h6">Stat 2</div>
                      <q-input outlined v-model="enhanced2name" :label="this.$t('name')"></q-input>
                      <q-input outlined v-model="enhanced2url" :label="this.$t('url')"></q-input>
                      <q-input outlined v-model="enhanced2key" :label="this.$t('key')"></q-input>
                      <q-select outlined v-model="enhanced2filter" :label="this.$t('filter')" :options="filters" option-value="id" option-label="value" map-options></q-select>
                      <q-select outlined v-model="enhanced2updateOnChange" :label="this.$t('update_on_change')" :options="['Yes', 'No']"></q-select>
                    </div>
                  </div>
                  <q-btn @click="test">Test</q-btn>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </q-scroll-area>
      <div class="useractions" :class="{ active: actions }">
        <q-btn type="submit" flat>
          <q-icon name="save" />
          {{ $t('save') }}
        </q-btn>
        <q-btn flat @click="closeCreate">
          <q-icon name="block" />
          {{ $t('cancel') }}
        </q-btn>
      </div>
    </q-form>

    <q-dialog v-model="applicationdialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Select Application
            <q-btn flat @click="refreshApps"><q-icon name="refresh" /></q-btn>
          </div>
        </q-card-section>

        <q-card-section style="width: 500px" class="q-pt-none">
          <q-select outlined :options="possibleapps" option-value="appid" option-label="name" map-options :label="this.$t('application_type')" v-model="applicationtype"></q-select>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn unelevated label="Set" @click="setApplication" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="websitedialog">
      <TileWebsiteTest :website="url" :protocol="websiteprotocol" :allowselfsignedcerts="allowselfsignedcerts" @setWebsite="setWebsite"></TileWebsiteTest>
    </q-dialog>

    <q-dialog v-model="dockerdialog" @show="getDockers">
      <q-card>
        <q-card-section>
          <div class="text-h6">Available docker containers</div>
        </q-card-section>
        <q-card-section style="width: 500px" class="q-pt-none">
          <div v-if="dockers.length > 0">
            <div class="text-h6">Active</div>
            <div v-for="docker in dockers.filter(d => d.state === 'running')" :key="docker.id">
              {{ docker.image }}
            </div>
            <div class="text-h6">Inactive</div>
            <div v-for="docker in dockers.filter(d => d.state !== 'running')" :key="docker.id">
              {{ docker.image }}
            </div>
          </div>
          <div v-else>No containers available</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn unelevated v-if="websitedata !== null" label="Set" @click="setWebsite" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import Tile from './Tile'
import EnhancedApps from '../plugins/EnhancedApps'
import TileWebsiteTest from './TileWebsiteTest'
import _ from 'lodash'

export default {
  name: 'EditTile',

  props: [],

  components: {
    Tile,
    TileWebsiteTest
  },

  computed: {
    application() {
      return this.$store.state.tiles.edit
    },
    possibleapps() {
      return this.$store.getters['tiles/possibleApplications']
    },
    possibleusers() {
      return this.$store.state.users.all
    },
    taglist() {
      return this.tags.map(a => a.title).join()
    },
    create() {
      return this.$store.state.tiles.create
    },
    config() {
      return {
        enhancedType: this.enhancedType,
        url: this.url,
        apikey: this.apikey,
        basic_auth_user: this.basic_auth_user,
        basic_auth_password: this.basic_auth_password,
        allowselfsignedcerts: this.allowselfsignedcerts,
        websiteprotocol: this.websiteprotocol,
        stat1: {
          name: this.enhanced1name,
          url: this.enhanced1url,
          key: this.enhanced1key,
          filter: this.enhanced1filter,
          updateOnChange: this.enhanced1updateOnChange
        },
        stat2: {
          name: this.enhanced2name,
          url: this.enhanced2url,
          key: this.enhanced2key,
          filter: this.enhanced2filter,
          updateOnChange: this.enhanced2updateOnChange
        }
      }
    },
    preview() {
      return {
        color: this.color || '#222222',
        title: this.title,
        description: this.description,
        icon: this.seticon,
        url: this.url,
        config: this.config,
        preview: true
      }
    },
    allTags() {
      return this.$store.getters['tiles/allTags']
    },
    tagsParse() {
      if (this.application.tags === null) {
        return []
      }
      return JSON.parse(this.application.tags)
    },
    seticon() {
      if (this.icon) return this.icon
      return this.application.icon !== null ? process.env.BACKEND_LOCATION + this.application.icon : '/heimdall-logo-white.svg'
    }
  },

  data() {
    return {
      websitedata: null, // TODO: Get rid and move to component TileWebsiteTest
      id: null,
      color: null,
      applicationtype: null,
      title: null,
      tags: null,
      users: null,
      useritemactive: null,
      url: null,
      icon: null,
      newicon: null,
      description: '',
      allowselfsignedcerts: false,
      websiteprotocol: 'https',
      actions: false,
      submitEmpty: false,
      stat1value: null,
      stat2value: null,
      submitResult: [],
      changeicon: false,
      tab: 'general',
      applicationdialog: false,
      websitedialog: false,
      dockerdialog: false,
      selectedwebsiteimage: null,
      possibletags: [],
      dockers: [],
      enhancedType: 'disabled',
      apikey: '',
      basic_auth_user: '',
      basic_auth_password: '',
      basic_auth_hide_password: true,
      enhanced1name: null,
      enhanced1url: null,
      enhanced1key: null,
      enhanced1filter: null,
      enhanced1updateOnChange: 'No',
      enhanced2name: null,
      enhanced2url: null,
      enhanced2key: null,
      enhanced2filter: null,
      enhanced2updateOnChange: 'No',
      possibletypes: EnhancedApps.types().map(e => ({
        id: e.id,
        value: this.$t(e.value)
      })),
      filters: EnhancedApps.filters().map(e => ({
        id: e.id,
        value: this.$t(e.value)
      }))
    }
  },

  watch: {
    application: function (newdata, olddata) {
      this.id = newdata.id
      this.icon = newdata.icon
      this.title = newdata.title
      this.users = newdata.Users
      this.useritemactive = (newdata.UserItem && Object.prototype.hasOwnProperty.call(newdata.UserItem, 'active') && newdata.UserItem.active) || false
      this.tags = newdata.tags
      this.description = newdata.description
      this.color = newdata.color
      this.url = newdata.url
      this.applicationtype = newdata.applicationType
      this.enhancedType = (newdata.config && newdata.config.enhancedType) || false
      this.websiteprotocol = (newdata.config && newdata.config.websiteprotocol) || 'https'
      this.allowselfsignedcerts = (newdata.config && newdata.config.allowselfsignedcerts) || false
      this.apikey = (newdata.config && newdata.config.apikey) || ''
      this.basic_auth_user = (newdata.config && newdata.config.basic_auth_user) || ''
      this.basic_auth_password = (newdata.config && newdata.config.basic_auth_password) || ''
      this.enhanced1name = (newdata.config && newdata.config.stat1.name) || null
      this.enhanced1url = (newdata.config && newdata.config.stat1.url) || null
      this.enhanced1key = (newdata.config && newdata.config.stat1.key) || null
      this.enhanced1filter = (newdata.config && newdata.config.stat1.filter) || null
      this.enhanced2name = (newdata.config && newdata.config.stat2.name) || null
      this.enhanced2url = (newdata.config && newdata.config.stat2.url) || null
      this.enhanced2key = (newdata.config && newdata.config.stat2.key) || null
      this.enhanced2filter = (newdata.config && newdata.config.stat2.filter) || null
    },
    create: function (newdata, olddata) {
      if (newdata === true) {
        setTimeout(() => {
          this.actions = true
        }, 350)
      } else {
        // this.actions = false
      }
    }
  },

  methods: {
    async test() {
      const enhanced = new EnhancedApps({
        id: this.id,
        config: this.config
      })
      try {
        const test = await enhanced.test()
        const stat1 = this.config.stat1.key !== null ? _.get(test.data.result.stat1, this.config.stat1.key, null) : test.data.result.stat1
        const stat2 = this.config.stat2.key !== null ? _.get(test.data.result.stat2, this.config.stat2.key, null) : test.data.result.stat2
        this.stat1value = enhanced.filter(stat1, this.config.stat1.filter)
        this.stat2value = enhanced.filter(stat2, this.config.stat2.filter)
      } catch (e) {
        console.error(e)
      }
    },
    async onSubmit(evt) {
      this.stat1value = null
      this.stat2value = null
      const applicationType = this.applicationtype !== null ? this.applicationtype.appid : null
      const formData = {
        title: this.title
      }
      const media = new FormData()

      if (this.color !== null) formData.color = this.color
      if (applicationType !== null) formData.applicationType = applicationType
      if (this.title !== null) formData.title = this.title
      if (this.tags !== null) formData.tags = this.tags
      if (this.url !== null) formData.url = this.url
      if (this.description !== null) formData.description = this.description
      formData.config = this.config

      if (this.icon !== null && this.icon !== undefined && this.icon !== this.application.icon) {
        if (this.icon.startsWith('http')) {
          formData.icon = this.icon
        }
      }
      if (this.$route.path === '/admin/application') {
        formData.system = true
        formData.users = this.users
      }

      const data = {
        id: this.id,
        tile: formData
      }
      try {
        const saveditem = await this.$store.dispatch('tiles/save', data)
        this.$store.commit('tiles/create', false)
        if (this.newicon !== null) {
          media.append('icon', this.newicon)
          this.$store.dispatch('tiles/saveIcon', {
            id: saveditem.data.result.id,
            media: media
          })
        }

        try {
          await this.$store.dispatch('tiles/active', {
            id: this.application.id,
            data: {
              active: this.useritemactive === true
            }
          })
        } catch (e) {
          console.error(e)
        }

        if (this.$route.path === '/admin/application') {
          const userdata = {
            id: this.id,
            users: this.users
          }
          await this.$store.dispatch('tiles/saveUsers', userdata)
        }

        await this.$store.dispatch('app/status')
        this.$q.notify({
          message: this.$t('updated'),
          type: 'positive',
          progress: true,
          position: 'bottom',
          timeout: 1500
        })
      } catch (e) {
        this.$q.notify({
          type: 'negative',
          message: this.$t(e.response.data.result),
          progress: true,
          position: 'bottom',
          timeout: 1500
        })
      }
    },
    refreshApps() {
      this.$store.dispatch('tiles/getPossibleApps', true)
    },
    updateInput(val, done) {
      if (done) {
        done(val.toLowerCase())
      }
      // this.$refs.tags.updateInputValue(val.toLowerCase())
    },
    filterFn(val, update) {
      update(() => {
        if (val === '') {
          this.possibletags = this.allTags || []
        } else {
          const needle = val.toLowerCase()
          const tags = this.allTags || []
          this.possibletags = tags.filter(v => v.toLowerCase().indexOf(needle) > -1)
        }
      })
    },
    loadApplication() {
      this.$store.dispatch('tiles/getPossibleApps')
      this.applicationdialog = true
    },
    setApplication() {
      this.title = this.applicationtype.name
      this.description = this.applicationtype.description
      this.icon = 'https://raw.githubusercontent.com/linuxserver/Heimdall-Apps/master/' + this.applicationtype.name + '/' + this.applicationtype.icon
      if (this.applicationtype.config !== null) {
        this.enhancedType = this.applicationtype.config.type
        this.enhanced1name = this.applicationtype.config.stat1.name
        this.enhanced1url = this.applicationtype.config.stat1.url
        this.enhanced1key = this.applicationtype.config.stat1.key
        this.enhanced1filter = this.applicationtype.config.stat1.filter
        this.enhanced2name = this.applicationtype.config.stat2.name
        this.enhanced2url = this.applicationtype.config.stat2.url
        this.enhanced2key = this.applicationtype.config.stat2.key
        this.enhanced2filter = this.applicationtype.config.stat2.filter
      }
    },
    setWebsite(data) {
      this.title = data.title
      this.description = data.description
      this.icon = data.icon
      this.url = data.url
      this.websiteprotocol = data.websiteprotocol
      this.allowSelfSignedCertificates = data.allowSelfSignedCertificates
    },
    async closeCreate() {
      this.stat1value = null
      this.stat2value = null
      await this.$emit('closecreate')
      setTimeout(() => {
        this.$store.dispatch('tiles/clear')
      }, 300)
    },
    async getDockers() {
      const dockers = await axios.get(process.env.BACKEND_LOCATION + 'containers')
      this.dockers = dockers.data.result
    }
  }
}
</script>
<style lang="scss">
.iconlist {
  display: flex;
  flex-wrap: wrap;
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f1f1f1;
    border: 4px solid #f1f1f1;
    margin: 8px;
    &.selected {
      border: 4px solid #724c7a;
    }
  }
}
</style>
