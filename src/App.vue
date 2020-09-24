<template>
  <router-view />
  <bottom-nav />
</template>

<script>
import BottomNav from '@/components/common/BottomNav.vue';

export default {
  components: {
    BottomNav,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
