<template>
  <post-card
    v-for="post in mockPosts"
    :key="post.id"
    :post="post"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mockPosts } from '@/apis/mocks/posts';
import { PostCard } from './index';

export default defineComponent({
  components: {
    PostCard,
  },
  props: {
    channelId: { type: Number, required: true },
  },
  setup() {
    return {
      mockPosts,
    };
  },
});
</script>
