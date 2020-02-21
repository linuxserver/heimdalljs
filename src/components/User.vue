<template>
  <div class="list-user" :class="{ edit: this.edit }">
    <div class="list-item-inner">
      <div class="list-item-front">

        <div class="icon"><img class="app-icon" :src="'http://heimdallmaster.test/storage/' + this.icon"></div>
        <div class="name">{{ this.user.username }}<span class="tags">dashboard, dev, work</span></div>
        <div class="actions">
          <q-btn size="12px" unelevated color="primary" @click="showBack()">Edit</q-btn>
          <q-btn size="12px" unelevated color="grey-2" text-color="black">Delete</q-btn>
        </div>
      </div>
      <div class="list-item-back">
        <span class="close" @click="hideBack()">Close</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'User',

  props: ['user'],

  components: {
  },

  data () {
    return {
      edit: false,
      showback: false,
      icon: this.user.avatar || '../img/heimdall-icon-small.png'
    }
  },
  methods: {
    showBack: function () {
      this.$store.commit('users/edit', this.user)
      this.$store.commit('users/create', true)
    },
    hideBack: function () {
      this.edit = false
      this.showback = false
    }
  }
}
</script>
<style lang="scss">
.list-items {
    .list-item {
        .name {
            width: 100%;
            max-width: 300px;
            padding: 0 15px 0 0;
            display: flex;
            flex-direction: column;
        }
    }
}

</style>
