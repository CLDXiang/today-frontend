<template>
  <div
    class="h-14 flex items-center flex-shrink-0"
  >
    <div>
      <f-icon
        name="list-ul"
        size="24"
        class="ml-4 mr-2 f-clickable"
        @click="$emit('click-list-ul')"
      />
    </div>
    <div class="flex-auto flex flex-col items-start ml-1">
      <div class="text-lg font-bold">
        {{ channelName }}
      </div>
      <div class="text-xs text-gray-500">
        {{ channelDescription }}
      </div>
    </div>
  </div>
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
