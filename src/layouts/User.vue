<template>
  <q-layout v-if="user.level === 0" view="lHh Lpr lFf">
    <q-header class="bg-grey-1 text-grey-7" bordered>
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" icon="menu" aria-label="Menu" />

        <q-toolbar-title>
          {{ $t('user_management') }}
        </q-toolbar-title>

        <q-btn size="15px" style="margin-left: 20px" unelevated color="brand2" @click="createNew">{{ $t('add_new') }}</q-btn>
        <div class="searchbox">
          <q-select borderless color="grey" v-model="selecteduser" use-input clearable input-debounce="0" :options="options" option-value="id" option-label="title" map-options emit-value :label="$t('search') + '...'" @filter="filterFn"></q-select>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="">
      <MenuList settab="admin"></MenuList>
    </q-drawer>

    <q-page-container>
      <router-view :users="users" :allusers="users" />
    </q-page-container>
  </q-layout>
</template>

<script>
import MenuList from 'components/MenuList'
import { version } from '../../package.json'

export default {
  name: 'UserLayout',

  components: {
    MenuList
  },

  computed: {
    allusers: function () {
      return this.$store.state.users.all
    },
    user() {
      return this.$store.state.app.user
    },
    users: function () {
      if (this.selecteduser !== null) {
        return this.allusers.filter(v => v.id === this.selecteduser)
      } else if (this.options === null) {
        return this.allusers
      } else {
        return this.options
      }
    }
  },

  data() {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      version: version,
      selecteduser: null,
      options: null
    }
  },

  methods: {
    createNew() {
      this.$store.commit('users/create', true)
    },
    filterFn(val, update, abort) {
      update(() => {
        // this.selecteduser = null
        const needle = val.toLowerCase()
        // console.log('needle: ' + needle)
        this.options = this.allusers.filter(v => v.title.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>
