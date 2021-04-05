<template>
  FORUM
  <forum-head-bar
    channel-name="general"
    channel-description="this is a channel"
    @click-list-ul="isChannelsVisible = true"
  />
  <a-drawer
    height="90%"
    placement="left"
    :closable="false"
    :visible="isChannelsVisible"
    @close="isChannelsVisible = false"
  >
    <forum-channels-list class="bg-gray-200" />
  </a-drawer>
  <posts-list />
  <!-- rich text editor -->
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ForumHeadBar, ForumChannelsList, PostsList } from './components';

export default defineComponent({
  components: {
    ForumHeadBar,
    ForumChannelsList,
    PostsList,
  },
  setup() {
    const isChannelsVisible = ref(true);
    return {
      isChannelsVisible,
    };
  },
});
</script>

<style lang="scss">
.ant-drawer-wrapper-body {
  @apply bg-gray-200;
}
</style>
