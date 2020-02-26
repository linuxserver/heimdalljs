<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered>
      <q-toolbar>

        <q-toolbar-title>
          Heimdall
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container id="app">
      <q-form @submit="onSubmit" class="">
      <q-page class="flex flex-center" style="padding: 30px;">
        <q-card class="user-signin">
          <div class="menu-avatar avatar-container flex flex-center">
            <q-avatar size="150px" class="user-avatar">
              <div class="avatar-resize" v-html="mainIcon"></div>
            </q-avatar>
          </div>
          <div class="sign-in-container">
            <q-select
              v-if="show_usernames"
              outlined
              v-model="selecteduser"
              :options="users"
              :label="this.$t('select_user')"
              color="teal"
              clearable
              option-value="id"
              option-label="username"
            >
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                >
                  <q-item-section avatar>
                    <q-avatar size="24px">
                      <img class="selectuseravatar" :src="getIcon(scope.opt.avatar)" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-html="scope.opt.username" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-input v-else v-model="username" :label="this.$t('username')" outlined>
            </q-input>
            <div class="public-option" v-if="hasPublic">
              <q-btn @click="selectUser" unelevated color="cyan-5" style="width: 50%;" class="">View public page</q-btn>
              <span class="or"><span>or</span></span>
            </div>
            <q-input v-if="hasPassword" v-model="password" :label="this.$t('password')" outlined :type="isPwd ? 'password' : 'text'">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-input v-if="loginStatus === 'multifactor'" v-model="totp" :label="this.$t('totp')" outlined>
            </q-input>
            <q-btn type="submit" unelevated color="cyan-8" style="padding: 10px;" class="full-width">Login</q-btn>
          </div>
        </q-card>
      </q-page>
      </q-form>
    </q-page-container>
  </q-layout>

</template>

<script>

export default {
  name: 'SelectUser',

  components: {
  },

  computed: {
    users () {
      // replace with vuex stor eventually
      return this.$store.state.users.all
    },
    show_usernames () {
      return this.$store.state.app.settings.show_usernames === 'yes'
    },
    mainIcon () {
      if (this.selecteduser !== null) {
        return '<img class="avatar" src="' + this.getIcon(this.selecteduser.avatar) + '" />'
      }
      return '<img class="avatar" src="statics/heimdall-logo-white.svg" />'
    },
    hasPublic () {
      if (this.selecteduser !== null && this.selecteduser.public === true) {
        return true
      }
      return false
    },
    hasPassword () {
      if (this.selecteduser !== null) {
        return this.selecteduser.hasPassword
      }
      return false
    },
    loginStatus () {
      console.log(this.$store.state.app.loginStatus)
      return this.$store.state.app.loginStatus
    }
  },

  data () {
    return {
      icon: null,
      selecteduser: null,
      username: null,
      password: '',
      totp: null,
      isPwd: true,
      backend: process.env.BACKEND_LOCATION
    }
  },

  methods: {
    getIcon (icon) {
      if (icon !== null && icon !== 'null') {
        return this.backend + icon
      }
      return 'statics/heimdall-logo-white.svg'
    },
    selectUser () {
      this.$store.dispatch('app/setUser', this.selecteduser)
    },
    async onSubmit (evt) {
      const username = (this.show_usernames === true) ? this.selecteduser.username : this.username
      try {
        await this.$store.dispatch('app/login', {
          username: username,
          password: this.password,
          totp: this.totp || ''
        })
        console.log('logged in')
      } catch (e) {
        this.$q.notify({
          type: 'negative',
          message: this.$t(e.response.data.result),
          progress: true,
          position: 'bottom',
          timeout: 1500
        })
      }
    }
  },

  mounted () {
  }
}
</script>
<style lang="scss">
  .public-option {
    display: flex;
    margin-bottom: 25px;
  }
  .avatar-container {
    padding: 30px;
    background: radial-gradient(ellipse at center, #47918a 0%, #0b3161 100%);
  }
  .avatar {
    display: block;
    height: 140px!important;
    width: auto;
  }

  .user-signin {
    width: 100%;
    max-width: 400px;
  }
  .sign-in-container {
    padding: 20px;
    background: #f1f1f1;
  }
  .q-field--outlined {
    margin-bottom: 20px;
  }
  .or {
    display: flex;
    padding: 10px 0;
    justify-content: center;
    align-items: center;
    position: relative;
    width: calc(50% - 20px);
    margin-left: 20px;
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0px;
      right: 0;
      border-top: 1px solid #dedede;
    }
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 0px;
      right: 0;
      margin-top: 1px;
      border-top: 1px solid #f9f9f9;
    }
    span {
      display: flex;
      width: 35px;
      height: 35px;
      justify-content: center;
      align-items: center;
      background: #e4e3e3;
      border-radius: 50%;
      position: relative;
      z-index: 1;
    }
  }
    .selectuseravatar {
      padding: 3px;
      background: #724c7a;
    }

</style>
