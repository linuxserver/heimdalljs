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
        <q-tabs
          v-model="tab"
          inline-label
          :breakpoint="0"
          indicator-color="primary"
          align="justify"
          active-bg-color="shadow-3"
          class="bg-grey-2"
        >
          <q-tab name="userapps" :label="this.$t('applications')" />
          <q-tab v-if="$q.screen.gt.sm" name="tags" :label="this.$t('tags')" />
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="userapps">
            <div class="no-items" v-if="applications.length < 1">
              {{ this.$t('no_apps') }}
              <q-btn style="margin-top:30px;" @click="create = true" unelevated color="cyan-8">Add New</q-btn>
            </div>
            <app-item
              v-else
              v-for="application in applications"
              :key="application.id"
              :application="application"
            >
            </app-item>
          </q-tab-panel>

          <q-tab-panel name="tags">
            <div class="text-h6">Tags</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

        </q-tab-panels>
      </div>
    </div>

    <q-dialog v-model="create">
      <edit-tile :application="createapp"></edit-tile>
    </q-dialog>

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
    createapp () {
      return {
        color: '',
        applicationtype: '',
        title: '',
        tags: [],
        url: '',
        icon: 'statics/img/heimdall-icon-small.png'
      }
    }
  },

  data () {
    return {
      create: false,
      tab: 'userapps'
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
