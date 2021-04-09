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
    ref="scrollBottom"
    class="overflow-y-auto"
  >
    <thread-card
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
    <!-- TODO: rich text input box -->
  </div>
</template>
<script lang="ts">
import {
  defineComponent, watch, ref, onMounted,
} from 'vue';
import { mockPostsChat, mockPostsSecret, mockPostsWork } from '@/apis/mocks/posts';
import dayjs from 'dayjs';
import { PostCard, ThreadCard } from './index';
import { Post } from '../types';

export default defineComponent({
  components: {
    PostCard,
    ThreadCard,
  },
  props: {
    channelId: { type: String, default: '1-1' },
  },
  setup(props) {
    const posts = ref<Post[]>([]);
    const scrollBottomRef = ref<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
      setTimeout(() => {
        if (!scrollBottomRef.value) {
          return;
        }
        scrollBottomRef.value.scrollTop = scrollBottomRef.value.scrollHeight;
      }, 0);
    };

    onMounted(() => {
      switch (props.channelId) {
        case '0':
          posts.value = mockPostsSecret.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
          break;
        case '1-2':
          posts.value = mockPostsChat.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
          break;
        case '3-4':
          posts.value = mockPostsWork.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
          break;
        default:
          posts.value = [];
      }
      scrollToBottom();

      if (props.channelId === '1-2') {
        // 模拟 5 秒后有其他人发了消息
        setTimeout(() => {
          posts.value = [...posts.value, {
            id: 999,
            content: '萌新报道！一条测试消息~',
            replyCount: 0,
            createdAt: dayjs(),
            creator: {
              id: '5',
              nickname: '许丽雅',
              avatar: 'https://picsum.photos/seed/xly/40/40',
            },
          }];
          scrollToBottom();
        }, 5000);

        // 模拟 12 秒后有其他人发了消息
        setTimeout(() => {
          posts.value = [...posts.value, {
            id: 999,
            content: '我也来凑个热闹 hhh',
            replyCount: 0,
            createdAt: dayjs(),
            creator: {
              id: '6',
              nickname: '张华齐',
              avatar: 'https://picsum.photos/seed/zhq/40/40',
            },
          }];
          scrollToBottom();
        }, 12000);
      }
    });

    watch(
      () => props.channelId,
      () => {
        switch (props.channelId) {
          case '0':
            posts.value = mockPostsSecret.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
            break;
          case '1-2':
            posts.value = mockPostsChat.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
            break;
          case '3-4':
            posts.value = mockPostsWork.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
            break;
          default:
            posts.value = [];
        }
        scrollToBottom();
      },
    );

    return {
      posts,
      scrollBottom: scrollBottomRef,
    };
  },
});
</script>
