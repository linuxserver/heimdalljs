<template>
  <q-page class="flex">
    <div class="page-container">
      <div class="bg"></div>
      <!--<div class="add-new">
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
          class="bg-grey-2 shadow-2"
        >
          <q-tab name="userapps" label="Applications" />
          <q-tab v-if="$q.screen.gt.sm" name="tags" label="Tags" />
          <q-tab v-if="$q.screen.gt.sm" name="allapps" label="All Applications" />
          <q-btn-dropdown v-if="$q.screen.lt.md" auto-close stretch flat label="More...">
            <q-list>
              <q-item clickable @click="tab = 'tags'">
                <q-item-section>Tags</q-item-section>
              </q-item>

              <q-item clickable @click="tab = 'allapps'">
                <q-item-section>All Applications</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="userapps">
            <app-item
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

          <q-tab-panel name="allapps">
            <app-item
              v-for="application in allapps"
              :key="application.id"
              :application="application"
            >
            </app-item>
          </q-tab-panel>
        </q-tab-panels>
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

  props: ['applications', 'allapps'],

  computed: {
  },

  data () {
    return {
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
