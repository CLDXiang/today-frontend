<template>
  <v-container>
    <v-layout>
      <div v-if="loggedIn"> Hi {{ userName }} </div>
      <div v-else>
        Please login first!
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.user != null;
    },
    userName() {
      return this.$this.store.user.name;
    }
  }
};
</script>
