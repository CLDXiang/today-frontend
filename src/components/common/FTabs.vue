<template>
  <div class="f-tabs">
    <div class="f-tabs__header">
      <span
        v-for="pageKey in pageKeys"
        :key="pageKey"
        class="f-tabs__tab"
        :class="{ 'f-tabs__tab--active': pageKey === modelValue }"
        @click="handleClickTab(pageKey)"
      >
        {{ pageKey }}
      </span>
      <span
        class="f-tabs__floating-border"
        :style="floatingBorderStyle"
      />
    </div>
    <div class="f-tabs__content">
      <span
        v-for="pageKey in pageKeys"
        v-show="pageKey === modelValue"
        :key="pageKey"
        class="f-tabs__pane"
      >
        {{ pages[pageKey] || '' }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, VNode } from 'vue';

export default defineComponent({
  props: {
    /** 子页面，key 必须为全角字符串 */
    pages: { type: Object as PropType<Record<string, VNode | string>>, required: true },
    /** (v-model) 激活的页面 key */
    modelValue: { type: String, required: true },
  },
  emits: ['update:modelValue'],
  computed: {
    pageKeys(): string[] {
      return Object.keys(this.pages);
    },
    /** 计算下方悬浮 border 尺寸位置 */
    floatingBorderStyle(): Record<string, string> {
      // 按照全角 key 计算
      const fontSize = 17;
      const paddingX = 12;
      const width = this.modelValue.length * fontSize + 6;
      const index = this.pageKeys.indexOf(this.modelValue);
      if (index === -1) return {};
      const pageKeysBefore = this.pageKeys.slice(0, index);
      const totalLength = pageKeysBefore.reduce((pv, cv) => pv + cv.length, 0);
      const left = pageKeysBefore.length * paddingX * 2 + paddingX + totalLength * fontSize - 3;
      return {
        width: `${width}px`,
        left: `${left}px`,
      };
    },
  },
  methods: {
    handleClickTab(pageKey: string) {
      if (this.modelValue === pageKey) {
        return;
      }
      this.$emit('update:modelValue', pageKey);
    },
  },
});
</script>

<style lang="scss">
$font-size: 17px;
$padding-x: 12px;

.f-tabs {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: stretch;

  > .f-tabs__header {
    overflow-x: auto;
    align-self: center;
    display: flex;
    align-items: stretch;
    user-select: none;

    height: 28px;
    font-size: $font-size;
    line-height: 22px;
    color: #aaadb3;

    position: relative;

    > .f-tabs__tab {
      flex: 0 0 auto;
      padding: 0 $padding-x;

      cursor: pointer;

      &.f-tabs__tab--active {
        color: $primary-color;
      }

      transition: all 0.3s cubic-bezier(.4,0,.2,1);
    }

    > .f-tabs__floating-border {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background-color: $primary-color;
      border-radius: 1px;

      transition: all 0.3s cubic-bezier(.4,0,.2,1);
    }
  }

  > .f-tabs__content {
    flex: 1;

    > .f-tabs__pane {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
