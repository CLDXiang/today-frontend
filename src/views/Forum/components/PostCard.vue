<template>
  <div
    :class="['px-2 pt-2 mb-2 border-b-2 border-gray-100',
             'grid grid-cols-7 gap-1 min-h-28 f-clickable sm:w-160']"
    @click="$router.push(`/forum/channel/${post.channelId}/reply/${post.id}`)"
  >
    <div>
      <img
        class="rounded-full w-9 h-9 border-primary"
        :src="post.creator.avatar"
        alt="avatar"
      >
    </div>
    <div class="text-left col-span-5">
      <div class="text-lg font-bold h-9">
        {{ post.title }}
      </div>
      <div>
        {{ post.content }}
      </div>
    </div>
    <div> {{ timeDiff }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Post } from '../types';

export default defineComponent({
  props: {
    post: { type: Object as PropType<Post>, default: {} },
  },
  computed: {
    timeDiff() {
      const res: string = this.post.createdAt.fromNow();
      return res;
    },
  },
});
</script>
