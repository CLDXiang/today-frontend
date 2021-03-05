<template>
  <div v-if="items.length">
    <h3>{{ title }}</h3>
    <ul class="pl-3">
      <li
        v-for="item in items"
        :key="item"
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

<style lang="postcss" scoped>
h3 {
  @apply text-left font-semibold mt-1;
}

ul > li {
  @apply text-left;
}

ul > li::marker {
  content: '- ';
}
</style>
