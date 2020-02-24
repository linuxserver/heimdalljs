<template>
  <div class="userdetails fit">
    <q-form @submit="onSubmit" class="fit userform">
      <q-scroll-area style="height: 100%;">
        <div id="create" class="create fit">
          <div class="user-details">
            <div @click="changeavatar = !changeavatar" class="changephoto">
              <q-icon size="30px" name="photo_camera" />
              Change Image
            </div>
            <q-avatar size="220px" style="background: #c1c1c1;" class="user-avatar">
              <div class="avatar-resize"><img :src="this.seticon"></div>
            </q-avatar>

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
                label="Profile"
              />
              <q-tab
                clickable
                v-ripple
                name="mfa"
                label="Security"
              />
              <q-tab
                clickable
                v-ripple
                name="search"
                label="Homepage search"
              />
              <q-tab
                clickable
                v-ripple
                name="background"
                label="Background Image"
              />
            </q-tabs>

            <q-tab-panels v-model="tab" animated class="">
              <q-tab-panel name="general">

                <q-input
                  outlined
                  v-model="title"
                  :label="this.$t('application_name')"
                  class="my-input"
                >
                </q-input>
                <q-select
                outlined
                :options="possibleapps"
                option-value="appid"
                option-label="name"
                map-options
                :label="this.$t('application_type')"
                v-model="applicationtype"
                ></q-select>
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
                <q-input
                  outlined
                  v-model="url"
                  class="my-input"
                  :label="this.$t('url')"
                >
                </q-input>

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
                <div class="icon-container">
                    <div id="appimage">
                      <img style="width: 140px" :src="icon" />
                    </div>
                    <div class="upload-btn-wrapper">
                       <q-file outlined ref="icon" v-model="icon" label="Icon" />
                    </div>
                </div>

            <div class="input">
              <label>Preview</label>
              <tile
                :application="preview"
              ></tile>
            </div>

              </q-tab-panel>

              <q-tab-panel name="mfa">

              </q-tab-panel>

              <q-tab-panel name="search">
                <div class="text-h6">Search</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>
              <q-tab-panel name="background">
                <div class="text-h6">Background</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
        icon: this.icon,
        url: this.url
      }
    },
    tagsParse () {
      if (this.application.tags === null) {
        return []
      }
      return JSON.parse(this.application.tags)
    },
    seticon () {
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
      actions: false,
      possibletags: this.tagsParse,
      submitEmpty: false,
      submitResult: [],
      changeicon: false,
      tab: 'general'
    }
  },

  watch: {
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
        console.log('added')
      } catch (e) {
        console.log(e)
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
    closeCreate () {
      this.actions = false
      setTimeout(async function () {
        await this.$emit('closecreate')
        this.$store.dispatch('tiles/clear')
      }.bind(this), 300)
    },

    async getIcons () {
      try {
        const html = await fetch('https://cors-anywhere.herokuapp.com/' + this.url)
        // console.log(html)
        const parser = new DOMParser()
        const document = parser.parseFromString(await html.text(), 'text/html')

        const links = document.getElementsByTagName('link')
        const icons = []

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
                  console.log('link: ' + this.url)
                  let finalBase = ''
                  if (this.url.endsWith('/')) {
                    const baseurl = this.url.split('/')
                    baseurl.pop()
                    finalBase = baseurl.join('/')
                  } else {
                    finalBase = this.url
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

        console.log(icons)
      } catch (e) {
        console.log(e)
      }
    }
  }

}
</script>
