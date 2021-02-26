<template>
  <section class="m-4 text-gray-700">
    <h1 class="text-lg font-semibold text-gray-500 my-4">
      {{ title }}
    </h1>
    <slot />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    /** 标题 */
    title: { type: String, default: '' },
  },
});
</script>
