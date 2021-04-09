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
import { defineComponent } from 'vue';
import { mockPosts, mockPosts2, mockPosts3 } from '@/apis/mocks/posts';
import { PostCard } from './index';

export default defineComponent({
  components: {
    PostCard,
  },
  props: {
    channelId: { type: String, default: '1' },
  },
  setup() {
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
