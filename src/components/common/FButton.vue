<template>
  <button
    class="focus:outline-none text-sm transition-shadow duration-300 relative flex justify-center items-center"
    :class="classNameArray"
    @mousedown="handleMousedown"
    @mouseup="handleMouseup"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      class="animate-spin h-5 w-5 absolute"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <div :class="{ 'opacity-0': loading }">
      <slot />
    </div>
  </button>
</template>

<script lang="ts">
import {
  defineComponent, PropType, computed, ref, onBeforeUnmount,
} from 'vue';

export default defineComponent({
  props: {
    /** 类型
     * @option primary - 强调 / 主色
     * @option normal - 一般【默认】
     * @option danger - 危险
     * @option link - 链接
     */
    type: { type: String as PropType<'primary' | 'normal' | 'danger' | 'link'>, default: 'normal' },
    /** 形状
     * @option base - 圆角【默认】
     * @option round - 明显圆角
     * @option circle - 两侧半圆
     */
    shape: { type: String as PropType<'base' | 'round' | 'circle'>, default: 'base' },
    /** 尺寸
     * @option base - 默认
     * @option small - 小号
     * @option large - 大号
     */
    size: { type: String as PropType<'base' | 'small' | 'large'>, default: 'base' },
    /** 禁用态 */
    disabled: { type: Boolean, default: false },
    /** 加载态 */
    loading: { type: Boolean, default: false },
    /** 幽灵样式，使背景色变透明 */
    ghost: { type: Boolean, default: false },
  },
  setup(props) {
    /** 刚失去焦点 */
    const blurring = ref(false);
    /** 失焦计时器 */
    const blurringTimer = ref<number>(-1);

    const classNameArray = computed<string[]>(() => {
      /** 背景色 */
      let bg = '';

      if (props.ghost || props.type === 'link') {
        bg = 'bg-transparent';
      } else if (props.disabled) {
        bg = 'bg-gray-100';
      } else {
        switch (props.type) {
          case 'primary':
            bg = 'bg-primary';
            break;
          case 'normal':
            bg = 'bg-white';
            break;
          case 'danger':
            bg = 'bg-red-400';
            break;
          default:
            break;
        }
      }

      /** 边框 */
      let border = '';

      switch (props.type) {
        case 'primary':
          border = 'border border-primary ring-primary';
          break;
        case 'normal':
          border = 'border border-gray-300 ring-gray-300';
          break;
        case 'danger':
          border = 'border border-red-400 ring-red-400';
          break;
        case 'link':
        default:
          break;
      }

      /** 外围 ring */
      const ring = blurring.value && props.type !== 'link' ? 'ring ring-opacity-50' : '';

      /** 文字颜色 */
      let textColor = '';

      if (props.disabled) {
        textColor = 'text-gray-400';
      } else {
        switch (props.type) {
          case 'primary':
            textColor = props.ghost ? 'text-primary' : 'text-white';
            break;
          case 'danger':
            textColor = props.ghost ? 'text-red-400' : 'text-white';
            break;
          case 'normal':
            textColor = 'text-gray-800';
            break;
          case 'link':
            textColor = 'text-primary';
            break;
          default:
            break;
        }
      }

      /** 圆角 */
      let rounded = '';

      switch (props.shape) {
        case 'base':
          rounded = 'rounded-sm';
          break;
        case 'round':
          rounded = 'rounded-md';
          break;
        case 'circle':
          rounded = 'rounded-full';
          break;
        default:
          break;
      }

      /** 尺寸 */
      let size = '';

      switch (props.size) {
        case 'base':
          size = 'h-8 px-2';
          break;
        case 'small':
          size = 'h-6 px-3';
          break;
        case 'large':
          size = 'h-10 px-4';
          break;
        default:
          break;
      }

      /** 指针样式 */
      const cursor = props.disabled ? 'cursor-not-allowed' : '';

      /** 透明度 */
      const opacity = props.disabled ? '' : 'focus:opacity-80 hover:opacity-80 transition-opacity';

      return [bg, border, textColor, size, rounded, cursor, opacity, ring];
    });

    const handleMousedown = () => {
      if (props.disabled) {
        return;
      }
      clearTimeout(blurringTimer.value);
      blurring.value = false;
    };

    const handleMouseup = () => {
      if (props.disabled) {
        return;
      }
      blurring.value = true;
      blurringTimer.value = setTimeout(() => {
        blurring.value = false;
      }, 300);
    };

    const handleClick = (e: MouseEvent) => {
      if (props.disabled) {
        // 若禁用，则阻止外部事件
        e.stopImmediatePropagation();
      }
    };

    onBeforeUnmount(() => {
      // 销毁前清除计时器
      clearTimeout(blurringTimer.value);
    });

    return {
      classNameArray,
      handleMousedown,
      handleMouseup,
      handleClick,
    };
  },
});
</script>
