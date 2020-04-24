<template>
  <div>
    <v-navigation-drawer v-model="showMenu" app fixed>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>{{ user }}</v-list-item-content>
        </v-list-item>
        <v-list-item @click="doNothing">
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>设置</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="doNothing">
          <v-list-item-action>
            <v-icon>mdi-help</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>帮助</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ status }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app fixed dark color="primary">
      <v-app-bar-nav-icon @click.stop="toggleMenu" />
      <v-toolbar-title>{{ barTitle }}</v-toolbar-title>
      <v-spacer />
      <!-- <v-icon @click.stop="back">mdi-face</v-icon> -->
      <v-btn @click.stop="back">
        返回
      </v-btn>
      <!-- <v-app-bar-nav-icon @click.stop="toggleStatus"></v-app-bar-nav-icon> -->
    </v-app-bar>
  </div>
</template>

<script>
import log from '../../utils/log';

export default {
  name: 'TopToolbar',
  data: () => ({
    showMenu: false,
  }),
  computed: {
    user() {
      return this.$store.state.user.name;
    },
    barTitle() {
      return this.$store.state.app.barTitle;
    },
    status() {
      return this.$store.getters.userLoggedIn ? '登出' : '登录';
    },
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    doNothing() {},
    back() {
      // this.$router.push('login');
      this.$router.back();
    },
    logout() {
      if (this.$store.getters.userLoggedIn) {
        log.info('logout');
        this.$store.commit('LOGOUT');
        this.$router.replace({ name: 'Timetable' });
      } else {
        this.$router.replace({ name: 'Login', query: { redirect: '/profile' } });
      }
    },
  },
};
</script>
