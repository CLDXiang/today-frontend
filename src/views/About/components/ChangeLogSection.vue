<template>
  <div v-if="items.length">
    <h3 class="text-left font-semibold mt-1">
      {{ title }}
    </h3>
    <ul class="pl-3">
      <li
        v-for="item in items"
        :key="item"
        class="text-left"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    title: { type: String, required: true },
    items: { type: Array as PropType<string[]>, required: true },
  },
});
</script>

<style scoped>
li::marker {
  content: '- ';
}
</style>
