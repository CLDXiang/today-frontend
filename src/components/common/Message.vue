<template>
  <v-snackbar
    :value="isGlobalMessageVisible"
    :color="globalMessageColor"
    :timeout="-1"
    top
  >
    <span :style="{ color: globalMessageColor === '#fff' ? '#000' : '#fff'}">{{ globalMessageText }}</span>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      // 为什么不用自带的 timeout：自带的 timeout 在两次消息间不会更新计时器
      timer: -1,
    };
  },
  computed: {
    ...mapState([
      'isGlobalMessageVisible',
      'globalMessageColor',
      'globalMessageTimeout',
      'globalMessageText',
      'globalMessageTimer',
    ]),
  },
  watch: {
    isGlobalMessageVisible(newVal) {
      if (newVal === false) {
        // 全局触发了隐藏，通知组件内
        if (this.timer >= 0) {
          // 若计时器存在，则取消
          clearTimeout(this.timer);
        }
        this.timer = -1;
        this.$store.commit('clearGlobalMessageTimer');
      }
    },
    globalMessageTimer(newVal, oldVal) {
      if (newVal > oldVal) {
        this.updateTimer();
      }
    },
  },
  methods: {
    updateTimer() {
      if (this.timer >= 0) {
        // 若计时器存在，则取消
        clearTimeout(this.timer);
      }
      if (this.globalMessageTimeout === 0) {
        // 对于 loading 等只能手动触发关闭的
        this.timer = -1;
        this.$store.commit('clearGlobalMessageTimer');
      } else {
        this.timer = setTimeout(() => {
          this.timer = -1;
          this.$store.commit('hideGlobalMessage');
          this.$store.commit('clearGlobalMessageTimer');
        }, this.globalMessageTimeout);
      }
    },
  },
};
</script>
