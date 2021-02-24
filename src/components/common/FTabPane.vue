<template>
  <span
    ref="scroll"
    class="f-tabs__pane"
  >
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useScrollToBottom } from '@/composables';

export default defineComponent({
  props: {
    /** key */
    tab: { type: String, required: true },
    /** 标签名 */
    name: { type: String, default: undefined },
    /** 距离底部多少 px 触发 on-scroll-to-bottom */
    bottomOffset: { type: Number, default: 0 },
  },
  emits: ['on-scroll-to-bottom'],
  setup(props, ctx) {
    const { scrollRef: scroll } = useScrollToBottom(
      () => ctx.emit('on-scroll-to-bottom'),
      props.bottomOffset,
    );

    return {
      scroll,
    };
  },
});
</script>

<style lang="scss">
.f-tabs__pane {
  overflow-y: auto;
}
</style>
