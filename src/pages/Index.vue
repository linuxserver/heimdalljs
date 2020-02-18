<template>
  <q-page class="flex flex-center">
    <Tile
      v-for="application in applications"
      :key="application.id"
      v-bind="application"
      :application="application"
    />
  </q-page>
</template>

<script>
import Tile from 'components/Tile'

export default {
  name: 'PageIndex',

  props: ['filter'],

  components: {
    Tile
  },

  computed: {
    applications: function () {
      if (this.filter === null) {
        return this.$store.state.tiles.active
      } else {
        return this.$store.state.tiles.active.filter(a => a.tags.map(b => b.id).includes(this.filter))
      }
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
