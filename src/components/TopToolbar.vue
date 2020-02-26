<template>
  <div>
    <v-navigation-drawer app fixed v-model="showMenu">
      <v-list dense>
        <v-list-item>
          <v-list-item-content>{{ user }}</v-list-item-content>
        </v-list-item>
        <v-list-item @click="doNothing">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
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
            <v-list-item-title>登出</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app fixed dark color="primary">
      <v-app-bar-nav-icon @click.stop="toggleMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ barTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon @click.stop="back">mdi-face</v-icon>
      <!-- <v-app-bar-nav-icon @click.stop="toggleStatus"></v-app-bar-nav-icon> -->
    </v-app-bar>
  </div>
</template>

<script>
import log from '../utils/log';
export default {
  name: 'TopToolbar',
  data: () => {
    return {
      showMenu: false,
    };
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
      log.info('logout');
      this.$store.commit('LOGOUT');
    },
  },
  computed: {
    user() {
      return this.$store.state.user.name;
    },
    barTitle() {
      return this.$store.state.app.barTitle;
    }
  },
};
</script>