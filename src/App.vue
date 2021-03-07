<template>
  <main class="h-full w-full flex flex-col">
    <div class="flex-auto h-0 overflow-hidden">
      <router-view />
    </div>
    <bottom-nav v-show="isBottomNavVisible" />
  </main>
</template>

<script lang="ts">
import BottomNav from '@/components/BottomNav.vue';
import { defineComponent } from 'vue';
import { HeapPagePathReges } from '@/router';

export default defineComponent({
  components: {
    BottomNav,
  },
  computed: {
    isBottomNavVisible() {
      const { path } = this.$route;
      return HeapPagePathReges.reduce((pv, reg) => pv || reg.test(path), false);
    },
  },
});
</script>

<style lang="scss">
body {
  font-family: Heiti SC, Roboto, Avenir, Helvetica, Arial, sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;

  height: 100%;
  overflow-y: hidden;
}

.ant-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  > svg:first-child {
    margin-right: 4px;
  }
}

.ant-drawer-bottom > .ant-drawer-content-wrapper > .ant-drawer-content {
  border-radius: 16px 16px 0 0;

  > .ant-drawer-wrapper-body > .ant-drawer-body {
    height: 100%;
    padding: 0;
  }
}

.ant-drawer-right > .ant-drawer-content-wrapper > .ant-drawer-content {
  border-radius: 16px 0 0 16px;

  > .ant-drawer-wrapper-body > .ant-drawer-body {
    height: 100%;
    padding: 0;
  }
}

.ant-drawer-open .ant-drawer-content-wrapper {
  box-shadow: none !important;
}

.ant-btn-round.ant-btn-lg {
  padding: 0 16px;
}

.ant-btn-danger {
  background-color: $color-red;
  border-color: $color-red;
}

:focus {
  outline: none;
}
</style>
