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
import { ModalProps } from './types';

export default defineComponent({
  components: {
    ModalContentWrapper,
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
});
</script>
