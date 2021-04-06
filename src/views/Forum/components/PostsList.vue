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
import { defineComponent, PropType } from 'vue';
import { PostCard } from './index';
import { Post } from '../types';

export default defineComponent({
  components: {
    PostCard,
  },
  props: {
    posts: { type: Array as PropType<Post[]>, default: [] },
  },
  setup() {
    return {
    };
  },
});
</script>
