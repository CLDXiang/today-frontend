<template>
  <div
    class="p-2 border-b-2 border-gray-100 min-h-28"
    @click="$router.push(`/forum/channel/${post.channelId}/reply/${post.id}`)"
  >
    <div class="flex mb-1">
      <img
        class="mr-2 rounded-full w-8 h-8 border-primary"
        :src="post.creator.avatar"
        alt="avatar"
      >
      <span class="flex flex-col items-start">
        <div class="text-sm font-bold text-gray-700">{{ post.creator.nickname }}</div>
        <div class="text-xs text-gray-500">{{ timeDiff }}</div>
      </span>
      <span class="flex-auto flex justify-end items-center text-gray-500 text-sm">
        <span class="flex">
          <f-icon
            name="hand-thumbs-up"
            size="16"
            class="mr-1"
          />
          <div class="mr-3">
            {{ post.thumbUpCount }}
          </div></span>
        <span class="flex">
          <f-icon
            name="chat"
            size="16"
            class="mr-1"
          />
          <div class="mr-3">
            {{ post.replyCount }}
          </div>
        </span>
      </span>
    </div>
    <div class="text-left">
      <div
        v-if="post.title"
        class="font-bold text-base"
      >
        {{ post.title }}
      </div>
      <div class="line-limit overflow-hidden text-sm whitespace-pre-wrap">
        {{ post.content }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { FIcon } from '@/components/common';
import { Post } from '../types';

export default defineComponent({
  components: {
    FIcon,
  },
  props: {
    post: { type: Object as PropType<Post>, default: {} },
  },
  computed: {
    timeDiff() {
      const res: string = this.post.createdAt.fromNow();
      return res;
    },
  },
  methods: {
    getReplyCountColor(count: number) {
      if (count < 10) {
        return 'text-gray-500';
      }
      return 'text-red-500';
    },
  },
});
</script>

<style scoped>
.line-limit {
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
