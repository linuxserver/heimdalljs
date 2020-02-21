<template>
  <div class="list-user" :class="{ edit: this.edit }">
    <div class="icon"><img class="app-icon" :src="'http://heimdallmaster.test/storage/' + this.icon"></div>
    <div class="details"><div class="name">{{ this.user.username }}<span class="email">{{ this.user.email }}</span></div></div>
    <div class="actions">
      <q-btn size="12px" unelevated icon="more_vert" @click="showBack()"></q-btn>
    </div>
  </div>
</template>

<script>

export default {
  name: 'User',

  props: ['user'],

  components: {
  },

  data () {
    return {
      edit: false,
      showback: false,
      icon: this.user.avatar || '../img/heimdall-icon-small.png'
    }
  },
  methods: {
    showBack: function () {
      this.$store.commit('users/edit', this.user)
      this.$store.commit('users/create', true)
    },
    hideBack: function () {
      this.edit = false
      this.showback = false
    }
  }
}
</script>
<style lang="scss">

    .list-user {
      width: 100%;
      max-width: 300px;
      margin: 20px;
      display: flex;
      background: #fafafa;
      padding: 20px;
      .icon {
        margin-right: 20px;
        img {
          max-height: 75px;
        }
      }
      .q-btn__wrapper {
        padding: 0;
      }
      .details {
        flex: 1;
      }
      .name {
          width: 100%;
          max-width: 300px;
          padding: 0 15px 0 0;
          display: flex;
          flex-direction: column;
      }
    }

</style>
