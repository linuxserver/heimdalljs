<template>
  <div class="list-item">
    <div class="icon" :style="'background-color: ' + bgColor + ';'">
      <img class="app-icon" :src="appIcon" />
    </div>
    <div class="name">
      {{ this.application.title }}
      <a :href="this.application.url"
        ><span
          ><q-tooltip
            v-if="application.url !== ''"
            content-class="tooltip-content"
            max-width="500px"
            anchor="bottom middle"
            self="top middle"
            >{{ application.url }}</q-tooltip
          >{{ $t('visit_url') }}</span
        ></a
      >
    </div>
    <div v-if="this.$route.path !== '/admin/application'" class="pinned">
      {{ $t('active') }}
      <q-icon
        @click="toggleActive"
        :name="
          this.application.UserItem.active === true
            ? 'check_box'
            : 'check_box_outline_blank'
        "
      />
    </div>
    <div
      v-if="
        this.$route.path === '/admin/application' || application.system !== true
      "
      class="actions"
    >
      <q-btn size="12px" unelevated color="primary" @click="editApp">{{
        $t('edit')
      }}</q-btn>
      <q-btn
        size="12px"
        unelevated
        color="grey-2"
        text-color="black"
        @click="deleteApp"
        >{{ $t('delete') }}</q-btn
      >
    </div>
    <q-dialog v-model="confirmDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete_forever" color="negative" text-color="white" />
          <span class="q-ml-sm">{{ $t('confirm_delete') }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
          <q-btn
            flat
            :label="$t('delete')"
            color="primary"
            @click="onDeleteClick"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'AppItem',
  props: ['application'],
  components: {},
  computed: {
    possibleapps() {
      return this.$store.state.tiles.possibleapps
    },
    possibletags() {
      return this.$store.state.tags.all
    },
    taglist() {
      return null
      // return this.tags.map(a => a.title).join()
    },
    bgColor() {
      if (
        this.application.color !== 'null' &&
        this.application.color !== null
      ) {
        return this.application.color
      }
      return '#222222'
    },
    preview() {
      return {
        color: this.color,
        title: this.title,
        icon: this.icon,
        url: this.url
      }
    },
    appIcon() {
      if (this.application.icon === null) {
        return 'statics/heimdall-logo-white.svg'
      }
      return process.env.BACKEND_LOCATION + this.application.icon
    }
  },
  data() {
    return {
      edit: false,
      confirmDelete: false,
      color: this.application.colour,
      applicationtype: this.application.appid,
      title: this.application.title,
      tags: this.application.tags,
      url: this.application.url,
      icon: this.application.icon || 'statics/heimdall-logo-white.svg'
    }
  },
  methods: {
    editApp: function () {
      console.log(this.application)
      this.$store.commit('tiles/edit', this.application)
      this.$store.commit('tiles/create', true)
    },
    deleteApp: function () {
      this.confirmDelete = true
    },
    onDeleteClick() {
      // on OK, it is REQUIRED to
      let appid = this.application.id
      this.$store.dispatch('tiles/deleteApp', appid)
      // then hiding dialog
      this.confirmDelete = false
    },
    async toggleActive() {
      const formData = {
        active: this.application.UserItem.active === false
      }
      const data = {
        id: this.application.id,
        data: formData
      }
      await this.$store.dispatch('tiles/active', data)
      this.$store.dispatch('tiles/getApps')
    }
  }
}
</script>
<style lang="scss"></style>
