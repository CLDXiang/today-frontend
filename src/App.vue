<template>
  <div
    class="main-container"
    :style="{ paddingBottom: isBottomNavVisible ? '64px' : '0' }"
  >
    <router-view />
  </div>
  <bottom-nav v-show="isBottomNavVisible" />
</template>

<script lang="ts">
import BottomNav from '@/components/BottomNav.vue';
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';
import { HeapPagePathReges } from '@/router';
import { BreakpointType } from '@/store/types';

export default defineComponent({
  components: {
    BottomNav,
  },

  data() {
    return {
      currentBreakpoint: 'xs' as BreakpointType,
      currentInnerHeight: 667,
    };
  },

  computed: {
    isBottomNavVisible() {
      const { path } = this.$route;
      return HeapPagePathReges.reduce((pv, reg) => pv || reg.test(path), false);
    },
  },

  beforeUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }
  },

  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },

  methods: {
    ...mapMutations(['setBreakpoint', 'setInnerHeight']),
    onResize(): void {
      let newBreakpoint = this.currentBreakpoint;
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      if (newWidth < 600) {
        newBreakpoint = 'xs';
      } else if (newWidth < 960) {
        newBreakpoint = 'sm';
      } else if (newWidth < 1264) {
        newBreakpoint = 'md';
      } else if (newWidth < 1904) {
        newBreakpoint = 'lg';
      } else if (newWidth >= 1904) {
        newBreakpoint = 'xl';
      } else {
        newBreakpoint = 'xs';
      }

      if (newBreakpoint !== this.currentBreakpoint) {
        this.currentBreakpoint = newBreakpoint;
        this.setBreakpoint(newBreakpoint);
      }
      if (newHeight !== this.currentInnerHeight) {
        this.currentInnerHeight = newHeight;
        this.setInnerHeight(newHeight);
      }
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

  > .main-container {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
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

.ant-popover-inner {
  border-radius: 8px;
  .ant-popover-inner-content {
    padding: 0;
  }
}

:focus {
  outline: none;
}

.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
  scrollbar-color: transparent transparent;
  min-width: unset;
  &::-webkit-scrollbar {
    display: none;
    min-width: inherit;
    background-color: transparent;
  }
}
</style>
