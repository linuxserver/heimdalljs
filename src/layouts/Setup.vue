<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered>
      <q-toolbar>

        <q-toolbar-title>
          {{ $t('heimdall_setup') }}
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container id="app">
      <q-page class="flex flex-center">
          <div style="width: 100%; max-width: 600px;" class="q-pa-md">
    <q-stepper
      v-model="step"
      vertical
      color="primary"
      animated
    >

      <q-step
        :name="1"
        :title="this.$t('select_system_defaults')"
        icon="apps"
        :done="step > 1"
      >
        <q-select
          outlined
          :options="languages"
          :label="this.$t('select_language')"
          option-value="value"
          option-label="label"
          v-model="language"
          map-options
        ></q-select>

        <q-select
          outlined
          :options="username_options"
          :label="this.$t('show_usernames')"
          option-value="value"
          option-label="label"
          v-model="showusername"
        ></q-select>

        <q-stepper-navigation>
          <q-btn @click="saveSettings" color="primary" :label="$t('continue')" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        :title="$t('setup_admin_user')"
        icon="contact_mail"
        :done="step > 2"
      >

          <q-input
            outlined
            v-model="username"
            :label="$t('username')"
            class="my-input"
          >
          </q-input>
          <q-input
            outlined
            v-model="email"
            :label="$t('email')"
            class="my-input"
          >
          </q-input>
          <q-input
            outlined
            v-model="password"
            :label="$t('password')"
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

        <q-stepper-navigation>
          <q-btn @click="saveUser" color="primary" :label="$t('save')" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        :title="this.$t('select_system_defaults')"
        icon="add_comment"
      >
        Setup is complete!

        <q-stepper-navigation>
          <q-btn @click="finish" color="primary" :label="$t('finish')" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'Setup',

  components: {
  },

  computed: {
    step () {
      return this.$store.state.app.setup.step
    },
    languages () {
      return this.$store.state.app.languages
    },
    language: {
      get () {
        return this.$store.state.app.settings.language
      },
      set (val) {
        this.$store.dispatch('app/saveSettings', {
          language: val.value
        })
      }
    },
    username_options () {
      return [
        {
          label: this.$t('username_yes'),
          value: 'yes'
        },
        {
          label: this.$t('username_no'),
          value: 'no'
        }
      ]
    }

  },

  data () {
    return {
      isPwd: true,
      username: '',
      email: '',
      password: '',
      showusername: null
    }
  },

  methods: {
    saveUser () {
      this.$store.dispatch('app/setupUser', {
        id: 1,
        username: this.username,
        email: this.email,
        password: this.password
      })
    },
    saveSettings () {
      this.$store.dispatch('app/setDefaults', {
        language: this.language.value,
        show_usernames: this.showusername.value
      })
    },
    finish () {
      this.$store.dispatch('app/setupComplete')
    },
    saveUserSettings () {
    }
  }
}
</script>
<style lang="scss" scoped>
.q-field--outlined {
  margin-top: 20px;
  background: #f1f1f1;
}
</style>
