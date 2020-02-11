<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Heimdall
        </q-toolbar-title>

        <div>v{{ this.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <menu-list></menu-list>
    </q-drawer>

    <q-page-container id="app">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MenuList from 'components/MenuList'
import { version } from '../../package.json'

export default {
  name: 'MainLayout',

  components: {
    MenuList
  },

  data () {
    return {
      leftDrawerOpen: false,
      version: version
    }
  }
}
</script>
