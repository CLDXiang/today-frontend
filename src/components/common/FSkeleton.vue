<template>
  <div class="flex w-full animate-pulse">
    <div
      v-if="avatar"
      class="flex-initial mr-4 bg-gray-200 rounded-full"
      :class="avatarSizeClass"
    />
    <ul
      v-if="rows > 0"
      class="flex-1"
    >
      <li
        v-for="i in rows"
        :key="i"
        class="h-4 mt-4 first:mt-0 bg-gray-200 rounded max-w-full"
        :style="{
          width: widths[i - 1],
        }"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    /** 展示头像 */
    avatar: { type: Boolean, default: false },
    /** 头像大小 */
    avatarSize: { type: String as PropType<'base' | 'large'>, default: 'base' },
    /** 行数 */
    rows: { type: Number, default: 2 },
    /** 每行宽度
     * 传入单个值为最后一行宽度，传入多个值则为从首行开始每行的宽度
     */
    width: {
      type: [Number, String, Array] as PropType<number | string | Array<number | string>>,
      default: '100%',
    },
  },
  setup(props) {
    const avatarSizeClass = computed(() => {
      switch (props.avatarSize) {
        case 'base':
          return 'w-9 h-9';
        case 'large':
          return 'w-20 h-20';
        default:
          return '';
      }
    });
    const widths = computed<string[]>(() => {
      if (typeof props.width === 'number') {
        return [...Array(props.rows - 1).fill('100%'), `${props.width}px`];
      }
      if (typeof props.width === 'string') {
        return [...Array(props.rows - 1).fill('100%'), props.width];
      }
      if (Array.isArray(props.width)) {
        const res = props.width.map((w) => (typeof w === 'number' ? `${w}px` : w)) as string[];
        return [...res, ...Array(props.rows - res.length).fill('100%')];
      }
      return Array(props.rows).fill('100%');
    });

    return {
      avatarSizeClass,
      widths,
    };
  },
});
</script>
