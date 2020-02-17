<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-grey-1 text-grey-7" bordered>
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
          Application Management
        </q-toolbar-title>

        <q-btn size="15px" style="margin-left: 20px;" unelevated color="cyan-8" @click="showBack()">Add New</q-btn>
        <div class="searchbox">
        <q-select
          borderless
          color="grey"
          v-model="selectedapp"
          use-input
          clearable
          input-debounce="0"
          :options="options"
          option-value="id"
          option-label="title"
          map-options
          emit-value
          label="Search..."
          @filter="filterFn"
        >
        </q-select>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
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
      <div v-if="tile">
        tiles
      </div>
    </q-drawer>

    <q-page-container>
      <router-view
        :applications="applications"
        :allapps="applications"
      />
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
    allapplications: function () {
      return this.$store.state.tiles.all
    },
    applications: function () {
      if (this.selectedapp !== null) {
        return this.allapplications.filter(v => v.id === this.selectedapp)
      } else if (this.options === null) {
        return this.allapplications
      } else {
        return this.options
      }
    }
  },

  data () {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      tile: false,
      version: version,
      selectedapp: null,
      options: null
    }
  },
  methods: {
    filterFn (val, update, abort) {
      update(() => {
        // this.selectedapp = null
        const needle = val.toLowerCase()
        // console.log('needle: ' + needle)
        this.options = this.allapplications.filter(v => v.title.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>
