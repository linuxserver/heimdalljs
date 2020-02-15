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

      <q-page class="flex flex-center" style="padding: 30px;">
        <q-card class="user-signin">
          <div class="avatar-container flex flex-center">
            <q-avatar size="124px" color="orange" v-html="mainIcon">
            </q-avatar>
          </div>
          <div class="sign-in-container">
            <q-select
              outlined
              v-model="selecteduser"
              :options="users"
              label="Select user"
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
                      <img :src="scope.opt.avatar || 'statics/heimdall-icon-small.png'" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-html="scope.opt.username" />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <div class="public-option" v-if="hasPublic">
              <q-btn @click="selectUser" unelevated color="cyan-5" style="width: 50%;" class="">View public page</q-btn>
              <span class="or"><span>or</span></span>
            </div>
            <q-input v-model="password" label="Password" outlined :type="isPwd ? 'password' : 'text'">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-btn unelevated color="cyan-8" style="padding: 10px;" class="full-width">Login</q-btn>
          </div>
        </q-card>
      </q-page>

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
      return [
        {
          id: 1,
          username: 'admin',
          avatar: null,
          public: true
        },
        {
          id: 2,
          username: 'kode',
          avatar: null,
          public: false
        }
      ]
    },
    mainIcon () {
      if (this.icon !== null) {
        return '<img src="' + this.icon + '" />'
      }
      return '<img src="statics/heimdall-icon-small.png" />'
    },
    hasPublic () {
      if (this.selecteduser !== null && this.selecteduser.public === true) {
        return true
      }
      return false
    }
  },

  data () {
    return {
      icon: null,
      selecteduser: null,
      password: '',
      isPwd: true
    }
  },

  methods: {
    selectUser () {
      this.$store.dispatch('app/setUser', this.users[this.selecteduser])
    }
  },

  mounted () {
  }
}
</script>
<style lang="scss" scoped>
  .public-option {
    display: flex;
    margin-bottom: 25px;
  }
  .avatar-container {
    padding: 30px;
    background: #ccc;
    img {
      display: block;
    }
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

</style>
