<template>
  <div class="py-2.5 px-3 rounded-lg shadow-lg bg-white mb-2">
    <div class="flex mt-1 mb-2">
      <div
        class="flex-shrink-0 w-10"
      >
        <img
          :src="processAvatar(user.avatar)"
          class="w-10 h-10 rounded-full"
        >
      </div>
      <div class="flex-grow ml-2">
        <div class="flex justify-between">
          <span
            class="font-extrabold text-primary"
          >
            {{ user.nickname }}
          </span>
          <span class="text-xs text-gray-400">
            3 个月前
          </span>
        </div>
        <div
          :class="['pt-2 overflow-hidden text-left break-all whitespace-pre-wrap',
                   'max-h-20 overflow-ellipsis line-limit']"
        >
          {{ user.bio }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useProcessAvatar } from '@/composables';
import { CardUserItem } from './types';

export default defineComponent({
  props: {
    /** 课程数据项 */
    user: { type: Object as PropType<CardUserItem>, required: true },
  },
  setup() {
    const { processAvatar } = useProcessAvatar();
    return {
      processAvatar,
    };
  },
});
</script>

<style lang='scss' scoped>
.card-user__user-name {
  font-weight: bold;
  font-size: 16px;
}
.card-user__user-signature {
  color: #979797;
}
</style>
