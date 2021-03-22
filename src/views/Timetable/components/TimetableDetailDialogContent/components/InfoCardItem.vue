<template>
  <div
    v-if="content"
    class="flex flex-col flex-auto flex-shrink-0"
  >
    <div class="font-bold text-base mb-1 text-gray-800">
      {{ title }}
    </div>
    <div class="text-sm text-gray-500">
      {{ content }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
});
</script>
