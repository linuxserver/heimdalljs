<template>
        <q-card style="width: calc(100% - 60px); max-width: 900px; background: #fcfcfc;">
          <q-form @submit="onSubmit" class="">
        <div class="popup-header">
          <div class="text-h6">Application</div>
          <div class="actions">
            <q-btn type="submit" flat>
              <q-icon name="save" />
              Save
            </q-btn>
            <q-btn flat v-close-popup>
              <q-icon name="block" />
              Cancel
            </q-btn>
          </div>
        </div>
        <q-separator />
        <q-card-section class="q-pt-none">

          <div id="create" class="create">
            <input type="hidden" name="_token" value="St25kITgoR7VYADJsYA0KBAAfTPcVYBQ5JqUR3dt">
            <div class="input">
                <q-input
                  outlined
                  v-model="title"
                  :label="this.$t('application_name')"
                  class="my-input"
                >
                </q-input>
            </div>
            <div class="input">
                <q-select
                outlined
                :options="possibleapps"
                option-value="appid"
                option-label="name"
                map-options
                :label="this.$t('application_type')"
                v-model="applicationtype"
                ></q-select>
            </div>

            <div class="input" style="position: relative;">
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
            </div>

            <div class="input">
                <q-input
                  outlined
                  v-model="url"
                  class="my-input"
                  :label="this.$t('url')"
                >
                </q-input>
            </div>

            <div class="input double">
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
            </div>

            <div class="input">
                <div class="icon-container">
                    <div id="appimage">
                      <img style="width: 140px" :src="icon" />
                    </div>
                    <div class="upload-btn-wrapper">
                       <q-file outlined ref="icon" v-model="icon" label="Icon" />
                    </div>
                </div>
            </div>

            <div class="input">
              <label>Preview</label>
              <tile
                :application="preview"
              ></tile>
            </div>

        </div>

        </q-card-section>

            <div id="sapconfig"></div>

        <q-separator />
        <div class="popup-header">
          <div class="text-h6"></div>
          <div class="actions">
            <q-btn type="submit" flat>
              <q-icon name="save" />
              Save
            </q-btn>
            <q-btn flat v-close-popup>
              <q-icon name="block" />
              Cancel
            </q-btn>
          </div>
        </div>
          </q-form>
      </q-card>

</template>

<script>
import Tile from './Tile'
export default {
  name: 'EditTile',

  props: ['application'],

  components: {
    Tile
  },

  computed: {
    possibleapps () {
      return this.$store.state.tiles.possibleapps
    },
    taglist () {
      return this.tags.map(a => a.title).join()
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
    }
  },

  data () {
    return {
      color: this.application.color,
      applicationtype: this.application.applicationType || null,
      title: this.application.title,
      tags: this.tagsParse,
      url: this.application.url,
      icon: null,
      possibletags: this.tagsParse,
      submitEmpty: false,
      submitResult: []
    }
  },

  methods: {
    async onSubmit (evt) {
      const applicationType = (this.applicationtype !== null) ? this.applicationtype.appid : null
      const formData = new FormData()
      formData.set('color', this.color)
      formData.set('applicationType', applicationType)
      formData.set('title', this.title)
      formData.set('tags', this.tags)
      formData.set('url', this.url)
      formData.append('icon', this.icon)
      try {
        await this.$store.dispatch('tiles/save', formData)
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
    }
  }

}
</script>
