<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <BottomNav />
    <Message />
  </v-app>
</template>

<script>
import BottomNav from './components/common/BottomNav.vue';
import Message from './components/common/Message.vue';

export default {
  components: {
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

.tui-editor-contents {
  font-size: 1rem;
}
.te-md-container .CodeMirror {
  font-size: 1rem;
}
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
