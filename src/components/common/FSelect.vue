<template>
  <div
    class="f-select"
    :class="{ 'f-select--focus': isFocused, 'f-select--disable': disabled }"
  >
    <a-dropdown
      :disabled="disabled"
      :trigger="['click']"
      @visibleChange="handleVisibleChange"
    >
      <div
        class="f-select__container"
        @click="handleClickTextField"
      >
        <div class="f-select__text-field">
          <span
            v-if="label !== undefined"
            class="f-select__label"
            :class="{ 'f-select__label--floating': shouldLabelFloating }"
          >
            {{ label }}
          </span>

          <input
            ref="input"
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
        <div class="f-select__option-bar">
          <div class="f-select__option-list">
            <div
              v-for="option in options"
              :key="option"
              class="f-select__option"
              :class="{ 'f-select__option--selected': option === modelValue }"
              @click="changeValue(option)"
            >
              {{ option }}
            </div>
          </div>
        </div>
      </template>
    </a-dropdown>

    <div class="f-select__details">
      <transition name="hint">
        <span
          v-show="isHintVisible"
          class="f-select__hint"
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

<style lang="scss">
$gray: #00000061;
$black: #000000de;

$height: 40px;

.f-select__container {
  box-sizing: border-box;
    cursor: pointer;
    border-radius: 4px;
    color: $gray;
    border: solid 1px currentColor;
    padding: 1px 9px;
    margin-bottom: 4px;
    font-size: 16px;
    line-height: 20px;
    height: $height;
    transition: 0.3s color, border-width cubic-bezier(0.25, 0.8, 0.25, 1);

  > .f-select__text-field {
    height: 100%;

    position: relative;

    display: flex;
    align-items: center;

    &:hover {
      color: $black;
    }

    > .f-select__label {
      color: $gray;
      transition: 0.3s all cubic-bezier(0.25, 0.8, 0.5, 1);
      position: absolute;
      left: 0;

      transform-origin: top left;
      padding: 0 4px;

      &.f-select__label--floating {
        transform: translateY(-$height/2 + 4px) scale(.75);
        background-color: #fff;
      }
    }

    input {
      border: none;
      outline: none;
      color: $black;
      cursor: pointer;
      width: 100%;
    }
  }
}

// focus 态
.f-select--focus {
  .f-select__container {
    color: $primary-color;
    border: solid 2px currentColor;
    padding: 0 8px;
    > .f-select__text-field {

    > .f-select__label {
      color: $primary-color;
    }
  }}
}

// disable 态
.f-select.f-select--disable .f-select__container {
  cursor: not-allowed;
  > .f-select__text-field input {
    cursor: not-allowed;
  }
}

.f-select__details {
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

.f-select__option-bar {
  border-radius: 4px;
  box-shadow: 0 5px 5px -3px rgba(0,0,0,.2),
              0 8px 10px 1px rgba(0,0,0,.14),
              0 3px 14px 2px rgba(0,0,0,.12);
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 60vh;

  > .f-select__option-list {
    background-color: #fff;
    padding: 8px 0;

    > .f-select__option {
      min-height: 40px;
      cursor: pointer;
      user-select: none;

      display: flex;
      align-items: center;
      flex: 1 1 100%;
      padding: 0 16px;

      &.f-select__option--selected {
        color: $primary-color;
        background-color: rgba($primary-color, 0.1);
      }

      &:hover:not(.f-select__option--selected) {
        background-color: rgba(#000, 0.05);
      }
    }
  }
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
