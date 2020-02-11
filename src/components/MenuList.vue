<template>
  <q-list>
    <q-item-label header class="text-grey-8">Navigation</q-item-label>
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
  </q-list>
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
      return this.$store.state.tiles.all.length
    },
    active_tiles () {
      return this.$store.state.tiles.active.length
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
    }
  }
}
</script>
