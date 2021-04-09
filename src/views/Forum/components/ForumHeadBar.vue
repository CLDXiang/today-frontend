<template>
  <div
    class="h-12 pb-8 mt-4 border-b-2"
  >
    <div class="flex">
      <div class="mt-1">
        <f-icon
          name="list-ul"
          size="24"
          class="ml-4 mr-2 f-clickable"
          @click="$emit('click-list-ul')"
        />
      </div>
      <div class="pt-1 ml-20 mr-2">
        <f-icon
          name="number-sign"
          size="24"
        />
      </div>
      <div class="pb-4 mr-2 text-lg font-bold">
        {{ channelName }}
      </div>
      <div class="pt-1 text-base">
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
