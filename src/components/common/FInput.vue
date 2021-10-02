<template>
  <div class="f-input">
    <div
      class="box-border cursor-text rounded text-gray-400 border-current py-1 px-2 mb-1 text-base h-10 transition-colors"
      :class="{
        'border': !isFocused,
        'text-primary border-2': isFocused,
        'border-red-500': !obeyRules,
        'cursor-not-allowed': disabled,
      }"
      @click="handleClickTextField"
    >
      <div class="h-full relative flex items-center cursor-text hover:text-gray-700">
        <span
          v-if="label !== undefined"
          class="text-gray-400 transition-all absolute left-0 origin-top-left py-0 px-1 transform bg-white"
          :class="{
            '-translate-y-4 scale-75': shouldLabelFloating,
            'text-primary': isFocused,
          }"
        >
          {{ label }}
        </span>
        <input
          ref="input"
          class="border-none outline-none text-gray-700 w-full"
          :class="{ 'text-red-500': !obeyRules, 'cursor-not-allowed': disabled }"
          :value="modelValue"
          :type="type"
          :autofocus="autofocus"
          :disabled="disabled"
          :placeholder="placeholder"
          @input="handleChangeValue"
          @focus="handleInputFocused"
          @blur="handleInputBlured"
        >
        <span
          v-if="suffix !== undefined"
          class="text-gray-700"
        >
          {{ suffix }}
        </span>
      </div>
    </div>
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
          v-show="isHintVisible || !obeyRules"
          :class="{ 'text-red-500': !obeyRules }"
        >
          {{ obeyRules ? hint : warningMessage }}
        </span>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
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
    /** 后缀 */
    suffix: { type: String, default: undefined },
    /** input 类型 */
    type: { type: String as PropType<'text' | 'password'>, default: 'text' },
    /** 输入的条件判断 */
    rules: { type: Array as PropType<((value: string) => boolean | string)[]>, default: undefined },
    /** 占位文本 */
    placeholder: { type: String, default: undefined },
    modelValue: { type: String, default: '' },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isFocused: false,
      showPassword: false,
      obeyRules: true,
      warningMessage: '',
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
  watch: {
    modelValue() {
      this.validate();
    },
  },
  methods: {
    handleChangeValue(event: InputEvent) {
      const val = (event.target as HTMLInputElement)?.value || '';
      this.$emit('update:modelValue', val);
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
      this.validate();
    },
    validate() {
      let allObeyed = true;
      if (this.rules !== undefined) {
        this.rules.forEach((rule: (value: string) => string | boolean) => {
          const ruleResult = rule(this.modelValue);
          if (typeof ruleResult === 'string') {
            this.obeyRules = false;
            this.warningMessage = ruleResult;
            allObeyed = false;
          }
        });
        if (allObeyed) {
          this.obeyRules = true;
        }
      }
    },
  },
});
</script>
