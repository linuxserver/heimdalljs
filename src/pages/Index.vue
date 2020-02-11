<template>
  <q-page class="flex flex-center">
    <Tile
      v-for="application in applications"
      :key="application.id"
      v-bind="application"
    />
  </q-page>
</template>

<script>
import axios from 'axios'
import Tile from 'components/Tile'

export default {
  name: 'PageIndex',

  components: {
    Tile
  },

  data () {
    return {
      applications: null
    }
  },
  mounted () {
    axios
      .get('http://heimdallbackend.test', { crossdomain: true })
      .then(response => (this.applications = response.data.apps))
  }
}
</script>
