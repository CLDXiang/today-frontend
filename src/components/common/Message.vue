<template>
  <v-snackbar
    v-model="isMessageVisible"
    :color="globalMessageColor"
    :timeout="0"
    top
  >
    {{ globalMessageText }}
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isMessageVisible: false,
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
    isMessageVisible(newVal, oldVal) {
      if (oldVal === true && newVal === false) {
        // 组件内触发了隐藏，通知全局
        this.$store.commit('hideGlobalMessage');
      }
    },
    isGlobalMessageVisible(newVal, oldVal) {
      if (oldVal === false && newVal === true) {
        // 全局触发了显示，通知组件内
        this.isMessageVisible = true;
      } else if (this.isMessageVisible === true) {
        // 全局触发了隐藏，通知组件内
        if (this.timer >= 0) {
          // 若计时器存在，则取消
          clearTimeout(this.timer);
        }
        this.isMessageVisible = false;
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
          this.isMessageVisible = false;
          this.timer = -1;
          this.$store.commit('clearGlobalMessageTimer');
        }, this.globalMessageTimeout);
      }
    },
  },
};
</script>
