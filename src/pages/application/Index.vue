<template>
  <q-page class="flex">
    <div class="page-container">
      <!--<div class="bg"></div>
      <div class="add-new">
        <div class="item">Docker Container</div>
        <div class="item">Application</div>
        <div class="item">Link</div>
      </div>-->
      <div class="list-items">
        <div class="no-items" v-if="applications.length < 1">
          {{ this.$t('no_apps') }}
          <q-btn
            style="margin-top: 30px;"
            @click="create = true"
            unelevated
            color="brand"
            >Add New</q-btn
          >
        </div>
        <app-item
          v-else
          v-for="application in applications"
          :key="application.id"
          :application="application"
        >
        </app-item>
      </div>
    </div>
    <edit-tile
      :class="{ active: create === true }"
      v-on:closecreate="closecreate"
    ></edit-tile>
  </q-page>
</template>

<script>
import EditTile from 'components/EditTile'
import AppItem from 'components/AppItem'

export default {
  name: 'PageIndex',

  components: {
    AppItem,
    EditTile
  },

  props: ['applications', 'allapps'],

  computed: {
    createapp() {
      return {
        id: null,
        color: '',
        applicationtype: '',
        title: '',
        tags: [],
        url: '',
        icon: 'statics/img/heimdall-icon-small.png'
      }
    },
    create: {
      get() {
        return this.$store.state.tiles.create
      },
      set(val) {
        this.$store.commit('tiles/create', val)
      }
    }
  },

  data() {
    return {}
  },
  methods: {
    addApp: function () {
      this.$store.commit('tiles/create', true)
    },
    closecreate() {
      this.$store.commit('tiles/create', false)
    }
  },
  mounted() {
    // this.$store.commit('app/tab', 'admin')
    // this.$store.commit('app/adminApps', true)
  }
}
</script>
<style lang="scss">
.bg {
  background-image: linear-gradient(
      to right,
      rgba(51, 88, 94, 0.95),
      rgba(49, 66, 84, 0.95)
    ),
    url('/statics/applications.jpg');
  background-size: cover;
  background-position: center;
  height: 300px;
  position: fixed;
  top: 75px;
  left: 0;
  right: 0;
}
.options {
  height: 100px;
  margin: 0 -40px;
}
</style>
<style lang="scss" scoped>
.list-items {
}
</style>
