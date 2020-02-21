<template>
        <div class="userdetails fit" style="background: #fcfcfc;">
          <q-form @submit="onSubmit" class="fit">
        <div class="popup-header">
          <div class="text-h6">User</div>
          <div class="actions">
            <q-btn type="submit" flat>
              <q-icon name="save" />
              Save
            </q-btn>
            <q-btn flat @click="closeCreate">
              <q-icon name="block" />
              Cancel
            </q-btn>
          </div>
        </div>
        <q-scroll-area
            style="height: calc(100% - 150px);"
          >

        <q-card-section class="q-pt-none">

            <div id="create" class="create">

              <div class="input">
                <q-input
                  outlined
                  v-model="username"
                  :label="this.$t('username')"
                >
                </q-input>
              </div>

              <div class="input">
                <q-input
                  outlined
                  v-model="email"
                  :label="this.$t('email')"
                >
                </q-input>
              </div>

            <div class="input">
            <q-input v-model="password" :label="this.$t('password')" outlined :type="isPwd ? 'password' : 'text'">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            </div>

            </div>

        </q-card-section>
        </q-scroll-area>
        <div class="popup-header">
          <div class="text-h6"></div>
          <div class="actions">
            <q-btn type="submit" flat>
              <q-icon name="save" />
              Save
            </q-btn>
            <q-btn flat @click="closeCreate">
              <q-icon name="block" />
              Cancel
            </q-btn>
          </div>
        </div>
          </q-form>
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
    }
  },

  data () {
    return {
      id: null,
      icon: null,
      email: null,
      username: null,
      password: '',
      totp: null,
      isPwd: true
    }
  },

  watch: {
    user: function (newdata, olddata) {
      // console.log(newdata)
      this.id = newdata.id
      this.icon = newdata.icon
      this.email = newdata.email
      this.username = newdata.username
      this.password = newdata.password
      this.totp = newdata.totp
    }
  },

  methods: {
    async onSubmit (evt) {
      /* const formData = new FormData()
      formData.append('email', this.email)
      formData.append('username', this.username)
      formData.append('password', this.password) */
      const formData = {
        email: this.email,
        username: this.username,
        password: this.password
      }
      const data = {
        id: this.id,
        user: formData
      }
      try {
        await this.$store.dispatch('users/save', data)
        await this.$store.dispatch('users/getUsers')
        this.$store.commit('users/create', false)
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
      this.$store.dispatch('users/clear')
      this.$emit('closecreate')
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
  .userdetails {
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
  }
</style>
