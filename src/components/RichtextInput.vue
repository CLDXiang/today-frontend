<template>
  <div class="border-2">
    <span
      ref="text"
      role="textbox"
      contenteditable
      class="block w-full px-2 py-1 text-left"
    />
    <div class="flex justify-between h-8 py-2 bg-gray-50">
      <div class="flex">
        <f-icon
          name="type-bold"
          class="ml-1 mr-2 f-clickable"
          size="16"
        />
        <f-icon
          name="type-italic"
          class="mr-2 f-clickable"
          size="16"
        />
        <f-icon
          name="strikethrough"
          class="mr-2 f-clickable"
          size="16"
        />
        <f-icon
          name="code-slash"
          class="mr-2 f-clickable"
          size="16"
        />
        <f-icon
          name="link-45deg"
          class="mr-2 f-clickable"
          size="16"
        />
        <f-icon
          name="list-ol"
          class="mr-2 f-clickable"
          size="16"
        />
        <f-icon
          name="list-ul"
          class="mr-2 f-clickable"
          size="16"
        />
        <f-icon
          name="emoji-smile"
          class="mr-2 f-clickable"
          size="16"
        />
        <f-icon
          name="paperclip"
          class="mr-2 f-clickable"
          size="16"
        />
      </div>
      <f-icon
        name="paper-plane"
        class="mr-2 f-clickable"
        size="16"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
});
</script>
