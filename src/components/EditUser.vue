<template>
  <div class="userdetails fit">
    <q-form @submit="onSubmit" class="fit userform">
      <q-scroll-area style="height: 100%;">
        <div id="create" class="create fit">
          <div class="user-details">
            <q-avatar
              size="220px"
              style="background: #c1c1c1;"
              class="user-avatar"
            >
              <div class="avatar-resize"><img :src="this.setavatar" /></div>
              <div @click="changeavatar = !changeavatar" class="changephoto">
                <q-icon size="30px" name="photo_camera" />
                {{ $t('change_image') }}
              </div>
            </q-avatar>

            <div v-if="changeavatar">
              <q-file outlined v-model="avatar" :label="this.$t('upload_file')">
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
              <q-input
                outlined
                v-model="urlavatar"
                type="url"
                :label="this.$t('url')"
              >
                <template v-slot:prepend>
                  <q-icon name="http" />
                </template>
              </q-input>
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
              <q-tab clickable v-ripple name="general" :label="$t('profile')" />
              <q-tab clickable v-ripple name="mfa" :label="$t('security')" />
              <!--<q-tab
                clickable
                v-ripple
                name="settings"
                :label="$t('settings')"
              />-->
            </q-tabs>

            <q-tab-panels v-model="tab" animated class="">
              <q-tab-panel name="general">
                <q-input
                  outlined
                  v-model="username"
                  :label="this.$t('username')"
                >
                </q-input>

                <q-input outlined v-model="email" :label="this.$t('email')">
                </q-input>

                <q-input
                  v-model="password"
                  :label="this.$t('password')"
                  outlined
                  :type="isPwd ? 'password' : 'text'"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>

                <!--<q-select
                  outlined
                  :options="languages"
                  :label="this.$t('select_language')"
                  option-value="value"
                  option-label="label"
                  v-model="settingsLanguage"
                  map-options
                ></q-select>-->
              </q-tab-panel>

              <q-tab-panel name="mfa">
                <h5 style="margin-top: 0;">{{ $t('mfa_header') }}</h5>
                <p v-html="$t('mfa_intro', mfalinks)"></p>

                <div v-if="showqrcode">
                  <div class="qr-section">
                    <img :src="qrcode" />

                    <div>
                      <p v-html="$t('mfa_above_qr')"></p>
                      <p v-html="$t('mfa_below_qr')"></p>
                      <p v-html="$t('mfa_no_qr', { code: mfacode })"></p>
                      <q-input outlined v-model="totp" :label="this.$t('code')">
                      </q-input>
                      <q-btn @click="sendTotp">{{ $t('submit') }}</q-btn>
                    </div>
                  </div>
                </div>

                <div v-if="showqrcode !== true">
                  <q-btn
                    v-if="this.multifactorEnabled === false"
                    name="multifactorEnabled"
                    @click="enablesMfa"
                    >{{ $t('enable_mfa') }}</q-btn
                  >
                  <q-btn v-else name="multifactorEnabled" @click="disableMfa">{{
                    $t('disable_mfa')
                  }}</q-btn>
                </div>
              </q-tab-panel>

              <q-tab-panel name="settings">
                <div class="text-h6">{{ $t('settings') }}</div>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </q-scroll-area>
      <div class="useractions" :class="{ active: actions }">
        <q-btn type="submit" flat>
          <q-icon name="save" />
          {{ $t('save') }}
        </q-btn>
        <q-btn
          v-if="$route.path !== '/account/settings'"
          flat
          @click="closeCreate"
        >
          <q-icon name="block" />
          {{ $t('cancel') }}
        </q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'EditUser',

  props: [],

  components: {},

  computed: {
    user() {
      return this.$store.state.users.edit
    },
    create() {
      return this.$store.state.users.create
    },
    /* languages() {
      return this.$store.state.app.languages
    }, */
    setavatar() {
      return this.user.avatar !== null
        ? process.env.BACKEND_LOCATION + this.user.avatar
        : 'https://apps.heimdall.site/img/heimdall-logo-white.svg'
    }
  },

  data() {
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
      settingtab: 'general',
      settingsLanguage: null,
      urlvatar: '',
      mfacode: null,
      mfalinks: {
        link1:
          '<a href="https://support.google.com/accounts/answer/1066447">Google Authenticator</a>',
        link2: '<a href="https://authy.com/">Authy</a>'
      }
    }
  },

  watch: {
    user: function (newdata, olddata) {
      this.id = newdata.id
      this.avatar = newdata.avatar
      this.email = newdata.email
      this.username = newdata.username
      this.password = newdata.password
      // this.settingsLanguage = newdata.settings.language
      this.multifactorEnabled = newdata.multifactorEnabled
    },
    /* create: function (newdata, olddata) {
      if (newdata === true) {
        setTimeout(function () {
          this.actions = true
        }.bind(this), 350)
      } else {
        // this.actions = false
      }
    }, */
    qrcode: function (newdata, olddata) {
      if (newdata !== null) {
        this.showqrcode = true
      } else {
        this.showqrcode = false
      }
    }
  },

  methods: {
    async enablesMfa() {
      const data = {
        id: this.id,
        user: {
          multifactorEnabled: true
        }
      }
      const save = await this.$store.dispatch('users/save', data)
      console.log(save)
      if (save.user.data.status === 'confirm totp') {
        this.qrcode = save.user.data.qrcode
        this.mfacode = '<strong>' + save.user.data.code + '</strong>'
      }
    },
    async disableMfa() {
      const data = {
        id: this.id,
        user: {
          multifactorEnabled: false
        }
      }
      await this.$store.dispatch('users/save', data)
      // console.log(save)
    },
    async sendTotp() {
      const data = {
        id: this.id,
        user: {
          totp: this.totp
        }
      }
      const save = await this.$store.dispatch('users/save', data)
      // console.log(save)
      if (save.user.data.status === 'ok') {
        this.showqrcode = false
        this.$q.notify({
          type: 'positive',
          message: this.$t('mfa_enabled'),
          progress: true,
          position: 'bottom',
          timeout: 1500
        })
      }
      if (save.user.data.status === 'error') {
        this.$q.notify({
          type: 'negative',
          message: this.$t(save.user.data.result),
          progress: true,
          position: 'bottom',
          timeout: 1500
        })
      }
    },
    async onSubmit(evt) {
      const formData = {
        username: this.username
      }
      const media = new FormData()
      if (this.email !== null) formData.email = this.email
      if (this.password !== '') formData.password = this.password

      // Settings
      formData.settings = {}
      if (this.settingsLanguage !== null)
        formData.settings.language = this.settingsLanguage.value

      const data = {
        id: this.id,
        user: formData
      }
      if (this.avatar !== null && this.avatar !== this.user.avatar) {
        media.append('avatar', this.avatar)
        data.media = media
      }

      try {
        await this.$store.dispatch('users/save', data)
        await this.$store.dispatch('users/getUsers')
        await this.$store.dispatch('app/status')
        this.$store.commit('users/edit', this.$store.state.app.user)
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
    async closeCreate() {
      await this.$emit('closecreate')
      setTimeout(() => {
        this.$store.dispatch('users/clear')
      }, 300)
    },
    filterFn(val, update) {
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
<style lang="scss"></style>
