<template>
  <div
    :class="['px-2 mb-2 border-b-2 border-gray-100 pb-4',
             ' min-h-28 sm:w-160']"
  >
    <div class="flex pt-3 mb-1">
      <img
        class="mr-2 rounded-full w-7 h-7 border-primary"
        :src="post.creator.avatar"
        alt="avatar"
      >
      <div class="pt-1 mr-2">
        {{ post.creator.nickname }}
      </div>
      <div class="pt-1 mr-2">
        &middot;
      </div>
      <div class="pt-1">
        {{ timeDiff }}
      </div>
      <div class="flex justify-end flex-grow">
        <f-icon
          name="three-dots"
          size="23"
          class="pt-2 f-clickable"
        />
      </div>
    </div>
    <div class="grid grid-cols-8">
      <div
        class="text-left col-span-7"
        @click="$router.push(`/forum/channel/${post.channelId}/reply/${post.id}`)"
      >
        <div class="text-lg font-bold h-9">
          {{ post.title }}
        </div>
        <div>
          {{ post.content }}
        </div>
      </div>
      <div
        class="pt-1 text-lg pl-14"
        :class="getReplyCountColor(post.replyCount)"
      >
        {{ post.replyCount }}
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
