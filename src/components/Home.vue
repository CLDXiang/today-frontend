<template>
  <div>
    <v-container>
      <TopToolbar></TopToolbar>
      <v-layout>
        <div v-if="loggedIn">Hi {{ userName }}</div>
        <div v-else>Please login first!</div>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import TopToolbar from './TopToolbar';

export default {
  components: {
    TopToolbar,
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
