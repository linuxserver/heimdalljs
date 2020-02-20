<template>
        <q-card style="width: calc(100% - 60px); max-width: 900px; background: #fcfcfc;">
          <q-form @submit="onSubmit" class="">
        <div class="popup-header">
          <div class="text-h6">User</div>
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
export default {
  name: 'EdiUser',

  props: ['user'],

  components: {
  },

  computed: {
  },

  data () {
    return {
      id: this.application.id,
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
      formData.append('color', this.color)
      formData.append('applicationType', applicationType)
      formData.append('title', this.title)
      formData.append('tags', this.tags)
      formData.append('url', this.url)
      formData.append('icon', this.icon)
      try {
        await this.$store.dispatch('tiles/save', this.id, formData)
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
