<template>
  <div
    class="h-14 flex items-center flex-shrink-0"
  >
    <div>
      <f-icon
        name="list-ul"
        size="24"
        class="ml-4 mr-2 f-clickable"
        @click="$emit('click-list-ul')"
      />
    </div>
    <div class="flex-auto flex flex-col items-start ml-1">
      <div class="text-lg font-bold">
        {{ channelName }}
      </div>
      <div class="text-xs text-gray-500">
        {{ channelDescription }}
      </div>
    </div>
    <div
      v-if="isBackVisible"
      class="flex-auto flex justify-end mr-2"
    >
      <a-button
        size="small"
        type="link"
        @click="$router.back()"
      >
        返回上页
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import {
  defineComponent, onMounted, ref, watch,
} from 'vue';

export default defineComponent({
  props: {
    channelName: { type: String, required: true },
    channelDescription: { type: String, required: true },
  },
  emits: ['click-list-ul'],
  setup() {
    const route = useRoute();
    const isBackVisible = ref(false);

    const handleRoute = () => {
      if (route.path.includes('/reply/')) {
        isBackVisible.value = true;
      } else {
        isBackVisible.value = false;
      }
    };

    onMounted(() => {
      handleRoute();
    });

    watch(() => route.path, () => {
      handleRoute();
    });

    return {
      isBackVisible,
    };
  },
});
</script>
