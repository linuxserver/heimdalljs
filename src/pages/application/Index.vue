<template>
  <q-page class="flex">
    <div class="page-container">
      <div class="bg"></div>
      <div class="options"></div>
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

  props: ['applications'],

  computed: {
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
.bg {
  background-image: linear-gradient(to right, rgba(51, 88, 94, 0.95), rgba(49, 66, 84, 0.95)), url('/statics/applications.jpg');
  background-size: cover;
  background-position: center;
  height: 300px;
  position:fixed;
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
