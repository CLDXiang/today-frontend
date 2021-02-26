<template>
  <div class="text-gray-500 py-2 border-b border-gray-300">
    <div class="flex justify-between">
      <span>{{ version }}</span>
      <span>{{ date }}</span>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    /** 版本号 */
    version: { type: String, required: true },
    /** 时间 */
    date: { type: String, required: true },
  },
});
</script>
