<template>
  <div class="head-bar">
    <side-avatar />
    <div class="semester">
      2020年秋季学期
    </div>
    <div
      class="action-group"
      @click="handleClickCloud"
    >
      <f-icon
        name="cloud"
        size="24"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideAvatar from '@/components/SideAvatar.vue';

export default defineComponent({
  components: {
    SideAvatar,
  },
  emits: ['click-cloud'],
  data() {
    return {
      /** 同步冷却 */
      cooldownCnt: 0,
    };
  },
  methods: {
    handleClickCloud() {
      if (this.cooldownCnt > 0) {
        this.$message.warn(`请等待${this.cooldownCnt}秒再进行下一次云同步~`);
        return;
      }
      const cooldown = () => {
        setTimeout(() => {
          this.cooldownCnt -= 1;
          if (this.cooldownCnt > 0) {
            cooldown();
          }
        }, 1000);
      };

      this.cooldownCnt = 60;
      cooldown();
      this.$emit('click-cloud');
    },
  },
});
</script>

<style lang="scss" scoped>
.head-bar {
  width: 100%;

  padding: 0 12px;
  margin-bottom: 12px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #333;

  > .semester {
    font-size: 18px;
  }

  > .action-group {
    display: flex;
    align-items: center;
    color: $primary-color;
  }
}
</style>
