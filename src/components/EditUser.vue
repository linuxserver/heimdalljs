<template>
        <div class="userdetails fit" style="background: #fcfcfc;">
          <q-form @submit="onSubmit" class="fit userform">
        <q-scroll-area
            style="height: 100%;"
          >

        <q-card-section class="q-pt-none">

            <div id="create" class="create">

              <q-file outlined v-model="avatar">
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>

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
      actions: false
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
      this.totp = newdata.totp
    },
    create: function (newdata, olddata) {
      if (newdata === true) {
        setTimeout(function () {
          this.actions = true
        }.bind(this), 350)
      } else {
        this.actions = false
      }
    }
  },

  methods: {
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
  .useractions {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 80px;
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
          font-size: 28px;
        }
      }
    }
  }
  .userform {
    padding: 0 80px 0 0;
    overflow: hidden;
  }
  .create {
    padding: 30px 0;
  }
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
