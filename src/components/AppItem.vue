<template>
  <div class="list-item">
    <div class="icon"><img class="app-icon" :src="'http://heimdallmaster.test/storage/' + this.icon"></div>
    <div class="name">
      {{ this.application.title }}
      <span class="tags">Tags: dashboard, dev, work</span>
      <a :href="this.application.url">url</a>
    </div>
    <div class="pinned">
      Active
      <q-icon
        :name="this.application.pinned === '1' ? 'check_box' : 'check_box_outline_blank'"
      />
    </div>
    <div class="actions">
      <q-btn size="12px" unelevated color="primary">Edit</q-btn>
      <q-btn size="12px" unelevated color="grey-2" text-color="black">Delete</q-btn>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AppItem',

  props: ['application'],

  components: {
  },

  data () {
    return {
      icon: this.application.icon || '../img/heimdall-icon-small.png'
    }
  }
}
</script>
<style lang="scss">
.list-items {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 900px;
    margin: 50px auto;
    .list-item {
        border: 1px solid #00000029;
        background: #fcfcfc;
        display: flex;
        align-items: center;
        color: #000000b5;
        font-weight: bold;
        margin: 5px 0;
        .icon {
          padding:15px 30px;
          .app-icon {
            max-width: 60px;
            display: block;
            border-radius: 50%;
          }
        }
        .name {
            width: 100%;
            max-width: 300px;
            padding: 0 15px 0 0;
            display: flex;
            flex-direction: column;
            .tags {
              font-weight: normal;
              font-size: 12px;
              color: #9c9c9c;
            }
            a {
              text-transform: uppercase;
              color: #9c9c9c;
              font-size: 10px;
            }
        }
        .pinned {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
            color: #9c9c9c;
            font-weight: normal;
            i {
                font-size: 24px;
                color: #000;
            }
        }
        .actions {
          margin-left: auto;
          display: flex;
          flex-direction: column;
          padding: 0 15px;
        }
    }
}

</style>
