<template>
  <div class="f-select">
    <a-dropdown
      :disabled="disabled"
      :trigger="['click']"
      @visibleChange="handleVisibleChange"
    >
      <div
        class="box-border cursor-pointer rounded text-gray-400 border-current"
        :class="{
          'py-1 px-2 mb-1 text-base h-10 transition-colors': true,
          'border': !isFocused,
          'text-primary border-2': isFocused,
          'cursor-not-allowed': disabled,
        }"
        @click="handleClickTextField"
      >
        <div class="h-full relative flex items-center hover:text-gray-700">
          <span
            v-if="label !== undefined"
            class="text-gray-400 transition-all absolute left-0 origin-top-left py-0 px-1 transform"
            :class="{
              'bg-white': true,
              '-translate-y-4 scale-75': shouldLabelFloating,
              'text-primary': isFocused,
            }"
          >
            {{ label }}
          </span>

          <input
            ref="input"
            class="border-none outline-none cursor-pointer text-gray-700 w-full"
            :class="{ 'cursor-not-allowed': disabled }"
            :value="modelValue"
            type="text"
            readonly="readonly"
            :autocomplete="false"
            :autofocus="autofocus"
            :disabled="disabled"
            :placeholder="placeholder"
            @focus="handleInputFocused"
            @blur="handleInputBlured"
          >
        </div>
      </div>
      <template #overlay>
        <div class="rounded shadow-lg overflow-y-auto overflow-x-hidden max-h-screen">
          <div class="bg-white py-2 px-0">
            <div
              v-for="option in options"
              :key="option"
              class="h-10 cursor-pointer select-none flex items-center flex-auto py-0 px-4"
              :class="{
                'text-primary bg-primary bg-opacity-10':
                  option === modelValue,
                ' hover:bg-gray-100': option !== modelValue,
              }"
              @click="changeValue(option)"
            >
              {{ option }}
            </div>
          </div>
        </div>
      </template>
    </a-dropdown>

    <div
      :class="{
        'flex justify-between items-center py-0 px-3': !disabled,
        'h-3 text-xs break-words text-gray-500': !disabled,
      }"
    >
      <transition
        enter-active-class="transition-all ease-out transform duration-300"
        enter-from-class="-translate-y-2 opacity-0"
        leave-active-class="transition-all ease-out transform duration-300"
        leave-to-class="-translate-y-2 opacity-0"
      >
        <span
          v-show="isHintVisible"
        >
          {{ hint }}
        </span>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    /** 选项 */
    options: { type: Array as PropType<string[]>, required: true },
    /** 默认选中项 */
    default: { type: String, default: undefined },
    /** 是否自动获得焦点 */
    autofocus: { type: Boolean, default: false },
    /** 是否禁用 */
    disabled: { type: Boolean, default: false },
    /** 下方提示文本 */
    hint: { type: String, default: undefined },
    /** 提示文本是否不隐藏 */
    persistentHint: { type: Boolean, default: false },
    /** 字段名 */
    label: { type: String, default: undefined },
    /** 占位文本 */
    placeholder: { type: String, default: undefined },
    modelValue: { type: String, default: undefined },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isFocused: false,
    };
  },
  computed: {
    /** 标签是否悬浮在左上角 */
    shouldLabelFloating(): boolean {
      return this.label !== undefined && (this.isFocused || Boolean(this.modelValue));
    },
    /** hint 是否显示 */
    isHintVisible(): boolean {
      return this.hint !== undefined && (this.isFocused || this.persistentHint);
    },
  },
  mounted() {
    // 若有默认值则设默认值
    if (this.default !== undefined && this.options.includes(this.default)) {
      this.changeValue(this.default);
    }
  },
  methods: {
    changeValue(val: string) {
      this.$emit('update:modelValue', val);
    },
    handleVisibleChange(visible: boolean) {
      // 点击外部使弹框消失时，触发失焦
      if (!visible) {
        this.isFocused = false;
      }
    },
    handleClickTextField() {
      if (this.disabled) {
        return;
      }
      (this.$refs.input as HTMLInputElement).focus();
    },
    handleInputFocused() {
      this.isFocused = true;
    },
    handleInputBlured() {
      this.isFocused = false;
    },
  },
});
</script>
