<template>
  <div class="list-item" :class="{ edit: this.showback === true}">
    <div class="list-item-inner">
      <div class="list-item-front">
        <div class="icon"><img class="app-icon" :src="'http://heimdallmaster.test/storage/' + this.icon"></div>
        <div class="name">
          {{ this.application.title }}
          <span class="tags">Tags: {{ this.taglist }}</span>
          <a :href="this.application.url">url</a>
        </div>
        <div class="pinned">
          Active
          <q-icon
            :name="this.application.pinned === '1' ? 'check_box' : 'check_box_outline_blank'"
          />
        </div>
        <div class="actions">
          <q-btn size="12px" unelevated color="primary" @click="edit = true">Edit</q-btn>
          <q-btn size="12px" unelevated color="grey-2" @click="showBack()" text-color="black">Delete</q-btn>
        </div>
      </div>
      <div class="list-item-back">
        <div class="confirmation">
          Are you sure you want to delete this item?
          <div>
            <q-btn style="width: 120px;" unelevated color="red-10" @click="edit = true">Yes</q-btn>
            <q-btn size="12px" unelevated @click="hideBack()">Cancel</q-btn>
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="edit">
      <q-card style="width: calc(100% - 60px); max-width: 900px; background: #fcfcfc;">
        <div class="popup-header">
          <div class="text-h6">Application</div>
          <div class="actions">
            <q-btn flat>
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
                <label>Application name *</label>
                <q-input
                  outlined
                  v-model="title"
                  class="my-input"
                >
                </q-input>
            </div>
            <div class="input">
                <label>Application Type *</label>
                <q-select
                outlined
                :options="possibleapps"
                option-value="appid"
                option-label="name"
                map-options
                emit-value

                v-model="applicationtype"
                ></q-select>
            </div>

            <div class="input" style="position: relative;">
                <label>Colour *</label>
                <q-input
                  outlined
                  v-model="color"
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
                <label>URL</label>
                <q-input
                  outlined
                  v-model="url"
                  class="my-input"
                >
                </q-input>
            </div>

            <div class="input double">
                <label>Tags (Optional)</label>
                <q-select
                  outlined
                  v-model="tags"
                  multiple
                  :options="possibletags"
                  use-chips
                  option-value="id"
                  option-label="title"
                  map-options
                  emit-value
                />
            </div>

            <div class="input">
                <div class="icon-container">
                    <div id="appimage">
                      <img style="width: 140px" :src="'http://heimdallmaster.test/storage/' + this.application.icon" />
                    </div>
                    <div class="upload-btn-wrapper">
                        <button class="btn">Upload a file </button>
                        <input type="file" id="upload" name="file" data-com.bitwarden.browser.user-edited="yes">
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
            <q-btn flat>
              <q-icon name="save" />
              Save
            </q-btn>
            <q-btn flat v-close-popup>
              <q-icon name="block" />
              Cancel
            </q-btn>
          </div>
        </div>

      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import Tile from 'components/Tile'
export default {
  name: 'AppItem',

  props: ['application'],

  components: {
    Tile
  },

  computed: {
    possibleapps () {
      return this.$store.state.tiles.possibleapps
    },
    possibletags () {
      return this.$store.state.tags.all
    },
    taglist () {
      return this.tags.map(a => a.title).join()
    },
    preview () {
      return {
        color: this.color,
        title: this.title,
        icon: this.icon,
        url: this.url
      }
    }
  },

  data () {
    return {
      edit: false,
      showback: false,
      color: this.application.colour,
      applicationtype: this.application.appid,
      title: this.application.title,
      tags: this.application.tags,
      url: this.application.url,
      icon: this.application.icon || '../img/heimdall-icon-small.png'
    }
  },
  methods: {
    showBack: function () {
      this.showback = true
    },
    hideBack: function () {
      this.showback = false
    }
  }
}
</script>
<style lang="scss">

</style>
