<template>
  <router-view />
  <bottom-nav />
</template>

<script>
import BottomNav from '@/components/common/BottomNav.vue';
import { mapMutations } from 'vuex';

export default {
  components: {
    BottomNav,
  },

  data() {
    return {
      currentBreakpoint: 'xs',
    };
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
    onResize() {
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
