<template>
  <q-page class="flex">
    <div class="page-container">
      <!--<div class="add-new">
        <div class="item">Docker Container</div>
        <div class="item">Application</div>
        <div class="item">Link</div>
      </div>-->
      <div class="list-items">
        <app-item
          v-for="application in applications"
          :key="application.id"
          :application="application"
        >
        </app-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import AppItem from 'components/AppItem'

export default {
  name: 'PageIndex',

  components: {
    AppItem
  },

  computed: {
    applications: function () {
      return this.$store.state.tiles.all
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
