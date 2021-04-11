<template>
  <teleport to="body">
    <div
      class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-40 flex justify-center items-start"
    >
      <div
        class="relative z-50 top-24 mx-4 bg-white rounded shadow-lg"
        style="min-width: 240px; max-width: 520px"
      >
        <div class="w-full flex justify-between text-base font-medium">
          <span class="flex-auto px-6 py-4 text-gray-800">{{ title }}</span>
          <span class="flex-shrink-0 w-14 h-14 flex justify-center items-center f-clickable">
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
          <f-button>{{ cancelText }}</f-button>
          <f-button type="primary">
            {{ okText }}
          </f-button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
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
  emits: ['update:visible'],
  setup(props) {
    return {};
  },
});
</script>
