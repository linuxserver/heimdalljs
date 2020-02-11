<template>
  <q-list>
    <q-item-label header class="text-grey-8">Navigation</q-item-label>
    <EssentialLink
      v-for="link in essentialLinks"
      :key="link.title"
      v-bind="link"
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

  data () {
    return {
      essentialLinks: [
        {
          title: this.$t('dashboard'),
          caption: '3 ' + this.$t('apps'),
          icon: 'dashboard',
          link: '/'
        },
        {
          title: 'Applications',
          caption: '7 ' + this.$t('apps'),
          icon: 'apps',
          link: '/item'
        },
        {
          title: 'User Management',
          caption: '1 ' + this.$t('users'),
          icon: 'contacts',
          link: '/user'
        },
        {
          title: 'Proxy management',
          caption: '5 ' + this.$t('proxies'),
          icon: 'account_tree',
          link: '/proxy'
        },
        {
          title: 'Settings',
          caption: '7 ' + this.$t('items'),
          icon: 'settings',
          link: '/settings'
        }
      ]
    }
  }
}
</script>
