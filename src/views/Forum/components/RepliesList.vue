<template>
  <div class="overflow-y-auto sm:mx-auto">
    <div class="h-8 mt-2 hover:text-primary f-clickable">
      <f-icon
        name="back"
        :width="14"
        :height="14"
        @click="routerBack('/forum')"
      />
    </div>

    <reply-card
      v-for="reply in replies"
      :key="reply.id"
      :reply="reply"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mockReplies } from '@/apis/mocks/replies';
import { useRouterBack } from '@/composables/useRouterBack';
import ReplyCard from './ReplyCard.vue';

export default defineComponent({
  components: {
    ReplyCard,
  },
  props: {
    postId: { type: String, default: '1' },
  },
  setup() {
    // TODO: api: 根据 postId 获取所有回复
    const replies = mockReplies.slice(1);
    const post = mockReplies[0];
    // TODO: root post 显示不一样的样式
    return {
      replies,
      post,
      routerBack: useRouterBack(),
    };
  },
});
</script>
