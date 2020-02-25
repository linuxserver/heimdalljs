<template>
  <div id="q-app">
    <div v-if="status !== 'setup'">
      <div v-if="user === null">
        <select-user></select-user>
      </div>
      <router-view v-else />
    </div>
    <div v-else>
      <setup></setup>
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
    status () {
      return this.$store.state.app.status
    },
    user () {
      return this.$store.state.app.user
    }
  },

  data () {
    return {
    }
  },
  mounted () {
    console.log(this.user)
    this.$store.dispatch('app/status')
    this.$store.dispatch('tiles/getApps')
    // this.$store.dispatch('tags/getTags')
    // this.$store.dispatch('tiles/getPossibleApps')
    this.$store.dispatch('users/getUsers')
  }
}
</script>
