<template>
  <div class="flex flex-col h-full">
    <forum-head-bar
      :channel-name="channel.name"
      :channel-description="channel.description"
      @click-list-ul="isChannelsVisible = true"
    />
    <a-drawer
      height="90%"
      placement="left"
      :closable="false"
      :visible="isChannelsVisible"
      @close="isChannelsVisible = false"
    >
      <forum-channels-list
        class="bg-gray-200"
      />
    </a-drawer>
    <router-view />
    <posts-list
      v-if="$router.currentRoute._rawValue.matched.length === 1"
      :posts="mockPosts"
    />
  <!-- rich text editor -->
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mockPosts } from '@/apis/mocks/posts';
import { ForumHeadBar, ForumChannelsList, PostsList } from './components';

export default defineComponent({
  components: {
    ForumHeadBar,
    ForumChannelsList,
    PostsList,
  },
  props: {
    channelId: { type: Number, default: 1 },
  },
  setup() {
    const isChannelsVisible = ref(false);
    // TODO: api: 根据 channelId (props) 获取 posts
    // TODO: api: 根据 channelId (props) 获取 channel 信息

    const channel = {
      name: 'general',
      description: 'this is a channel',
    };

    return {
      isChannelsVisible,
      mockPosts, // FIXME: 接入 api 后替换
      channel, // FIXME: 接入 api 后替换
    };
  },
});
</script>
