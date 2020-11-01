<template>
  <div class="selected-course-list-box">
    <div class="selected-course-list__header">
      <span>
        <span>已选课程列表</span>
        <span
          class="icon-cloud clickable"
          @click="handleClickCloud"
        >
          <f-icon
            name="cloud"
            :width="24"
            :height="20"
          />
        </span>
      </span>
      <span
        class="icon-right clickable"
        @click="$emit('click-back')"
      >
        <f-icon
          name="right"
          :width="10"
          :height="16"
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['click-cloud', 'click-back'],
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
@import '@/scss/_clickable';

.selected-course-list-box {
  background-color: #e3f1f3;
  height: 100%;
  border-radius: 16px 0 0 16px;

  > .selected-course-list__header {
    height: 55px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px;
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
    color: #4f4f4f;

    > span:first-child {
      display: flex;
      align-items: center;
      > .icon-cloud {
        margin-left: 8px;
        color: $primary-color;
        height: 20px;
      }
    }

    > .icon-right {
      justify-self: flex-end;
      color: #828282;
      height: 16px;
    }
  }
}
</style>
