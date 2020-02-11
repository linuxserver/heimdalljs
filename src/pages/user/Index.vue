<template>
  <q-page class="flex flex-center">
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
  </q-page>
</template>

<script>
import User from 'components/User'

export default {
  name: 'PageIndex',
  components: {
    User
  },
  data () {
    return {
      users: this.$store.state.users.all
    }
  }
}
</script>
