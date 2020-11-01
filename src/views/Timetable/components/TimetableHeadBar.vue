<template>
  <div class="head-bar">
    <side-avatar />
    <div class="semester">
      <f-icon
        name="left"
        size="12"
        class="icon"
        @click="handleClickLeft"
      />
      <span class="semester__name">
        {{ semester }}
      </span>
      <f-icon
        name="right"
        size="12"
        class="icon"
        @click="handleClickRight"
      />
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
  props: {
    semester: { type: String, required: true },
  },
  emits: ['click-cloud', 'click-left', 'click-right'],
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
    handleClickLeft() {
      this.$emit('click-left');
    },
    handleClickRight() {
      this.$emit('click-right');
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
    display: flex;
    align-items: baseline;
    > .icon {
      cursor: pointer;
      color: $primary-color;
    }
    > .semester__name {
      width: 220px;
    }
  }

  > .action-group {
    display: flex;
    align-items: center;
    color: $primary-color;
  }
}
</style>
