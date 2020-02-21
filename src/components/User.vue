<template>
  <div class="list-user" :class="{ edit: this.edit }">
    <div class="icon">
      <q-avatar size="75px" class="user-avatar">
        <img :src="icon">
      </q-avatar>
    </div>
    <div class="details">
      <div class="name">{{ this.user.username }}</div>
      <span class="email">{{ this.user.email }}</span>
      <span>2FA</span>
    </div>
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
      icon: 'https://apps.heimdall.site/img/heimdall-logo-white.svg'
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
      max-width: 380px;
      margin: 20px;
      display: flex;
      background: #ffffff87;
      padding: 20px;
      box-shadow: 0 0 10px #0000000f;
      border-radius: 4px;
      .icon {
        margin-right: 20px;
        img {
          max-height: 75px;
          display: block;
        }
      }
      .q-btn__wrapper {
        padding: 0;
      }
      .details {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .name {
          width: 100%;
          max-width: 300px;
          padding: 0 15px 0 0;
          font-weight: bold;
      }
      .email {
        font-size: 12px;
      }
    }

</style>
