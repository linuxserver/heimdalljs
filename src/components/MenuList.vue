<template>
<q-scroll-area style="height: calc(100% - 72px) !important" class="fit">
  <q-list>
    <q-tabs
      v-model="activetab"
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

    <div class="user_account">
      <img class="bg-image" :src="avatar" />
      <q-avatar size="120px" class="user-avatar">
        <div class="avatar-resize"><img :src="avatar"></div>
      </q-avatar>
    </div>

   <q-separator />
    <q-tab-panels v-model="activetab" animated>
      <q-tab-panel name="user">
        <EssentialLink
          :title="this.$t('dashboard')"
          :caption="this.tiles + ' ' + this.$tc('app', this.tiles)"
          icon="dashboard"
          link="/"
        />
        <EssentialLink
          :title="this.$t('applications')"
          :caption="this.active_tiles + ' ' + this.$tc('app', this.active_tiles)"
          icon="apps"
          link="/account"
        />
        <EssentialLink
          :title="this.$t('settings')"
          :caption="this.settings + ' ' + this.$tc('setting', this.settings)"
          icon="settings"
          link="/account/settings"
        />

      </q-tab-panel>

      <q-tab-panel name="admin">
        <EssentialLink
          :title="this.$t('applications')"
          :caption="this.active_tiles + ' ' + this.$tc('app', this.active_tiles)"
          icon="apps"
          link="/admin"
        />
        <EssentialLink
          :title="this.$t('user_management')"
          :caption="this.users + ' ' + this.$tc('user', this.users)"
          icon="contacts"
          link="/admin/user"
        />
        <EssentialLink
          :title="this.$t('proxy_management')"
          :caption="this.proxies + ' ' + this.$tc('proxy', this.proxies)"
          icon="account_tree"
          link="/admin/proxy"
        />
        <EssentialLink
          :title="this.$t('settings')"
          :caption="this.settings + ' ' + this.$tc('setting', this.settings)"
          icon="settings"
          link="/admin/settings"
        />

      </q-tab-panel>

    </q-tab-panels>

  </q-list>

  <div @click="logout" class="toolbar fixed-bottom">
    <q-item class="logout">
      <q-item-section avatar>
        <q-icon name="logout" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ $t('logout') }}</q-item-label>
        <q-item-label caption>{{ username }}</q-item-label>
      </q-item-section>
    </q-item>

  </div>
</q-scroll-area>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MenuList',

  components: {
    EssentialLink
  },

  props: ['settab'],

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
    },
    username () {
      return this.$store.state.app.user.username
    },
    avatar () {
      const user = this.$store.state.app.user
      return (user.avatar !== null) ? process.env.BACKEND_LOCATION + user.avatar : 'https://apps.heimdall.site/img/heimdall-logo-white.svg'
    },
    activetab: {
      get () {
        return this.$store.state.app.tab
      },
      set (val) {
        this.$store.commit('app/tab', val)
      }
    }
  },

  data () {
    return {
      // icon: 'https://apps.heimdall.site/img/heimdall-logo-white.svg'
      // icon: 'https://miro.medium.com/fit/c/256/256/1*zJL5iHVD0ch1smshxAKfyw.jpeg'
    }
  },

  methods: {
    logout: function () {
      console.log('logout')
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
  .logout {
    border-top: 1px solid #ffffff12;
    position: relative;
    cursor: pointer;
    &:after {
      content: "";
      position: absolute;
      top: -2px;
      left: 0;
      right: 0;
      border-top: 1px solid #00000040;
    }
  }
</style>
