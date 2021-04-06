<template>
  <div class="flex mb-4 f-clickable">
    <div class="pt-1">
      <f-icon
        name="chat-square-quote"
        size="16"
        class="mr-2"
      />
    </div>
    <div>树洞</div>
  </div>
  <div
    v-for="channelGroup in mockChannelGroups"
    :key="channelGroup.id"
    class="mb-4"
  >
    <div class="flex mb-1">
      <div class="pt-1 mr-2">
        <f-icon
          name="drop-down"
          size="16"
        />
      </div>
      {{ channelGroup.name }}
    </div>
    <div
      v-for="channel in channelGroup.channels"
      :key="channel.id"
      class="flex h-8 pt-1 focus:bg-gray-400 f-clickable"
      @click="$router.push({ path: `/forum/channel/${channel.id}`, params: { id: channel.id } });"
    >
      <div class="pt-1 mr-2">
        <f-icon
          name="number-sign"
          size="16"
        />
      </div>
      {{ channel.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FIcon } from '@/components/common';
import { mockChannelGroups } from '@/apis/mocks/forum';
// TODO: 接入后端 api 拉取 channels

export default defineComponent({
  components: {
    FIcon,
  },
  props: {
  },
  setup() {
    return {
      mockChannelGroups,
    };
  },
});
</script>

<style scoped>
.f-clickable {
  @apply hover:bg-gray-400;
}
</style>
