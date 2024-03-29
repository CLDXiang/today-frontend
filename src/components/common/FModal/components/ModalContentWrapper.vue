<template>
  <transition
    enter-active-class="transition-all ease-out transform duration-250"
    enter-from-class="opacity-0"
    leave-active-class="transition-all ease-out transform duration-250"
    leave-to-class="opacity-0"
  >
    <div
      v-show="mask && isVisible"
      class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-start"
      style="z-index: 1000"
      @click="handleClickMask"
    />
  </transition>
  <transition
    enter-active-class="transition ease-out duration-150 transform"
    enter-from-class="opacity-0 scale-50"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition ease-in duration-100 transform"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-50"
  >
    <div
      v-show="isVisible"
      class="fixed top-0 left-0 w-full h-0 flex justify-center items-start"
      style="z-index: 1010"
    >
      <div
        class="relative top-24 mx-4 bg-white rounded shadow-xl"
        style="min-width: 240px; max-width: 520px"
      >
        <div
          v-if="title || closable"
          class="w-full flex justify-between text-base font-medium"
        >
          <span class="flex-auto px-6 py-4 text-gray-800">{{ title }}</span>
          <span
            v-if="closable"
            class="flex-shrink-0 w-14 h-14 flex justify-center items-center f-clickable"
            @click="handleCancel"
          >
            <f-icon
              name="close"
              size="16"
            />
          </span>
        </div>
        <div class="w-full p-6 text-sm text-gray-600">
          <slot />
        </div>
        <div class="w-full px-4 py-2.5 flex justify-end space-x-2">
          <f-button
            :type="cancelType"
            @click="handleCancel"
          >
            {{ cancelText }}
          </f-button>
          <f-button
            :type="okType"
            @click="handleOk"
          >
            {{ okText }}
          </f-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  defineComponent, ref, watch,
} from 'vue';
import { FButton, FIcon } from '../..';
import { ModalProps } from '../props';

export default defineComponent({
  components: {
    FButton,
    FIcon,
  },
  props: ModalProps,
  emits: [
    /** v-model */
    'update:visible',
    /** 点击取消 */
    'cancel',
    /** 点击确定 */
    'ok',
  ],
  setup(props, ctx) {
    /** 是否可见 */
    const isVisible = ref(props.visible ?? false);
    const setIsVisible = (value: boolean) => {
      if (value === isVisible.value) {
        return;
      }
      isVisible.value = value;
      ctx.emit('update:visible', value);
    };

    watch(
      () => props.visible,
      () => {
        isVisible.value = props.visible;
      },
    );

    /** “取消”按钮回调 */
    const handleCancel = () => {
      ctx.emit('cancel');
      setIsVisible(false);
    };

    /** “确定”按钮回调 */
    const handleOk = () => {
      ctx.emit('ok');
      setIsVisible(false);
    };

    /** 点击遮罩回调 */
    const handleClickMask = () => {
      if (props.maskClosable) {
        handleCancel();
      }
    };

    return {
      isVisible,
      setIsVisible,
      handleCancel,
      handleOk,
      handleClickMask,
    };
  },
});
</script>
