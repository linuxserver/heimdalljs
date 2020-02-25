<template>
  <div class="list-item" :class="{ edit: this.showback === true}">
    <div class="list-item-inner">
      <div class="list-item-front">
        <div class="icon"><img class="app-icon" :src="'http://heimdallmaster.test/storage/' + this.icon"></div>
        <div class="name">
          {{ this.application.title }}
          <span class="tags">Tags: {{ this.taglist }}</span>
          <a :href="this.application.url">url</a>
        </div>
        <div class="pinned">
          Active
          <q-icon
            :name="this.application.pinned === '1' ? 'check_box' : 'check_box_outline_blank'"
          />
        </div>
        <div class="actions">
          <q-btn size="12px" unelevated color="primary" @click="edit = true">Edit</q-btn>
          <q-btn size="12px" unelevated color="grey-2" @click="showBack()" text-color="black">Delete</q-btn>
        </div>
      </div>
      <div class="list-item-back">
        <div class="confirmation">
          Are you sure you want to delete this item?
          <div>
            <q-btn style="width: 120px;" unelevated color="red-10" @click="edit = true">Yes</q-btn>
            <q-btn size="12px" unelevated @click="hideBack()">Cancel</q-btn>
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="edit">
      <edit-tile :application="application"></edit-tile>
    </q-dialog>

  </div>
</template>

<script>
import EditTile from 'components/EditTile'
export default {
  name: 'AppItem',
  props: ['application'],
  components: {
    EditTile
  },
  computed: {
    possibleapps () {
      return this.$store.state.tiles.possibleapps
    },
    possibletags () {
      return this.$store.state.tags.all
    },
    taglist () {
      return null
      // return this.tags.map(a => a.title).join()
    },
    preview () {
      return {
        color: this.color,
        title: this.title,
        icon: this.icon,
        url: this.url
      }
    }
  },
  data () {
    return {
      edit: false,
      showback: false,
      color: this.application.colour,
      applicationtype: this.application.appid,
      title: this.application.title,
      tags: this.application.tags,
      url: this.application.url,
      icon: this.application.icon || '../img/heimdall-icon-small.png'
    }
  },
  methods: {
    showBack: function () {
      this.showback = true
    },
    hideBack: function () {
      this.showback = false
    }
  }
}
</script>
<style lang="scss">
</style>
