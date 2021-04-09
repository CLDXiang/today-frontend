<template>
  <div class="overflow-y-auto sm:mx-auto">
    <post-card
      v-for="post in posts[channelId - 1]"
      :key="post.id"
      :post="post"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { mockPosts, mockPosts2, mockPosts3 } from '@/apis/mocks/posts';
import { PostCard } from './index';
import { Post } from '../types';

export default defineComponent({
  components: {
    PostCard,
  },
  props: {
    channelId: { type: String, default: '1' },
  },
  setup(props) {
    const posts = [];
    posts.push(mockPosts);
    posts.push(mockPosts2);
    posts.push(mockPosts3);
    return {
      posts,
    };
  },
});
</script>
