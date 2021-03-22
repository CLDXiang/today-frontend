<template>
  <span class="flex flex-col items-center">
    <div class="font-bold text-lg text-gray-800">{{ title }}</div>
    <div class="text-sm text-gray-600"><slot /></div>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: { type: String, required: true },
  },
});
</script>
