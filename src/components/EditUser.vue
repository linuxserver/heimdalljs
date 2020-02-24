<template>
        <div class="userdetails fit">
          <q-form @submit="onSubmit" class="fit userform">
        <q-scroll-area
            style="height: 100%;"
          >
            <div id="create" class="create fit">
              <div class="user-details">
                  <div class="changephoto">
                    Change Image
                    <q-icon class="changephoto" size="30px" name="photo_camera" />
                  </div>
                    <q-avatar size="220px" style="background: #c1c1c1;" class="user-avatar">
                      <div class="avatar-resize"><img :src="this.setavatar"></div>
                    </q-avatar>

                    <div v-if="changeavatar">
                      <q-file outlined v-model="avatar" :label="this.$t('avatar')">
                        <template v-slot:prepend>
                          <q-icon name="attach_file" />
                        </template>
                      </q-file>
                    </div>

                    <div class="name">{{ user.username }}</div>
                    <div class="email">{{ user.email }}</div>

              </div>
              <div class="user-options">
                <q-tabs
                  v-model="tab"
                  indicator-color="purple"
                  align="justify"
                  inline-label
                >
                  <q-tab
                    clickable
                    v-ripple
                    name="general"
                    label="Profile"
                  />
                  <q-tab
                    clickable
                    v-ripple
                    name="mfa"
                    label="Security"
                  />
                  <q-tab
                    clickable
                    v-ripple
                    name="search"
                    label="Homepage search"
                  />
                  <q-tab
                    clickable
                    v-ripple
                    name="background"
                    label="Background Image"
                  />
                </q-tabs>

                <q-tab-panels v-model="tab" animated class="">
                  <q-tab-panel name="general">

                    <q-input
                      outlined
                      v-model="username"
                      :label="this.$t('username')"
                    >
                    </q-input>

                    <q-input
                      outlined
                      v-model="email"
                      :label="this.$t('email')"
                    >
                    </q-input>

                    <q-input v-model="password" :label="this.$t('password')" outlined :type="isPwd ? 'password' : 'text'">
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                        />
                      </template>
                    </q-input>

                  </q-tab-panel>

                  <q-tab-panel name="mfa">
                    <h5 style="margin-top: 0">{{ $t('mfa_header') }}</h5>
                    <p v-html="$t('mfa_intro', mfalinks)"></p>

                    <div v-if="showqrcode">
                        <div class="qr-section">
                          <img :src="qrcode" />

                          <div>
                        <p v-html="$t('mfa_above_qr')"></p>
                        <p v-html="$t('mfa_below_qr')"></p>
                        <p v-html="$t('mfa_no_qr', { code: mfacode })"></p>
                        <q-input
                          outlined
                          v-model="totp"
                          :label="this.$t('code')"
                        >
                        </q-input>
                        <q-btn @click="sendTotp">Submit</q-btn>

                          </div>
                        </div>
                    </div>

                    <div v-if="showqrcode !== true">
                    <q-btn
                      v-if="this.multifactorEnabled === false"
                      name="multifactorEnabled"
                      @click="enablesMfa"
                    >Enable MFA</q-btn>
                    <q-btn
                      v-else
                      name="multifactorEnabled"
                      @click="disableMfa"
                    >Disable MFA</q-btn>
                    </div>

                  </q-tab-panel>

                  <q-tab-panel name="search">
                    <div class="text-h6">Search</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-tab-panel>
                  <q-tab-panel name="background">
                    <div class="text-h6">Background</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-tab-panel>
                </q-tab-panels>

              </div>

            </div>

        </q-scroll-area>
        <div class="useractions" :class="{ active: actions }">
            <q-btn type="submit" flat>
              <q-icon name="save" />
              Save
            </q-btn>
            <q-btn flat @click="closeCreate">
              <q-icon name="block" />
              Cancel
            </q-btn>

        </div>
          </q-form>
        <!--<q-dialog v-model="showqrcode">
          <div style="background: #fff; padding: 20px;">
            <h5 style="margin-top: 0">{{ $t('mfa_header') }}</h5>
            <p v-html="$t('mfa_above_qr')"></p>
            <div class="flex flex-center"><img :src="qrcode" /></div>
            <p v-html="$t('mfa_below_qr')"></p>
            <q-input
              outlined
              v-model="totp"
              :label="this.$t('code')"
            >
            </q-input>
            <q-btn @click="sendTotp">Submit</q-btn>
          </div>
        </q-dialog>-->

      </div>

</template>

<script>
export default {
  name: 'EditUser',

  props: [],

  components: {
  },

  computed: {
    user () {
      return this.$store.state.users.edit
    },
    create () {
      return this.$store.state.users.create
    },
    setavatar () {
      return (this.user.avatar !== null) ? process.env.BACKEND_LOCATION + this.user.avatar : 'https://apps.heimdall.site/img/heimdall-logo-white.svg'
    }

  },

  data () {
    return {
      id: null,
      avatar: null,
      email: null,
      username: null,
      password: '',
      totp: null,
      isPwd: true,
      actions: false,
      multifactorEnabled: false,
      qrcode: null,
      showqrcode: null,
      tab: 'general',
      changeavatar: false,
      mfacode: null,
      mfalinks: {
        link1: '<a href="https://support.google.com/accounts/answer/1066447">Google Authenticator</a>',
        link2: '<a href="https://authy.com/">Authy</a>'
      }
    }
  },

  watch: {
    user: function (newdata, olddata) {
      // console.log(newdata)
      this.id = newdata.id
      this.avatar = newdata.avatar
      this.email = newdata.email
      this.username = newdata.username
      this.password = newdata.password
      this.multifactorEnabled = newdata.multifactorEnabled
    },
    create: function (newdata, olddata) {
      if (newdata === true) {
        setTimeout(function () {
          this.actions = true
        }.bind(this), 350)
      } else {
        // this.actions = false
      }
    },
    qrcode: function (newdata, olddata) {
      if (newdata !== null) {
        this.showqrcode = true
      } else {
        this.showqrcode = false
      }
    }
  },

  methods: {
    async enablesMfa () {
      const formData = new FormData()
      formData.append('multifactorEnabled', true)
      const data = {
        id: this.id,
        user: formData
      }
      const save = await this.$store.dispatch('users/save', data)
      // console.log(save)
      if (save.data.status === 'confirm totp') {
        this.qrcode = save.data.qrcode
        this.mfacode = '<strong>' + save.data.code + '</strong>'
      }
    },
    async disableMfa () {
      const formData = new FormData()
      formData.append('multifactorEnabled', false)
      const data = {
        id: this.id,
        user: formData
      }
      await this.$store.dispatch('users/save', data)
      // console.log(save)
    },
    async sendTotp () {
      const formData = new FormData()
      formData.append('totp', this.totp)
      const data = {
        id: this.id,
        user: formData
      }
      const save = await this.$store.dispatch('users/save', data)
      // console.log(save)
      if (save.data.status === 'ok') {
        this.showqrcode = false
        this.$q.notify({
          type: 'positive',
          message: 'MFA Enabled',
          progress: true,
          position: 'bottom',
          timeout: 1500
        })
      }
    },
    async onSubmit (evt) {
      const formData = new FormData()
      formData.append('email', this.email)
      formData.append('username', this.username)
      formData.append('password', this.password)
      formData.append('avatar', this.avatar)
      /* const formData = {
        email: this.email,
        username: this.username,
        password: this.password
      } */
      const data = {
        id: this.id,
        user: formData
      }
      try {
        await this.$store.dispatch('users/save', data)
        await this.$store.dispatch('users/getUsers')
        await this.$store.dispatch('app/status')
        this.$store.commit('users/create', false)
        this.$q.notify({
          type: 'positive',
          message: 'Updated',
          progress: true,
          position: 'bottom',
          timeout: 1500
        })

        console.log('added')
      } catch (e) {
        this.$q.notify({
          type: 'negative',
          message: this.$t(e.response.data.result),
          progress: true,
          position: 'bottom',
          timeout: 1500
        })
      }
    },
    closeCreate () {
      this.actions = false
      setTimeout(async function () {
        await this.$emit('closecreate')
        this.$store.dispatch('users/clear')
      }.bind(this), 300)
    },
    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.possibletags = this.application.tags || []
        } else {
          const needle = val.toLowerCase()
          const tags = this.application.tags || []
          this.possibletags = tags.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    }
  }

}
</script>
<style lang="scss">
  .qr-section {
    display: flex;
    img {
      margin-right: 40px;
    }
  }
  .changephoto {
    position: absolute;
    display: flex;
    flex-direction: column;
    background: #0002;
    color: white;
    top: 230px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    height: 50px;
  }
  .useractions {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 70px;
    background: #724c7a;
    transform: translateX(80px);
    transition: all 0.3s;
    color: white;
    padding: 10px 0;
    &.active {
      transform: translateX(0);
    }
    button {
      padding: 10px 0;
      .q-btn__content {
        font-size: 11px;
        i {
          font-size: 22px;
        }
      }
    }
  }

  .user-details {
    margin: 0;
    padding: 40px;
    width: 100%;
    max-width: 340px;
    text-align: center;
    position: relative;
    .q-list {
    }
    .q-avatar {
      margin-bottom: 15px;
    }
    .name {
      margin: 0px 0;
      font-size: 18px;
      font-weight: bold;
    }
    .email {
      font-size: 12px;
      color: #a7a7a7;
    }
    .level {

    }
  }
  .user-options {
    flex: 1;
    margin: 0;
    min-height: calc(100vh - 76px);
    background: #f3f4f4;
    .q-tab-panels {
      background: #f3f4f4;
      .q-tab-panel {
        padding: 40px 40px;
      }
    }
    .q-tab {
      min-height: 70px;
    }
  }
  .user-image {
    max-width: 200px;
    height: auto;
    background: #724c7a;
    padding: 6px;
  }
  .userform {
    padding: 0 75px 0 0;
    overflow: hidden;
  }
  .create {
  }
  .userdetails {
    background: #e6e8e8;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translateX(-100%);
    transition: all 0.3s;
    z-index: 2;
    &.active {
      transform: translateX(0);
    }
    .q-form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    /* .scroll > .absolute {
      height: 100%;
    } */
  }
</style>
