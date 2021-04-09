<template>
  <div
    class="flex mb-2 f-clickable py-1 px-2 rounded"
    :class="{ 'bg-primary bg-opacity-30': selectedChannelId === '0' }"
    @click="$router.push(`/forum/channel/0`)"
  >
    <div class="pt-1">
      <f-icon
        name="chat-square-quote"
        size="16"
        class="mr-2"
      />
    </div>
    <div>匿名树洞</div>
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
      class="flex f-clickable py-1 px-2 rounded"
      :class="{
        'bg-primary bg-opacity-30': selectedChannelId === `${channelGroup.id}-${channel.id}`,
      }"
      @click="$router.push(`/forum/channel/${channelGroup.id}-${channel.id}`)"
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
import { defineComponent, watch, ref } from 'vue';
import { mockChannelGroups } from '@/apis/mocks/forum';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();

    const selectedChannelId = ref(route.params.channelId);

    watch(
      () => route.params.channelId,
      () => {
        selectedChannelId.value = route.params.channelId;
      },
    );

    return {
      mockChannelGroups,
      selectedChannelId,
    };
  },
});
</script>
