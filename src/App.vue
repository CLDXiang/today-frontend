<template>
  <v-app>
    <TopToolbar></TopToolbar>
    <!-- <v-layout>
        <div v-if="loggedIn">Hi {{ userName }}</div>
        <div v-else>Please login first!</div>
    </v-layout>-->
    <v-content>
      <router-view></router-view>
    </v-content>
    <BottomNav></BottomNav>
  </v-app>
</template>

<script>
import TopToolbar from './components/TopToolbar.vue';
import BottomNav from './components/BottomNav.vue';

export default {
  components: {
    TopToolbar,
    BottomNav,
  },
  computed: {
    loggedIn() {
      return this.$store.user != null;
    },
    userName() {
      return this.$this.store.user.name;
    },
  },
};
</script>
