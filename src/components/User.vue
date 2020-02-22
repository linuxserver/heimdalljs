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
      <div class="extra">
        <span class="mfa"><span>2FA</span><q-icon class="mfaicon" :name="mfaicon"></q-icon></span>
      </div>
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
      icon: 'https://apps.heimdall.site/img/heimdall-logo-white.svg',
      // mfaicon: 'check_box_outline_blank'
      mfaicon: 'check_box'
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
      border-top: 1px solid #fdfdfd;
      border-bottom: 1px solid #d2d2d2;
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
      .extra {
        margin-top: 5px;
      }
      .mfa {
        background: #86658d;
        padding: 1px 5px;
        border-radius: 4px;
        color: #f3f4f4;
        display: inline-flex;
        align-items: center;
        font-weight: bold;
        text-transform: uppercase;
      }
      .mfaicon {
        font-size: 17px;
        margin-left: 4px;
      }
      .email {
        font-size: 12px;
        color: #9c9c9c;
      }
    }

</style>
