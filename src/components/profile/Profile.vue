<template>
  <v-container>
    <router-view />
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.state.app.barTitle = '个人中心'; // 防止刷新页面导致 barTitle 变为 Fudan Today
  },
};
</script>

<style></style>
