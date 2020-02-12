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
import Tile from 'components/Tile'

export default {
  name: 'PageIndex',

  components: {
    Tile
  },

  computed: {
    applications: function () {
      return this.$store.state.tiles.active
    }
  },

  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>
