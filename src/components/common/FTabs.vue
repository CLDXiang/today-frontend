<template>
  <div class="f-tabs h-full">
    <div class="f-tabs__header hide-scrollbar">
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
    <div
      ref="scrollContent"
      class="f-tabs__content hide-scrollbar"
      @scroll="handleContentScroll"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, VNode, isVNode,
} from 'vue';

const isTabPane = (vNode: VNode) => vNode.props?.tab !== undefined;

export default defineComponent({
  props: {
    /** (v-model) 激活的页面 key */
    modelValue: { type: String, required: true },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const tabPanesInit: {
        tab: string;
        name: string;
      }[] = [];

    /** 一级子节点 */
    const children = (ctx.slots.default?.() || []);
    children.forEach((child) => {
      if (isTabPane(child)) {
        // 如果是 TabPane，加到列表中
        tabPanesInit.push({
          tab: child.props?.tab || '',
          name: child.props?.name || '',
        });
      } else if (child.children?.length && Array.isArray(child.children)) {
        // 如果有子节点，对二级节点判断是否是 TabPane，如果是则加入到列表中
        child.children.forEach((c) => {
          if (isVNode(c) && isTabPane(c)) {
            tabPanesInit.push({
              tab: c.props?.tab || '',
              name: c.props?.name || '',
            });
          }
        });
      }
    });
    const tabPanes = ref(tabPanesInit);

    /** scroll-content 元素 */
    const scrollContentRef = ref<HTMLDivElement>();

    /** 变更标签页 */
    const changeTabPage = (pageKey: string) => {
      if (props.modelValue === pageKey) {
        return;
      }
      ctx.emit('update:modelValue', pageKey);
    };

    /** 点击 tab 项 */
    const handleClickTab = (pageKey: string) => {
      const pageIndex = tabPanes.value.findIndex((v) => v.tab === pageKey);
      if (!scrollContentRef.value || pageIndex === -1) {
        return;
      }
      const { offsetWidth } = scrollContentRef.value;
      scrollContentRef.value.scrollTo(pageIndex * offsetWidth, 0);
    };

    /** 内容横向滚动监听 */
    const handleContentScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      const { scrollLeft, offsetWidth } = target;
      const scrollRatio = Math.round(scrollLeft / offsetWidth);
      if (tabPanes.value[scrollRatio].tab !== props.modelValue) {
        // 若滚动比例为整数（贴在某页左边沿）且当前滚动位置不等于 modelValue，将 modelValue 更新为当前滚动位置所在页
        changeTabPage(tabPanes.value[scrollRatio].tab);
      }
    };

    return {
      tabPanes,
      scrollContent: scrollContentRef,
      handleClickTab,
      handleContentScroll,
    };
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
  overflow: hidden;

  > .f-tabs__header {
    flex: 0 0 auto;
    overflow-x: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    user-select: none;
    box-sizing: content-box;

    height: 28px;
    font-size: $font-size;
    line-height: 22px;
    color: $gray3;

    position: relative;

    > .f-tabs__tab {
      flex: 0 0 auto;
      // padding: 0 $padding-x;
      padding: 3px 10px;
      margin-left: 4px;
      border-radius: 8px;
      box-sizing: border-box;

      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &.f-tabs__tab--active {
        color: #fff;
        background: #9fd3da;
      }

      &:first-child {
        margin-left: 0;
      }
    }
  }

  > .f-tabs__content {
    flex: 1;
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }
}
</style>
