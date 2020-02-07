<template>
  <v-container>
      <h1>用户资料</h1>
      <p>欢迎 {{ user }}</p>
      <v-btn @click="logout">登出</v-btn>
  </v-container>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit('SET_JWT_TOKEN', '');
    }
  },
  computed: {
    user() {
      return this.$store.state.user.name;
    }
  }
}
</script>

<style>

</style>