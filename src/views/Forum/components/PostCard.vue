<template>
  <div class="mb-2 grid grid-cols-7 gap-1">
    <div>
      <img
        class="rounded-full w-9 h-9 border-primary"
        :src="post.creator.avatar"
        alt="avatar"
      >
    </div>
    <div class="col-span-5">
      {{ post.content }}
    </div>
    <div> arsoint</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Post } from '../types';

export default defineComponent({
  props: {
    post: { type: Object as PropType<Post>, default: {} },
  },
});
</script>
