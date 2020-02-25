<template>
  <div class="userdetails fit">
    <q-form @submit="onSubmit" class="fit userform">
      <q-scroll-area style="height: 100%;">
        <div id="create" class="create fit">
          <div class="user-details">
            <div class="buttons">
              <q-btn unelevated @click="loadApplication" color="grey-5">Application</q-btn>
              <q-btn unelevated @click="websitedialog = true" color="grey-5">Website</q-btn>
              <q-btn unelevated color="grey-5">Docker</q-btn>
            </div>
            <tile
              :application="preview"
            ></tile>

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
              <q-tab
                clickable
                v-ripple
                name="general"
                label="General"
              />
              <q-tab
                clickable
                v-ripple
                name="image"
                label="Look"
              />
              <q-tab
                clickable
                v-ripple
                name="mfa"
                label="Security"
              />
            </q-tabs>

            <q-tab-panels v-model="tab" animated class="">
              <q-tab-panel name="general">

                <q-input
                  outlined
                  v-model="title"
                  :label="this.$t('title')"
                  class="my-input"
                >
                </q-input>
                <q-input
                  outlined
                  v-model="url"
                  class="my-input"
                  :label="this.$t('url')"
                >
                </q-input>

                <q-input
                  v-model="description"
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
                  @filter="filterFn"
                />

              </q-tab-panel>

              <q-tab-panel name="mfa">

              </q-tab-panel>

              <q-tab-panel name="image">
                <q-input
                  outlined
                  v-model="color"
                  :label="this.$t('colour')"
                  class="my-input"
                >
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
                       <q-file outlined ref="icon" v-model="icon" label="Icon" />
                    </div>
                </div>

              </q-tab-panel>
            </q-tab-panels>

          </div>
        </div>
      </q-scroll-area>
      <div class="useractions" :class="{ active: actions }">
        <q-btn type="submit" flat>
          <q-icon name="save" />
          Save
        </q-btn>
        <q-btn flat @click="closeCreate">
          <q-icon name="block" />
          Cancel
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
          <q-btn unelevated label="Set" @click="setApplication" color="primary" v-close-popup />
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
          <q-btn unelevated v-if="websitedata !== null" label="Set" @click="setWebsite" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
// import axios from 'axios'
import Tile from './Tile'
export default {
  name: 'EditTile',

  props: [],

  components: {
    Tile
  },

  computed: {
    application () {
      return this.$store.state.tiles.edit
    },

    possibleapps () {
      return this.$store.state.tiles.possibleapps
    },
    taglist () {
      return this.tags.map(a => a.title).join()
    },
    create () {
      return this.$store.state.tiles.create
    },

    preview () {
      return {
        color: this.color || '#222222',
        title: this.title,
        icon: this.seticon,
        url: this.url,
        preview: true
      }
    },
    tagsParse () {
      if (this.application.tags === null) {
        return []
      }
      return JSON.parse(this.application.tags)
    },
    seticon () {
      if (this.icon) return this.icon
      return (this.application.icon !== null) ? process.env.BACKEND_LOCATION + this.application.icon : 'https://apps.heimdall.site/img/heimdall-logo-white.svg'
    }
  },

  data () {
    return {
      id: null,
      color: null,
      applicationtype: null,
      title: null,
      tags: null,
      url: null,
      icon: null,
      description: '',
      actions: false,
      possibletags: this.tagsParse,
      submitEmpty: false,
      submitResult: [],
      changeicon: false,
      tab: 'general',
      applicationdialog: false,
      websitedialog: false,
      dockerdialog: false,
      websitedata: null,
      selectedwebsiteimage: null,
      website: null
    }
  },

  watch: {
    application: function (newdata, olddata) {
      // console.log(newdata)
      this.id = newdata.id
      this.icon = newdata.icon
      this.title = newdata.title
      this.description = newdata.description
      this.color = newdata.color
      this.url = newdata.url
    },

    create: function (newdata, olddata) {
      if (newdata === true) {
        setTimeout(function () {
          this.actions = true
        }.bind(this), 350)
      } else {
        // this.actions = false
      }
    }
  },

  methods: {
    async onSubmit (evt) {
      const applicationType = (this.applicationtype !== null) ? this.applicationtype.appid : null
      const formData = new FormData()
      formData.append('color', this.color)
      formData.append('applicationType', applicationType)
      formData.append('title', this.title)
      formData.append('tags', this.tags)
      formData.append('url', this.url)
      formData.append('icon', this.icon)
      const data = {
        id: this.id,
        tile: formData
      }
      try {
        await this.$store.dispatch('tiles/save', data)
        this.$store.commit('tiles/create', false)
        await this.$store.dispatch('app/status')
        this.$q.notify({
          type: 'positive',
          message: 'Updated',
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
    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.possibletags = this.application.tags || []
        } else {
          const needle = val.toLowerCase()
          const tags = this.application.tags || []
          this.possibletags = tags.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    },
    loadApplication () {
      this.$store.dispatch('tiles/getPossibleApps')
      this.applicationdialog = true
    },
    setApplication () {
      this.title = this.applicationtype.name
      this.description = this.applicationtype.description
      this.icon = 'https://raw.githubusercontent.com/linuxserver/Heimdall-Apps/master/' + this.applicationtype.name + '/' + this.applicationtype.icon
    },
    setWebsite () {
      this.title = this.websitedata.title
      this.description = this.websitedata.description
      this.icon = this.websitedata.icons[this.selectedwebsiteimage]
      this.url = this.website
    },
    selectWebsiteImage (key) {
      this.selectedwebsiteimage = key
    },
    async closeCreate () {
      await this.$emit('closecreate')
      setTimeout(function () {
        this.$store.dispatch('tiles/clear')
      }.bind(this), 300)
    },

    async getWebsiteData () {
      try {
        const websitedata = {}
        const html = await fetch('https://cors-anywhere.herokuapp.com/' + this.website)
        // console.log(html)
        const parser = new DOMParser()
        const document = parser.parseFromString(await html.text(), 'text/html')

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
