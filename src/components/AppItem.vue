<template>
  <div class="list-item" :class="{ edit: this.showback === true}">
    <div class="icon"><img class="app-icon" :src="appIcon"></div>
    <div class="name">
      {{ this.application.title }}
      <span class="tags">Tags: {{ this.taglist }}</span>
      <a :href="this.application.url">url</a>
    </div>
    <div class="pinned">
      Active
      <q-icon
        @click="toggleActive"
        :name="this.application.UserItem.active === true ? 'check_box' : 'check_box_outline_blank'"
      />
    </div>
    <div class="actions">
      <q-btn size="12px" unelevated color="primary" @click="showBack">Edit</q-btn>
      <q-btn size="12px" unelevated color="grey-2" text-color="black">Delete</q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppItem',
  props: ['application'],
  components: {
  },
  computed: {
    possibleapps () {
      return this.$store.state.tiles.possibleapps
    },
    possibletags () {
      return this.$store.state.tags.all
    },
    taglist () {
      return null
      // return this.tags.map(a => a.title).join()
    },
    preview () {
      return {
        color: this.color,
        title: this.title,
        icon: this.icon,
        url: this.url
      }
    },
    appIcon () {
      return process.env.BACKEND_LOCATION + this.application.icon
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
      console.log(this.application)
      this.$store.commit('tiles/edit', this.application)
      this.$store.commit('tiles/create', true)
    },
    hideBack: function () {
      this.showback = false
    },
    async toggleActive () {
      const formData = {
        active: (this.application.UserItem.active === false)
      }
      const data = {
        id: this.application.id,
        data: formData
      }
      await this.$store.dispatch('tiles/active', data)
      this.$store.dispatch('tiles/getApps')
    }
  }
}
</script>
<style lang="scss">
</style>
