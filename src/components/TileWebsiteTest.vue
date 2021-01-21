<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Enter website address</div>
    </q-card-section>
    <q-card-section style="width: 500px" class="q-pt-none">
      <q-input outlined v-model="url" :label="this.$t('website')" :rules="[val => !!val || this.$t('required_field'), val => isValidURL(val) || this.$t('invalid_input_url')]"></q-input>
      <q-checkbox v-show="websiteprotocol === 'https'" v-model="allowSelfSignedCertificates" label="Allow self-signed and/or invalid certificates"></q-checkbox>
      <div class="iconlist" v-if="websitedata">
        <div class="icon" :class="{ selected: key === selectedwebsiteimage }" v-for="(icon, key) in websitedata.icons" :key="key" @click="selectWebsiteImage(key)">
          <img :src="icon" />
        </div>
      </div>
      <q-banner v-show="this.lookuperror" class="text-white bg-red">
        {{ this.$t('Error') + ': ' + this.lookuperror }}
      </q-banner>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Lookup" @click="getWebsiteData" :loading="websitetest === 'In Progress'" />
      <q-btn flat label="Cancel" color="primary" v-close-popup />
      <q-btn unelevated v-if="websitedata !== null" label="Set" @click="setWebsite" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TileWebsiteTester',

  props: {
    website: {
      type: String
    },
    protocol: {
      type: String
    },
    allowselfsignedcerts: {
      type: Boolean
    }
  },

  components: {},

  computed: {
    websiteprotocol() {
      if (this.url !== null && this.url.indexOf('://') > -1) {
        return this.url.split('://')[0]
      }
      return null
    }
  },

  data() {
    return {
      websitetest: false,
      selectedwebsiteimage: null,
      selected: null,
      websitedata: null,
      allowSelfSignedCertificates: this.allowselfsignedcerts,
      url: this.website,
      lookuperror: null
    }
  },

  methods: {
    isValidURL(url) {
      try {
        const validUrl = new URL(url)
        return validUrl !== null
      } catch (e) {
        return false
      }
    },
    setWebsite() {
      this.$emit('setWebsite', {
        title: this.websitedata.title,
        description: this.websitedata.description,
        icon: this.websitedata.icons[this.selectedwebsiteimage],
        url: this.url,
        websiteprotocol: this.websiteprotocol,
        allowSelfSignedCertificates: this.allowSelfSignedCertificates
      })
    },
    selectWebsiteImage(key) {
      this.selectedwebsiteimage = key
    },
    async getWebsiteData() {
      this.websitedata = null
      this.websitetest = 'In Progress'
      this.lookuperror = null
      let html
      try {
        html = await axios.post(process.env.BACKEND_LOCATION + 'cors', {
          url: `${this.websiteprotocol}://${this.url}`,
          allowSelfSignedCertificates: this.allowSelfSignedCertificates
        })
      } catch (websiteLookupError) {
        this.websitetest = 'Error'
        this.lookuperror = websiteLookupError
        return
      }
      this.websitetest = 'Success'
      if (html && html.data && html.data.result && html.data.result.name === 'Error') {
        this.websitetest = 'Error'
        this.lookuperror = html.data.result.message
        return
      }
      try {
        const websitedata = {}
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
                if (href.toLowerCase().indexOf('https:') === -1 && href.toLowerCase().indexOf('http:') === -1 && href.indexOf('//') !== 0) {
                  // This is of course assuming the script is executing in the browser
                  // Node.js is a different story! As I would be using cheerio.js for parsing the html instead of document.
                  // Also you would use the response.headers object for Node.js below.
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
        websitedata.icons = icons
        this.websitedata = websitedata
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style></style>
