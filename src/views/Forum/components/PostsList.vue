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
import {
  defineComponent, watch, ref,
} from 'vue';
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
    const posts = ref<Post[]>([]);

    switch (props.channelId) {
      case '0':
        posts.value = mockPostsSecret.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)); break;
      case '1-2':
        posts.value = mockPostsChat.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)); break;
      case '3-4':
        posts.value = mockPostsWork.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)); break;
      default:
        posts.value = [];
    }

    watch(() => props.channelId, () => {
      switch (props.channelId) {
        case '0':
          posts.value = mockPostsSecret.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)); break;
        case '1-2':
          posts.value = mockPostsChat.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)); break;
        case '3-4':
          posts.value = mockPostsWork.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)); break;
        default:
          posts.value = [];
      }
    });

    return {
      posts,
    };
  },
});
</script>
