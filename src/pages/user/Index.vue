<template>
  <q-page class="flex">
    <div class="page-container">
      <div class="list-items">
        <user
          v-for="user in users"
          :key="user.id"
          :user="user"
        >
        </user>
      </div>
    </div>

    <q-dialog v-model="create">
      <edit-user :application="createuser"></edit-user>
    </q-dialog>

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

  mounted () {
    this.$store.commit('app/tab', 'admin')
  },

  data () {
    return {
    }
  }
}
</script>
