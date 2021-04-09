<template>
  <div
    class="p-2 border-b-2 border-gray-100 flex"
    @click="$router.push(`/forum/channel/${post.channelId}/reply/${post.id}`)"
  >
    <img
      v-if="post.creator.avatar"
      class="mr-2 rounded-lg w-8 h-8 border-primary flex-shrink-0"
      :src="post.creator.avatar"
      alt="avatar"
    >
    <div class="flex flex-col items-stretch text-left flex-auto">
      <div class="flex justify-between items-center">
        <span class="font-bold text-gray-700 mr-2">{{ post.creator.nickname }}</span>
        <span class="text-xs text-gray-500">{{ timeDiff }}</span>
      </div>
      <div class="text-sm whitespace-pre-wrap">
        {{ post.content }}
      </div>
      <div class="self-end flex items-center text-xs text-primary mt-1">
        <f-icon
          name="chat"
          size="16"
          class="mr-1"
        />
        <div>
          {{ post.replyCount }} 条回复
        </div>
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
      const res: string = this.post.createdAt.format('MM/DD HH:mm');
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
