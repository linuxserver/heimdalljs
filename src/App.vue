<template>
  <div id="q-app">
    <div v-if="status === 'setup'">
      <setup></setup>
    </div>
    <div v-else>
      <div v-if="user === null">
        <select-user></select-user>
      </div>
      <router-view v-else />
    </div>
  </div>
</template>

<script>
import SelectUser from './pages/SelectUser'
import Setup from './layouts/Setup'
export default {
  name: 'App',

  components: {
    Setup,
    SelectUser
  },

  computed: {
    status() {
      return this.$store.state.app.status
    },
    user() {
      return this.$store.state.app.user
    },
    lang() {
      return this.$store.state.app.settings.language
    }
  },

  watch: {
    lang(lang) {
      this.$i18n.locale = lang
    },
    $route(to, from) {
      document.title = this.$store.state.app.settings.page_title || 'Loading...'
    }
  },

  data() {
    return {}
  },
  async mounted() {
    await this.$store.dispatch('app/status')
    this.$store.dispatch('users/getUsers')
    document.title = this.$store.state.app.settings.page_title || 'Loading...'
  }
}
</script>
