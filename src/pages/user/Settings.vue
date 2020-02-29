<template>
  <q-page class="flex">
    <edit-user class="active"></edit-user>
  </q-page>
</template>

<script>
import EditUser from 'components/EditUser'

export default {
  name: 'PageIndex',
  components: {
    EditUser
  },
  computed: {

  },

  methods: {
    closecreate () {
      this.$store.commit('users/create', false)
    }
  },

  mounted () {
    this.$store.commit('users/edit', this.$store.state.app.user)
  },

  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
  .list-users {
    display: flex;
    flex-wrap: wrap;
  }
</style>
