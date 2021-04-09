<template>
  <div class="overflow-y-auto sm:mx-auto">
    <post-card
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { mockPostsChat, mockPostsSecret, mockPostsWork } from '@/apis/mocks/posts';
import { PostCard } from './index';
import { Post } from '../types';

export default defineComponent({
  components: {
    PostCard,
  },
  props: {
    channelId: { type: String, default: '1-1' },
  },
  setup(props) {
    const posts = computed<Post[]>(() => {
      switch (props.channelId) {
        case '0':
          return mockPostsSecret;
        case '1-2':
          return mockPostsChat;
        case '3-4':
          return mockPostsWork;
        default:
          return [];
      }
    });

    return {
      posts,
    };
  },
});
</script>
