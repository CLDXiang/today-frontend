<template>
  <div
    class="f-clickable"
    @click="$emit('click-list-ul')"
  >
    <f-icon
      name="list-ul"
      size="24"
    />
  </div>
  {{ channelName }}
  {{ channelDescription }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    channelName: { type: String, required: true },
    channelDescription: { type: String, required: true },
  },
  emits: ['click-list-ul'],
});
</script>
