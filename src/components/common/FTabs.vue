<template>
  <div class="f-tabs">
    <div class="f-tabs__header">
      <span
        v-for="tabPane in tabPanes"
        :key="tabPane.tab"
        class="f-tabs__tab"
        :class="{ 'f-tabs__tab--active': tabPane.tab === modelValue }"
        @click="handleClickTab(tabPane.tab)"
      >
        {{ tabPane.name || tabPane.tab }}
      </span>
      <!-- <span
        class="f-tabs__floating-border"
        :style="floatingBorderStyle"
      /> -->
    </div>
    <div class="f-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref,
} from 'vue';

// TODO: 如何让外部 FTabPane 不必写 v-show/v-if

export default defineComponent({
  props: {
    /** (v-model) 激活的页面 key */
    modelValue: { type: String, required: true },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const tabPanes = ref<{
      tab: string;
      name: string;
    }[]>([]);
    tabPanes.value = (ctx.slots.default?.() || []).map((vNode) => ({
      tab: vNode.props?.tab || '',
      name: vNode.props?.name || '',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // children: (vNode.children as any)?.default?.() || null,
    }));

    return {
      tabPanes,
    };
  },
  computed: {
    // /** 计算下方悬浮 border 尺寸位置 */
    // floatingBorderStyle(): Record<string, string> {
    //   // 按照全角 key 计算
    //   const fontSize = 17;
    //   const paddingX = 12;
    //   const width = this.modelValue.length * fontSize + 6;
    //   const index = this.pageKeys.indexOf(this.modelValue);
    //   if (index === -1) return {};
    //   const pageKeysBefore = this.pageKeys.slice(0, index);
    //   const totalLength = pageKeysBefore.reduce((pv, cv) => pv + cv.length, 0);
    //   const left = pageKeysBefore.length * paddingX * 2 + paddingX + totalLength * fontSize - 3;
    //   return {
    //     width: `${width}px`,
    //     left: `${left}px`,
    //   };
    // },
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
    display: flex;
    justify-content: flex-start;
    align-items: center;
    user-select: none;
    box-sizing: content-box;

    height: 28px;
    font-size: $font-size;
    line-height: 22px;
    color: #828282;

    position: relative;

    > .f-tabs__tab {
      flex: 0 0 auto;
      // padding: 0 $padding-x;
      padding: 3px 10px;
      margin-left: 4px;
      border-radius: 8px;
      box-sizing: border-box;

      cursor: pointer;
      transition: all 0.3s cubic-bezier(.4,0,.2,1);

      &.f-tabs__tab--active {
        color: #fff;
        background: #9fd3da;
      }

      &:first-child {
        margin-left: 0;
      }
    }

    // > .f-tabs__floating-border {
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   height: 3px;
    //   background-color: $primary-color;
    //   border-radius: 1px;

    //   transition: all 0.3s cubic-bezier(.4,0,.2,1);
    // }
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
