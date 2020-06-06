<template>
  <v-app>
    <TopToolbar />
    <!-- <v-layout>
        <div v-if="loggedIn">Hi {{ userName }}</div>
        <div v-else>Please login first!</div>
    </v-layout>-->
    <v-content>
      <router-view />
    </v-content>
    <BottomNav />
    <Message />
  </v-app>
</template>

<script>
import TopToolbar from './components/common/TopToolbar.vue';
import BottomNav from './components/common/BottomNav.vue';
import Message from './components/common/Message.vue';

export default {
  components: {
    TopToolbar,
    BottomNav,
    Message,
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
<style>
@import url('https://fonts.googleapis.com/css?family=Material+Icons+Round|Material+Icons');

.tui-editor-contents pre code {
  box-shadow: none;
  -webkit-box-shadow: none;
}
.tui-editor-contents code {
  box-shadow: none;
  -webkit-box-shadow: none;
}
.v-application .tui-editor-contents code:before,
.v-application .tui-editor-contents code:after {
  content: '';
  letter-spacing: 0;
}
</style>
