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
      <forum-channels-list />
    </a-drawer>
    <router-view />
    <!-- rich text editor -->
  </div>
</template>
<script lang="ts">
import { useRoute } from 'vue-router';
import {
  computed, defineComponent, ref, watch,
} from 'vue';
import { mockChannelGroups } from '@/apis/mocks/forum';
import { ForumHeadBar, ForumChannelsList } from './components';

export default defineComponent({
  components: {
    ForumHeadBar,
    ForumChannelsList,
  },
  props: {
    channelId: { type: Number, default: 1 },
  },
  setup() {
    const isChannelsVisible = ref(false);

    const route = useRoute();

    const channel = computed(() => {
      if (route.params.channelId === '0' || !route.params.channelId) {
        return {
          name: '匿名树洞',
          description: '说点悄悄话',
        };
      }
      const [channelGroupId, channelId] = (route.params.channelId as string).split('-');
      const channelInfo = mockChannelGroups.find(
        (cg) => cg.id === parseInt(channelGroupId, 10),
      )?.channels.find((c) => c.id === parseInt(channelId, 10));
      return {
        name: channelInfo?.name || '',
        description: channelInfo?.description || '',
      };
    });

    watch(channel, () => {
      // 切路由时关闭抽屉
      isChannelsVisible.value = false;
    });

    return {
      isChannelsVisible,
      channel,
    };
  },
});
</script>
