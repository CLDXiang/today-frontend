<template>
  <div
    v-if="['3-4', '0'].includes(channelId)"
    class="overflow-y-auto sm:mx-auto"
  >
    <post-card
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
    <div
      :class="[
        'fixed bottom-20 right-5 w-12 h-12 z-20',
        'flex justify-center items-center bg-primary text-white rounded-full',
      ]"
    >
      <f-icon
        name="plus"
        size="24"
      />
    </div>
  </div>
  <div
    v-else
    class="overflow-y-auto sm:mx-auto"
  >
    <post-card
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
    <!-- TODO: rich text input box -->
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, ref } from 'vue';
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
        posts.value = mockPostsSecret.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        break;
      case '1-2':
        posts.value = mockPostsChat.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        break;
      case '3-4':
        posts.value = mockPostsWork.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        break;
      default:
        posts.value = [];
    }

    watch(
      () => props.channelId,
      () => {
        switch (props.channelId) {
          case '0':
            posts.value = mockPostsSecret.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
            break;
          case '1-2':
            posts.value = mockPostsChat.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
            break;
          case '3-4':
            posts.value = mockPostsWork.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
            break;
          default:
            posts.value = [];
        }
      },
    );

    return {
      posts,
    };
  },
});
</script>
