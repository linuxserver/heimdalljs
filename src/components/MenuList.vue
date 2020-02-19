<template>
<div class="fit">
  <q-list>
    <q-tabs
      v-model="tab"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab class="bigtab" name="user" label="User" />
      <q-tab class="bigtab" name="admin" label="Admin" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="user">
        <EssentialLink
          :title="this.$t('dashboard')"
          :caption="this.tiles + ' ' + (this.tiles === 1 ? this.$t('app') : this.$t('apps'))"
          icon="dashboard"
          link="/"
        />
        <EssentialLink
          :title="this.$t('applications')"
          :caption="this.active_tiles + ' ' + (this.active_tiles === 1 ? this.$t('app') : this.$t('apps'))"
          icon="apps"
          link="/item"
        />
        <EssentialLink
          :title="this.$t('settings')"
          :caption="this.settings + ' ' + (this.settings === 1 ? this.$t('setting') : this.$t('settings'))"
          icon="settings"
          link="/settings"
        />

      </q-tab-panel>

      <q-tab-panel name="admin">
        <EssentialLink
          :title="this.$t('applications')"
          :caption="this.active_tiles + ' ' + (this.active_tiles === 1 ? this.$t('app') : this.$t('apps'))"
          icon="apps"
          link="/item"
        />
        <EssentialLink
          :title="this.$t('user_management')"
          :caption="this.users + ' ' + (this.users === 1 ? this.$t('user') : this.$t('users'))"
          icon="contacts"
          link="/user"
        />
        <EssentialLink
          :title="this.$t('proxy_management')"
          :caption="this.proxies + ' ' + (this.proxies === 1 ? this.$t('proxy') : this.$t('proxies'))"
          icon="account_tree"
          link="/proxy"
        />
        <EssentialLink
          :title="this.$t('settings')"
          :caption="this.settings + ' ' + (this.settings === 1 ? this.$t('setting') : this.$t('settings'))"
          icon="settings"
          link="/settings"
        />

      </q-tab-panel>

    </q-tab-panels>

  </q-list>
  <div class="toolbar fixed-bottom">
    <span @click="logout">Logout</span>
    left Drawer toolbar
  </div>
</div>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MenuList',

  components: {
    EssentialLink
  },

  computed: {
    tiles () {
      return this.$store.state.tiles.active.length
    },
    active_tiles () {
      return this.$store.state.tiles.all.length
    },
    users () {
      return this.$store.state.users.all.length
    },
    proxies () {
      // return this.$store.state.proxies.all.length
      return 1
    },
    settings () {
      // return this.$store.state.users.all.length
      return 3
    }
  },

  data () {
    return {
      tab: 'user'
    }
  },

  methods: {
    logout: function () {
      this.$store.dispatch('app/logout')
    }
  }
}
</script>
<style lang="scss">
  .leftbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 70px;
    bottom: 0;
    background: rgba(0,0,0,0.15);
  }
</style>
