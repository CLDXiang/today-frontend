<template>
  <div
    class="f-tabs__pane"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  props: {
    /** key */
    tab: { type: String, required: true },
    /** 标签名 */
    name: { type: String, default: undefined },
  },
});
</script>
