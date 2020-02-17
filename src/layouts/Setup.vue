<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered>
      <q-toolbar>

        <q-toolbar-title>
          Heimdall Setup
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
        title="Setup admin user"
        icon="contact_mail"
        :done="step > 1"
      >

          <q-input
            outlined
            v-model="username"
            label="Username"
            class="my-input"
          >
          </q-input>
          <q-input
            outlined
            v-model="email"
            label="Email"
            class="my-input"
          >
          </q-input>
          <q-input
            outlined
            v-model="password"
            label="Password"
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
          <q-btn @click="saveUser" color="primary" label="Save" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        :title="this.$t('select_system_defaults')"
        icon="apps"
        :done="step > 2"
      >
        <q-select
          outlined
          :options="languages"
          :label="this.$t('select_language')"
          option-value="value"
          option-label="label"
          v-model="language"
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
          <q-btn @click="saveSettings" color="primary" label="Continue" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        :title="this.$t('select_system_defaults')"
        icon="add_comment"
      >
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.

        <q-stepper-navigation>
          <q-btn color="primary" label="Finish" />
          <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
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
    }
  },

  data () {
    return {
      isPwd: true,
      username: '',
      email: '',
      password: '',
      showusername: null,
      username_options: [
        {
          label: this.$t('username_yes'),
          value: 'yes'
        },
        {
          label: this.$t('username_no'),
          value: 'no'
        }
      ],
      language: null,
      languages: [
        {
          value: 'en-us',
          label: 'English (US)'
        },
        {
          value: 'en-gb',
          label: 'English (British)'
        }
      ]
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
      /* this.$store.dispatch('app/setupSettings', {
        id: 1,
        username: this.username,
        email: this.email,
        password: this.password
      }) */
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
