<template>
  <span
    class="overflow-y-hidden flex-grow-0 flex-shrink-0"
    style="scroll-snap-align: start; flex-basis: 100%;"
  >
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    /** key */
    tab: { type: String, required: true },
    /** 标签名 */
    name: { type: String, default: undefined },
  },
});
</script>
