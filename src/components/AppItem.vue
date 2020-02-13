<template>
  <div class="list-item">
    <div class="list-item-inner">
      <div class="list-item-front">
        <div class="icon"><img class="app-icon" :src="'http://heimdallmaster.test/storage/' + this.icon"></div>
        <div class="name">
          {{ this.application.title }}
          <span class="tags">Tags: dashboard, dev, work</span>
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
      </div>
    </div>

    <q-dialog v-model="edit">
      <q-card style="width: calc(100% - 60px); max-width: 900px; background: #ececec;">
        <q-card-section>
          <div class="text-h6">Application</div>
        </q-card-section>
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
                v-model="application"
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

            <div class="input">
                <label>Tags (Optional)</label>
                <select class="tags select2-hidden-accessible" multiple="" name="tags[]" data-select2-id="1" tabindex="-1" aria-hidden="true"><option value="0" selected="selected" data-select2-id="3">Home dashboard</option><option value="4">test</option></select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="2" style="width: 280px;"><span class="selection"><span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1"><ul class="select2-selection__rendered"><li class="select2-selection__choice" title="Home dashboard" data-select2-id="4"><span class="select2-selection__choice__remove" role="presentation">×</span>Home dashboard</li><li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" placeholder="" style="width: 0.75em;"></li></ul></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
            </div>

            <div class="input">
                <div class="icon-container">
                    <div id="appimage">
                                        </div>
                    <div class="upload-btn-wrapper">
                        <button class="btn">Upload a file </button>
                        <input type="file" id="upload" name="file" data-com.bitwarden.browser.user-edited="yes">
                    </div>
                </div>
            </div>

        </div>

        </q-card-section>

                <q-separator />

        <q-card-section>
          <div class="text-h6">Preview</div>
        </q-card-section>
        <q-separator />

            <div id="tile-preview" class="input">
                <section class="item-container" data-id="">
                        <div class="item set-bg-elem" style="background-color: rgb(0, 136, 255); color: white;">
                                                        <img class="app-icon" src="http://heimdallmaster.test/img/heimdall-icon-small.png">
                                                        <div class="details">
                                <div class="title white">NZBHydra</div>
                                                            </div>
                            <a class="link white" href="http://192.168.0.20:5076/"><svg class="svg-inline--fa fa-arrow-alt-to-right fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="arrow-alt-to-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M448 88v336c0 13.3-10.7 24-24 24h-24c-13.3 0-24-10.7-24-24V88c0-13.3 10.7-24 24-24h24c13.3 0 24 10.7 24 24zM24 320h136v87.7c0 17.8 21.5 26.7 34.1 14.1l152.2-152.2c7.5-7.5 7.5-19.8 0-27.3L194.1 90.1c-12.6-12.6-34.1-3.7-34.1 14.1V192H24c-13.3 0-24 10.7-24 24v80c0 13.3 10.7 24 24 24z"></path></svg><!-- <i class="fas fa-arrow-alt-to-right"></i> --></a>
                        </div>
                        <a class="item-edit" href="http://heimdallmaster.test/items/11/edit"><svg class="svg-inline--fa fa-pencil fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="pencil" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg><!-- <i class="fas fa-pencil"></i> --></a>
                    </section>
            </div>
            <div id="sapconfig"></div>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>

export default {
  name: 'AppItem',

  props: ['application'],

  components: {
  },

  data () {
    return {
      edit: false,
      showback: false,
      color: this.application.colour,
      title: this.application.title,
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
