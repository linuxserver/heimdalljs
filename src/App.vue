<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  mounted () {
    this.$store.dispatch('tiles/getApps')
    this.$store.dispatch('users/getUsers')
  }
}
</script>
