<template>
  <q-page class="flex">
    <div class="page-container">
      <div class="list-users">
        <user
          v-for="user in users"
          :key="user.id"
          :user="user"
        >
        </user>
      </div>
    </div>
    <edit-user :class="{ active: create === true }" v-on:closecreate="closecreate"></edit-user>
  </q-page>
</template>

<script>
import User from 'components/User'
import EditUser from 'components/EditUser'

export default {
  name: 'PageIndex',
  components: {
    User,
    EditUser
  },
  computed: {
    users: function () {
      return this.$store.state.users.all
    },
    create: {
      get () {
        return this.$store.state.users.create
      },
      set (val) {
        this.$store.commit('users/create', val)
      }
    }

  },

  methods: {
    closecreate () {
      this.$store.commit('users/create', false)
    }
  },

  mounted () {
    this.$store.commit('app/tab', 'admin')
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
