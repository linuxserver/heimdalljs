<template>
  <div class="userdetails fit">
    <q-form @submit="onSubmit" class="fit userform">
      <q-scroll-area style="height: 100%;">
        <div id="create" class="create fit">
          <div class="tile-details">
            <div class="buttons">
              <q-btn unelevated @click="loadApplication" color="grey-5">{{
                $tc('application')
              }}</q-btn>
              <q-btn unelevated @click="websitedialog = true" color="grey-5">{{
                $t('website')
              }}</q-btn>
              <!--<q-btn unelevated @click="dockerdialog = true" color="grey-5"
                >Docker</q-btn>-->
            </div>
            <tile :application="preview"></tile>

            <div v-if="changeicon">
              <q-file outlined v-model="avatar" :label="this.$t('upload_file')">
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
              <q-input
                outlined
                v-model="urlavatar"
                type="url"
                :label="this.$t('url')"
              >
                <template v-slot:prepend>
                  <q-icon name="http" />
                </template>
              </q-input>
            </div>
            <div class="name"></div>
            <div class="email"></div>
          </div>
          <div class="user-options">
            <q-tabs
              v-model="tab"
              indicator-color="purple"
              align="justify"
              inline-label
            >
              <q-tab clickable v-ripple name="general" :label="$t('general')" />
              <q-tab
                clickable
                v-ripple
                name="image"
                :label="$t('appearance')"
              />
              <q-tab
                clickable
                v-ripple
                name="enhanced"
                :label="$t('enhanced')"
              />
              <q-tab
                v-if="$route.path === '/admin/application'"
                clickable
                v-ripple
                name="users"
                :label="$tc('user')"
              />
            </q-tabs>

            <q-tab-panels v-model="tab" animated class="">
              <q-tab-panel name="general">
                <q-input
                  outlined
                  v-model="title"
                  :label="this.$t('title')"
                  :rules="[val => !!val || this.$t('required_field')]"
                >
                </q-input>
                <q-input
                  outlined
                  v-model="url"
                  :label="this.$t('url')"
                  :rules="[val => !!val || this.$t('required_field')]"
                >
                </q-input>

                <q-input
                  v-model="description"
                  :label="this.$t('description')"
                  outlined
                  type="textarea"
                />
                <q-select
                  :label="this.$t('Tags')"
                  outlined
                  v-model="tags"
                  multiple
                  :options="possibletags"
                  use-input
                  new-value-mode="add-unique"
                  emit-value
                  use-chips
                  ref="tags"
                  @new-value="updateInput"
                  @filter="filterFn"
                />
              </q-tab-panel>

              <q-tab-panel name="image">
                <q-input outlined v-model="color" :label="this.$t('colour')">
                  <template v-slot:append>
                    <q-icon name="colorize" class="cursor-pointer">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-color v-model="color" format-model="hexa" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <div class="icon-container">
                  <div class="upload-btn-wrapper">
                    <q-file
                      outlined
                      ref="icon"
                      v-model="newicon"
                      label="Icon"
                    />
                  </div>
                </div>
              </q-tab-panel>
              <q-tab-panel
                v-if="$route.path === '/admin/application'"
                name="users"
              >
                <q-select
                  :label="this.$t('users')"
                  outlined
                  v-model="users"
                  multiple
                  :options="possibleusers"
                  use-input
                  new-value-mode="add-unique"
                  use-chips
                  option-value="id"
                  option-label="username"
                  map-options
                  emit-value
                  ref="users"
                />
              </q-tab-panel>

              <q-tab-panel name="enhanced">
                <q-select
                  outlined
                  v-model="enhancedType"
                  :label="this.$t('authtype')"
                  :options="possibletypes"
                  option-value="id"
                  option-label="value"
                  emit-value
                  map-options
                >
                </q-select>

                <div class="enhanced-tab" v-if="enhancedType !== 'disabled'">
                  <q-tab-panels v-model="enhancedType" animated class="">
                    <q-tab-panel name="none">
                      No auth
                    </q-tab-panel>
                    <q-tab-panel name="apikey">
                      <q-input
                        outlined
                        v-model="apikey"
                        :label="this.$t('enter_apikey')"
                      ></q-input>
                    </q-tab-panel>
                    <q-tab-panel name="cookie">
                      Cookie based
                    </q-tab-panel>
                  </q-tab-panels>
                  <div class="stats">
                    <div class="stat">
                      <div class="text-h6">Stat 1</div>
                      <q-input
                        outlined
                        v-model="enhanced1name"
                        :label="this.$t('name')"
                      >
                      </q-input>
                      <q-input
                        outlined
                        v-model="enhanced1url"
                        :label="this.$t('url')"
                      >
                      </q-input>
                      <q-input
                        outlined
                        v-model="enhanced1key"
                        :label="this.$t('key')"
                      >
                      </q-input>
                      <q-select
                        outlined
                        v-model="enhanced1filter"
                        :label="this.$t('filter')"
                        :options="filters"
                        option-value="id"
                        option-label="value"
                        map-options
                        emit-value
                      >
                      </q-select>
                      <q-select
                        outlined
                        v-model="enhanced1updateOnChange"
                        :label="this.$t('update_on_change')"
                        :options="['Yes', 'No']"
                      >
                      </q-select>
                    </div>
                    <div class="stat">
                      <div class="text-h6">Stat 2</div>
                      <q-input
                        outlined
                        v-model="enhanced2name"
                        :label="this.$t('name')"
                      >
                      </q-input>
                      <q-input
                        outlined
                        v-model="enhanced2url"
                        :label="this.$t('url')"
                      >
                      </q-input>
                      <q-input
                        outlined
                        v-model="enhanced2key"
                        :label="this.$t('key')"
                      >
                      </q-input>
                      <q-select
                        outlined
                        v-model="enhanced2filter"
                        :label="this.$t('filter')"
                        :options="filters"
                        option-value="id"
                        option-label="value"
                        map-options
                      >
                      </q-select>
                      <q-select
                        outlined
                        v-model="enhanced2updateOnChange"
                        :label="this.$t('update_on_change')"
                        :options="['Yes', 'No']"
                      >
                      </q-select>
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
          <div class="text-h6">Select Application</div>
        </q-card-section>

        <q-card-section style="width: 500px;" class="q-pt-none">
          <q-select
            outlined
            :options="possibleapps"
            option-value="appid"
            option-label="name"
            map-options
            :label="this.$t('application_type')"
            v-model="applicationtype"
          ></q-select>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            unelevated
            label="Set"
            @click="setApplication"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="websitedialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Enter website address</div>
        </q-card-section>
        <q-card-section style="width: 500px;" class="q-pt-none">
          <q-input
            outlined
            v-model="website"
            :label="this.$t('website')"
          ></q-input>
          <q-btn flat label="Lookup" @click="getWebsiteData" color="primary" />

          <div class="iconlist" v-if="websitedata">
            <div
              class="icon"
              :class="{ selected: key === selectedwebsiteimage }"
              v-for="(icon, key) in websitedata.icons"
              :key="key"
              @click="selectWebsiteImage(key)"
            >
              <img :src="icon" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            unelevated
            v-if="websitedata !== null"
            label="Set"
            @click="setWebsite"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dockerdialog" @show="getDockers">
      <q-card>
        <q-card-section>
          <div class="text-h6">Available docker containers</div>
        </q-card-section>
        <q-card-section style="width: 500px;" class="q-pt-none">
          <div v-if="dockers.length > 0">
            <div class="text-h6">Active</div>
            <div
              v-for="docker in dockers.filter(d => d.state === 'running')"
              :key="docker.id"
            >
              {{ docker.image }}
            </div>
            <div class="text-h6">Inactive</div>
            <div
              v-for="docker in dockers.filter(d => d.state !== 'running')"
              :key="docker.id"
            >
              {{ docker.image }}
            </div>
          </div>
          <div v-else>No containers available</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            unelevated
            v-if="websitedata !== null"
            label="Set"
            @click="setWebsite"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import Tile from './Tile'
import EnhancedApps from '../plugins/EnhancedApps'
export default {
  name: 'EditTile',

  props: [],

  components: {
    Tile
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
      return this.application.icon !== null
        ? process.env.BACKEND_LOCATION + this.application.icon
        : 'statics/heimdall-logo-white.svg'
    }
  },

  data() {
    return {
      id: null,
      color: null,
      applicationtype: null,
      title: null,
      tags: null,
      users: null,
      url: null,
      icon: null,
      newicon: null,
      description: '',
      actions: false,
      submitEmpty: false,
      submitResult: [],
      changeicon: false,
      tab: 'general',
      applicationdialog: false,
      websitedialog: false,
      dockerdialog: false,
      websitedata: null,
      selectedwebsiteimage: null,
      possibletags: [],
      website: null,
      dockers: [],
      enhancedType: 'disabled',
      apikey: '',
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
      // console.log(newdata)
      this.id = newdata.id
      this.icon = newdata.icon
      this.title = newdata.title
      this.users = newdata.Users
      this.tags = newdata.tags
      this.description = newdata.description
      this.color = newdata.color
      this.url = newdata.url
      this.applicationtype = newdata.applicationType
      this.enhancedType = newdata.config.enhancedType || false
      this.apikey = newdata.config.apikey || ''
      this.enhanced1name = newdata.config.stat1.name || null
      this.enhanced1url = newdata.config.stat1.url || null
      this.enhanced1key = newdata.config.stat1.key || null
      this.enhanced1filter = newdata.config.stat1.filter || null
      this.enhanced2name = newdata.config.stat2.name || null
      this.enhanced2url = newdata.config.stat2.url || null
      this.enhanced2key = newdata.config.stat2.key || null
      this.enhanced2filter = newdata.config.stat2.filter || null
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
      const enhanced = new EnhancedApps(this.config)
      try {
        const test = await enhanced.test()
        console.log(test)
      } catch (e) {
        console.log(e)
      }
    },
    async onSubmit(evt) {
      const applicationType =
        this.applicationtype !== null ? this.applicationtype.appid : null
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
      if (this.icon !== null && this.icon !== this.application.icon) {
        if (this.icon.startsWith('http')) {
          formData.icon = this.icon
        }
      }
      console.log('this.newicon')
      console.log(this.newicon)
      if (this.$route.path === '/admin/application') {
        formData.system = true
        formData.users = this.users
      }

      const data = {
        id: this.id,
        tile: formData
      }
      console.log(data)
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
        // console.log('error')
        // console.log(e)
        // console.log(e.response)
        this.$q.notify({
          type: 'negative',
          message: this.$t(e.response.data.result),
          progress: true,
          position: 'bottom',
          timeout: 1500
        })
      }
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
          this.possibletags = tags.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          )
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
      this.icon =
        'https://raw.githubusercontent.com/linuxserver/Heimdall-Apps/master/' +
        this.applicationtype.name +
        '/' +
        this.applicationtype.icon
      console.log(this.applicationtype.config)
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
    setWebsite() {
      this.title = this.websitedata.title
      this.description = this.websitedata.description
      this.icon = this.websitedata.icons[this.selectedwebsiteimage]
      this.url = this.website
    },
    selectWebsiteImage(key) {
      this.selectedwebsiteimage = key
    },
    async closeCreate() {
      await this.$emit('closecreate')
      setTimeout(() => {
        this.$store.dispatch('tiles/clear')
      }, 300)
    },
    async getDockers() {
      const dockers = await axios.get(
        process.env.BACKEND_LOCATION + 'containers'
      )
      this.dockers = dockers.data.result
    },
    async getWebsiteData() {
      try {
        const websitedata = {}
        const html = await axios.get(
          process.env.BACKEND_LOCATION + 'cors/' + this.website
        )
        // const html = await fetch(process.env.BACKEND_LOCATION + 'cors/' + this.website)
        // console.log(html)
        const parser = new DOMParser()
        const document = parser.parseFromString(await html.data, 'text/html')

        const links = document.getElementsByTagName('link')
        websitedata.title = document.getElementsByTagName('title')[0].innerText
        const metas = document.getElementsByTagName('meta')
        const icons = []

        for (let i = 0; i < metas.length; i++) {
          if (metas[i].getAttribute('name') === 'description') {
            websitedata.description = metas[i].getAttribute('content')
          }
        }

        for (let i = 0; i < links.length; i++) {
          const link = links[i]

          // Technically it could be null / undefined if someone didn't set it!
          // People do weird things when building pages!
          const rel = link.getAttribute('rel')
          if (rel) {
            // I don't know why people don't use indexOf more often
            // It is faster than regex for simple stuff like this
            // Lowercase comparison for safety
            if (rel.toLowerCase().indexOf('icon') > -1) {
              const href = link.getAttribute('href')

              // Make sure href is not null / undefined
              if (href) {
                // Relative
                // Lowercase comparison in case some idiot decides to put the
                // https or http in caps
                // Also check for absolute url with no protocol
                if (
                  href.toLowerCase().indexOf('https:') === -1 &&
                  href.toLowerCase().indexOf('http:') === -1 &&
                  href.indexOf('//') !== 0
                ) {
                  // This is of course assuming the script is executing in the browser
                  // Node.js is a different story! As I would be using cheerio.js for parsing the html instead of document.
                  // Also you would use the response.headers object for Node.js below.
                  console.log('link: ' + this.website)
                  let finalBase = ''
                  if (this.website.endsWith('/')) {
                    const baseurl = this.website.split('/')
                    baseurl.pop()
                    finalBase = baseurl.join('/')
                  } else {
                    finalBase = this.website
                  }

                  let absoluteHref = finalBase

                  // We already have a forward slash
                  // On the front of the href
                  if (href.indexOf('/') === 0) {
                    absoluteHref += href
                  } else {
                    // We don't have a forward slash
                    // It is really relative!
                    const path = window.location.pathname.split('/')
                    path.pop()
                    const finalPath = path.join('/')

                    absoluteHref += finalPath + '/' + href
                  }

                  icons.push(absoluteHref)
                } else if (href.indexOf('//') === 0) {
                  // Absolute url with no protocol
                  const absoluteUrl = window.location.protocol + href

                  icons.push(absoluteUrl)
                } else {
                  // Absolute
                  icons.push(href)
                }
              }
            }
          }
        }
        websitedata.icons = icons
        this.websitedata = websitedata
        console.log(websitedata)
      } catch (e) {
        console.log(e)
      }
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
