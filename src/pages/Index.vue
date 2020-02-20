<template>
  <q-page class="flex flex-center">
    <div class="noapps" v-if="applications.length === 0">
      There are currently no apps
      <q-btn style="margin-top: 20px;" unelevated color="cyan-8" to="/account">Manage apps</q-btn>
    </div>
    <Tile
      v-else
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
<style lang="scss">
  .noapps {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 360px;
    margin: 30px;
    padding: 30px;
    height: 100%;
    max-height: 200px;
    min-height: 200px;
    background: #00000075;
    color: white;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-size: 16px;
    border: 4px solid #ffffffd4;
  }
</style>
