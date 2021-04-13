<template>
  <teleport to="body">
    <div
      class="w-0 h-0 fixed top-0 left-0 overflow-visible"
    >
      <modal-content-wrapper
        v-bind="$props"
        @update:visible="(v) => $emit('update:visible', v)"
        @cancel="() => $emit('cancel')"
        @ok="() => $emit('ok')"
      />
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ModalContentWrapper } from './components';

export default defineComponent({
  components: {
    ModalContentWrapper,
  },
  props: {
    /** 是否可见（v-model） */
    visible: { type: Boolean, required: false },
    /** 是否显示右上关闭按钮 */
    closable: { type: Boolean, default: true },
    /** 标题 */
    title: { type: String, default: '标题' },
    /** 确认按钮文字 */
    okText: { type: String, default: '确定' },
    /** 取消按钮文字 */
    cancelText: { type: String, default: '取消' },
    /** 是否显示遮罩 */
    mask: { type: Boolean, default: true },
    /** 点击遮罩是否允许关闭 */
    maskClosable: { type: Boolean, default: true },
  },
  emits: [
    /** v-model */
    'update:visible',
    /** 点击取消 */
    'cancel',
    /** 点击确定 */
    'ok',
  ],
});
</script>
