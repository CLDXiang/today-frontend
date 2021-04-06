<template>
  <div
    :class="['px-2 pt-2 mb-2 border-b-2 border-gray-100',
             'grid grid-cols-7 gap-1 min-h-28 f-clickable sm:w-160']"
  >
    <div>
      <img
        class="rounded-full w-9 h-9 border-primary"
        :src="reply.creator.avatar"
        alt="avatar"
      >
    </div>
    <div class="text-left col-span-5">
      {{ reply.content }}
    </div>
    <div> {{ timeDiff }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Post } from '../types';

// 现在和 PostCard 长得像，但是接入 api 后交互会比较不同

export default defineComponent({
  props: {
    reply: { type: Object as PropType<Post>, default: {} },
  },
  computed: {
    timeDiff() {
      const res: string = this.reply.createdAt.fromNow();
      return res;
    },
  },
});
</script>
