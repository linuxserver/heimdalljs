<template>
  <q-layout view="lhr lpR fFf">
    <q-header class="alt-header" bordered>
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

        <q-btn
          flat
          dense
          round
          @click="rightDrawerOpen = !rightDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class=""
    >
      <MenuList></MenuList>
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      overlay
      bordered
      content-class="bg-grey-1"
    > <span @click="rightDrawerOpen = !rightDrawerOpen" class="close">Close</span>
      some stuff
    </q-drawer>

    <q-page-container>
      <router-view />
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

  data () {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      version: version
    }
  }
}
</script>
