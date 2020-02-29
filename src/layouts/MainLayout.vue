<template>
  <q-layout class="dashboard" view="lHh Lpr lFf">
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
              v-if="tags.length > 0"
              icon="bookmark"
              clickable
              :class="{ active: filter === null }"
              @click="setFilter(null)"
            >All</q-chip>
            <q-chip
              v-for="tag in tags"
              :key="tag"
              icon="bookmark"
              clickable
              :class="{ active: filter === tag }"
              @click="setFilter(tag)"
            >{{ tag }}</q-chip>
          </div>
        <div v-if="settings.search_on_dashboard === 'yes'" class="searchbox">
        <q-form
          @submit="onSubmit"
          :action="search_provider.url"
          :method="search_provider.method"
          :target="search_provider.target"
          ref="searchForm"
        >
        <q-select
          borderless
          v-model="search_provider"
          input-debounce="0"
          :options="settings.active_search_providers"
          option-value="id"
          option-label="name"
        >
        </q-select>
        <q-select
          v-if="search_provider.id === 'tiles'"
          borderless
          color="white"
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
        <q-input
          v-else
          v-model="search"
          borderless
          label="Search..."
          :name="search_provider.query"
        >
        </q-input>
        </q-form>
        </div>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class=""
    >
      <menu-list></menu-list>
    </q-drawer>

    <q-page-container :style="background" id="app">
      <router-view :filter="filter" :searchfilter="searchfilter" />
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
      return this.$store.getters['tiles/tags']
    },
    user () {
      return this.$store.state.app.user
    },
    settings () {
      return this.$store.state.app.settings
    },
    search_provider: {
      get () {
        return this.$store.state.app.settings.search_provider
      },
      set (val) {
        this.$store.commit('app/searchProvider', val)
      }
    }
  },

  data () {
    return {
      leftDrawerOpen: false,
      version: version,
      filter: null,
      searchfilter: null,
      background: '',
      search: ''
      // background: 'background-image: url(statics/bg/bg11.jpg)'
    }
  },

  methods: {
    setFilter (tag) {
      this.filter = tag
    },
    filterFn (val, update, abort) {
      update(() => {
        // this.selectedapp = null
        this.searchfilter = val.toLowerCase()
      })
    },
    onSubmit () {
      // console.log(this.$refs)
      this.$refs.searchForm.$el.submit()
    }
  }
}
</script>
<style lang="scss">
.dashboard {
  .q-chip {
    background: #dadada26;
    &.active {
      background: #dadada;
    }
  }
  .searchbox {
    display: flex;
    width: auto;
    border-left: 1px solid #0000002e;
    form {
      display: flex;
      background: #0000002e;
      border-radius: 5px;
    }
    .q-field {
      padding: 0 20px;
      &:first-child {
        padding-right: 0;
      }
    }
    .q-field__label, .q-field__native, .q-field__marginal {
      color: #ffffffb0;
    }
    input {
      color: white;
    }
  }
}
</style>
