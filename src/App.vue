<template>
  <div :style="{ paddingBottom: isBottomNavVisible ? '64px': '0', height: '100vh' }">
    <router-view />
  </div>
  <bottom-nav v-show="isBottomNavVisible" />
</template>

<script lang="ts">
import BottomNav from '@/components/BottomNav.vue';
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';
import { HeapPagePathReges } from '@/router';
import { BreakpointType } from '@/store';

export default defineComponent({
  components: {
    BottomNav,
  },

  data() {
    return {
      currentBreakpoint: 'xs' as BreakpointType,
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
    ...mapMutations(['setBreakpoint']),
    onResize(): void {
      let newBreakpoint = this.currentBreakpoint;
      const newWidth = window.innerWidth;

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
    },
  },
});
</script>

<style lang="scss">
#app {
  font-family: Roboto, Heiti SC, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}

.ant-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  > svg:first-child {
    margin-right: 4px;
  }
}

</style>
