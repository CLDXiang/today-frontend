<template>
  <div class="five-stars">
    <span
      v-for="i in 5"
      :key="i"
      class="five-stars__star"
      :style="{ marginRight: i === 5 ? 0 : `${spacing}px` }"
    >
      <f-icon
        :name="i <= scoreInt ? 'star-fill' : 'star'"
        :size="size"
        @click="handleClickStar(i)"
      />
      <div
        v-if="i === scoreInt && hint && hint[i - 1]"
        :style="{
          fontSize: `${size / 2}px`,
          lineHeight: `${size / 2}px`,
          top: `${size + spacing}px`,
          left: `${size / 2}px`,
        }"
        class="five-stars__hint"
      >
        {{ hint[i - 1] }}
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    /** 是否可交互 */
    clickable: { type: Boolean, default: false },
    /** 分数 */
    score: { type: Number, default: undefined },
    /** 星星底部文案 */
    hint: {
      type: Array as PropType<string[]>,
      default: undefined,
    },
    /** 尺寸 */
    size: { type: [String, Number], default: 12 },
    /** 间距 */
    spacing: { type: [String, Number], default: 2 },
    /** v-model */
    modelValue: { type: Number, default: undefined },
  },
  emits: ['change', 'update:modelValue'],
  computed: {
    scoreInt(): number {
      return Math.round(this.score || this.modelValue || 0);
    },
  },
  methods: {
    /** 点击星星触发 change 事件 */
    handleClickStar(i: number) {
      if (this.clickable) {
        this.$emit('change', i);
        this.$emit('update:modelValue', i);
      }
    },
  },
});
</script>

<style lang="scss">
.five-stars {
  display: flex;
}

.five-stars__star {
  position: relative;

  > svg {
    color: #f3c44b;
  }

  > .five-stars__hint {
    position: absolute;
    color: #aaa;
    white-space: nowrap;
    transform: translateX(-50%);
  }
}
</style>
