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
          <div v-if="user !== null">
            <q-chip
              icon="bookmark"
              clickable
              :class="{ active: filter === null }"
              @click="setFilter(null)"
            >All</q-chip>
            <q-chip
              v-for="tag in tags"
              :key="tag.id"
              icon="bookmark"
              clickable
              :class="{ active: filter === tag.id }"
              @click="setFilter(tag.id)"
            >{{ tag.title }}</q-chip>
          </div>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
    >
      <menu-list></menu-list>
    </q-drawer>

    <q-page-container id="app">
      <router-view :filter="filter" />
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

  computed: {
    tags () {
      return this.$store.state.tags.all
    },
    user () {
      return this.$store.state.app.user
    }
  },

  data () {
    return {
      leftDrawerOpen: false,
      version: version,
      filter: null
    }
  },

  methods: {
    setFilter (tag) {
      this.filter = tag
    }
  }
}
</script>
<style lang="scss" scoped>
  .q-chip {
    background: #dadada26;
    &.active {
      background: #dadada;
    }
  }
</style>
