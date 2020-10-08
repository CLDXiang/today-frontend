<template>
  <div
    class="f-input"
    :class="{ 'f-input--focus': isFocused, 'f-input--disable': disabled }"
  >
    <div
      class="f-input__container"
      @click="handleClickTextField"
    >
      <div class="f-input__text-field">
        <span
          v-if="label !== undefined"
          class="f-input__label"
          :class="{ 'f-input__label--floating': shouldLabelFloating }"
        >
          {{ label }}
        </span>
        <input
          ref="input"
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
          class="f-input__suffix"
        >
          {{ suffix }}
        </span>
      </div>
    </div>
    <div class="f-input__details">
      <transition name="hint">
        <span
          v-show="isHintVisible"
          class="f-input__hint"
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
    /** 占位文本 */
    placeholder: { type: String, default: undefined },
    modelValue: { type: String, default: undefined },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isFocused: false,
      showPassword: false,
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
    },
  },
});
</script>

<style lang="scss">
$gray: #00000061;
$black: #000000de;

$height: 40px;

.f-input__container {
  box-sizing: border-box;
  cursor: text;
  border-radius: 4px;
  color: $gray;
  border: solid 1px currentColor;
  padding: 1px 9px;
  margin-bottom: 4px;
  font-size: 16px;
  line-height: 20px;
  height: $height;
  transition: 0.3s color, border-width cubic-bezier(0.25, 0.8, 0.25, 1);

  > .f-input__text-field {
    height: 100%;

    position: relative;

    display: flex;
    align-items: center;

    cursor: text;

    &:hover {
      color: $black;
    }

    > .f-input__label {
      color: $gray;
      transition: 0.3s all cubic-bezier(0.25, 0.8, 0.5, 1);
      position: absolute;
      left: 0;

      transform-origin: top left;
      padding: 0 4px;

      &.f-input__label--floating {
        transform: translateY(-$height/2 + 4px) scale(0.75);
        background-color: #fff;
      }
    }

    > input {
      border: none;
      outline: none;
      color: $black;
      width: 100%;
    }

    > .f-input__suffix{
      color: $black;
    }
  }
}

// focus 态
.f-input--focus {
  > .f-input__container {
    color: $primary-color;
    border: solid 2px currentColor;
    padding: 0 8px;
    > .f-input__text-field {
      > .f-input__label {
        color: $primary-color;
      }
    }
  }
}

// disable 态
.f-input.f-input--disable > .f-input__container {
  cursor: not-allowed;
  > .f-input__text-field > input {
    cursor: not-allowed;
  }
}

.f-input__details {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 12px;
  height: 14px;

  line-height: 12px;
  font-size: 12px;
  word-break: break-word;
  word-wrap: break-word;

  hyphens: auto;
  color: #0009;
}

.hint-enter-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.hint-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.hint-enter-from,
.hint-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}
</style>
