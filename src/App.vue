<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      essentialLinks: [
        {
          title: 'Applications',
          caption: '7 apps',
          icon: 'apps',
          link: 'item'
        },
        {
          title: 'Applications',
          caption: '7 apps',
          icon: 'apps',
          link: 'item'
        },
        {
          title: 'User Management',
          caption: '1 user',
          icon: 'contacts',
          link: 'user'
        },
        {
          title: 'Proxy management',
          caption: '5 proxies',
          icon: 'account_tree',
          link: 'proxy'
        }
      ]
    }
  }
}
</script>
