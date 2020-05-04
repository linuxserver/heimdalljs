<template>
  <q-scroll-area style="" class="fit">
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
        <q-tab
          v-if="user.level === 0"
          class="bigtab"
          name="admin"
          label="Admin"
        />
      </q-tabs>
      <q-separator />

      <div class="user_account">
        <img class="bg-image" :src="avatar" />
        <div class="menu-avatar">
          <q-avatar size="120px" class="user-avatar">
            <div class="avatar-resize"><img :src="avatar" /></div>
          </q-avatar>
        </div>
        <div class="drawer-user-details">
          <div class="name">{{ username }}</div>
          <div @click="logout" class="logout">Logout</div>
        </div>
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
            :title="this.$tc('application')"
            :caption="
              this.active_tiles + ' ' + this.$tc('app', this.active_tiles)
            "
            icon="apps"
            link="/account"
          />
          <EssentialLink
            :title="this.$t('settings')"
            icon="settings"
            link="/account/settings"
          />
        </q-tab-panel>

        <q-tab-panel v-if="user.level === 0" name="admin">
          <q-expansion-item
            group="admin"
            icon="apps"
            :label="this.$tc('application_management')"
            :caption="
              this.system_tiles + ' ' + this.$tc('app', this.system_tiles)
            "
            v-model="admin_apps"
          >
            <div class="sub-menu">
              <EssentialLink
                :title="this.$tc('application')"
                icon="apps"
                link="/admin/application"
              />
              <EssentialLink
                :title="this.$t('settings')"
                icon="settings"
                link="/admin/application/settings"
              />
            </div>
          </q-expansion-item>

          <q-expansion-item
            group="admin"
            icon="supervised_user_circle"
            :label="this.$tc('user_management')"
            :caption="this.users + ' ' + this.$tc('user', this.users)"
            v-model="admin_users"
          >
            <div class="sub-menu">
              <EssentialLink
                icon="supervised_user_circle"
                :title="this.$tc('user', 0)"
                link="/admin/user"
              />
              <!--<EssentialLink
          :title="this.$t('settings')"
          icon="settings"
          link="/admin/user/settings"
        />-->
            </div>
          </q-expansion-item>

          <!--<q-expansion-item
          group="admin"
          icon="account_tree"
          :label="this.$tc('proxy_management')"
          :caption="this.proxies + ' ' + this.$tc('app', this.proxies)"
          v-model="admin_proxies"
        >
        <div class="sub-menu">
        <EssentialLink
          icon="account_tree"
          :title="this.$tc('proxy_management')"
          link="/admin/proxy"
        />
        <EssentialLink
          icon="settings"
          :title="this.$t('settings')"
          link="/admin/proxy/settings"
        />
        </div>
        </q-expansion-item>-->
        </q-tab-panel>
      </q-tab-panels>
    </q-list>
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
    tiles() {
      return this.$store.state.tiles.active.length
    },
    active_tiles() {
      return this.$store.state.tiles.all.length
    },
    system_tiles() {
      return this.$store.state.tiles.system.length
    },
    users() {
      return this.$store.state.users.all.length
    },
    proxies() {
      // return this.$store.state.proxies.all.length
      return 1
    },
    settings() {
      // return this.$store.state.users.all.length
      return 3
    },
    username() {
      return this.$store.state.app.user.username
    },
    user() {
      return this.$store.state.app.user
    },
    email() {
      return this.$store.state.app.user.email
    },
    avatar() {
      const user = this.$store.state.app.user
      return user.avatar !== null
        ? process.env.BACKEND_LOCATION + user.avatar
        : 'https://apps.heimdall.site/img/heimdall-logo-white.svg'
    },
    activetab: {
      get() {
        if (this.user.level !== 0) {
          return 'user'
        }
        return this.$store.state.app.tab
      },
      set(val) {
        if (this.user.level !== 0) {
          val = 'user'
        }
        this.$store.commit('app/tab', val)
      }
    },
    activemenu() {
      return this.$store.state.app.menu
    },
    admin_apps: {
      get() {
        return this.$store.state.app.admin_apps
      },
      set(val) {
        this.$store.commit('app/adminApps', val)
      }
    },
    admin_users: {
      get() {
        return this.$store.state.app.admin_users
      },
      set(val) {
        this.$store.commit('app/adminUsers', val)
      }
    },
    admin_proxies: {
      get() {
        return this.$store.state.app.admin_proxies
      },
      set(val) {
        this.$store.commit('app/adminProxies', val)
      }
    }
  },

  data() {
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
  background: rgba(0, 0, 0, 0.15);
}
.sub-menu {
  background: #ffffff0a;
  padding: 0;
  box-shadow: inset 0 0 10px #0000005c;
  .q-item__label {
    color: #fff6;
    text-transform: capitalize;
  }
  .q-item__section--side > .q-icon {
    font-size: 18px;
    color: #fff6;
  }
  .q-item {
    padding: 10px 28px;
    color: #fffc;
  }
  .q-item.q-router-link--active {
    background: none;
    .q-item__label {
      font-weight: bold;
      color: #ffffffb8;
    }
    .q-item__section--side > .q-icon {
      color: #ffffffb8;
    }
  }
}
.q-drawer {
  .q-expansion-item__border {
    display: none;
  }
}
</style>
