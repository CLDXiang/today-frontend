<template>
  <div class="relative">
    <div
      v-if="visible"
      class="absolute bg-rose-500 w-1.5 h-1.5 rounded-full animate-ping origin-center"
      :class="offsetClasses"
    />
    <div
      v-if="visible"
      class="absolute bg-rose-500 w-1.5 h-1.5 rounded-full"
      :class="offsetClasses"
    />
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

type OffsetType = '0' | '0.5' | '1' | '1.5' | '2' | '2.5';

export default defineComponent({
  props: {
    /** 显示徽标 */
    visible: { type: Boolean, default: false },
    /** 向右偏移量 */
    offsetX: { type: String as PropType<OffsetType>, default: '0' },
    /** 向上偏移量 */
    offsetY: { type: String as PropType<OffsetType>, default: '0' },

  },
  setup(props) {
    const offsetClasses = computed(() => {
      const offsetClassX = {
        0: 'right-0',
        0.5: '-right-0.5',
        1: '-right-1',
        1.5: '-right-1.5',
        2: '-right-2',
        2.5: '-right-2.5',
      }[props.offsetX];
      const offsetClassY = {
        0: 'top-0',
        0.5: '-top-0.5',
        1: '-top-1',
        1.5: '-top-1.5',
        2: '-top-2',
        2.5: '-top-2.5',
      }[props.offsetY];
      return `${offsetClassX} ${offsetClassY}`;
    });
    return {
      offsetClasses,
    };
  },
});
</script>
