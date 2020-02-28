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
  async mounted () {
    console.log(this.user)
    await this.$store.dispatch('app/status')
    this.$store.dispatch('users/getUsers')
  }
}
</script>
