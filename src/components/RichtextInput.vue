<template>
  <div class="border-2 bg-white">
    <textarea
      v-model="content"
      class="block w-full px-2 py-1 text-left resize-none"
      placeholder="说点什么"
      maxlength="5000"
    />
    <div class="flex justify-between h-8 py-2 bg-gray-50">
      <div class="flex">
        <f-icon
          name="type-bold"
          class="ml-1 mr-2 f-clickable"
          size="18"
        />
        <f-icon
          name="type-italic"
          class="mr-2 f-clickable"
          size="18"
        />
        <f-icon
          name="strikethrough"
          class="mr-2 f-clickable"
          size="18"
        />
        <f-icon
          name="code-slash"
          class="mr-2 f-clickable"
          size="18"
        />
        <f-icon
          name="link-45deg"
          class="mr-2 f-clickable"
          size="18"
        />
        <f-icon
          name="list-ol"
          class="mr-2 f-clickable"
          size="18"
        />
        <f-icon
          name="list-ul"
          class="mr-2 f-clickable"
          size="18"
        />
        <f-icon
          name="emoji-smile"
          class="mr-2 f-clickable"
          size="18"
        />
        <f-icon
          name="paperclip"
          class="mr-2 f-clickable"
          size="18"
        />
      </div>
      <f-icon
        name="paper-plane"
        class="mr-2 f-clickable"
        size="18"
        @click="$emit('send', content)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  emits: ['send'],
  setup() {
    const content = ref('');

    return {
      content,
    };
  },
});
</script>
