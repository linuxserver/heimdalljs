<template>
  <div id="q-app">
    <div v-if="status !== 'setup'">
      <router-view />
    </div>
    <div v-else>
      <setup></setup>
    </div>
  </div>
</template>

<script>
import Setup from './layouts/Setup'
export default {
  name: 'App',

  components: {
    Setup
  },

  computed: {
    status () {
      return this.$store.state.app.status
    }
  },

  data () {
    return {
    }
  },
  mounted () {
    this.$store.dispatch('app/ping')
    // this.$store.dispatch('tiles/getApps')
    // this.$store.dispatch('tags/getTags')
    // this.$store.dispatch('tiles/getPossibleApps')
    // this.$store.dispatch('users/getUsers')
  }
}
</script>
