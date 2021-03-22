<template>
  <div class="py-2.5 px-3 rounded-lg bg-white mb-2 shadow-lg">
    <div class="flex justify-between mt-1 h-7">
      <div class="overflow-hidden text-lg whitespace-nowrap overflow-ellipsis">
        {{ lecture.name }}
      </div>
      <div class="flex">
        <five-stars
          :score="3"
          :size="20"
        />
        <span class="ml-1 text-gray-400">
          {{ (lecture.score || 3).toFixed(1) }}
        </span>
      </div>
    </div>
    <div class="flex justify-between h-6 mt-2">
      <div class="overflow-hidden text-gray-400 overflow-ellipsis whitespace-nowrap">
        {{ lecture.teachers.join(' ') }}
      </div>
      <div class="flex">
        <!-- FIXME: 实现 reaction 后显示 -->
        <div
          v-if="false"
          class="ml-4"
        >
          <f-icon
            name="reaction"
            size="14"
          />
          <span class="ml-1 text-xs">
            {{ lecture.reactionCount }}
          </span>
        </div>
        <!-- FIXME: 实现收藏课程后显示 -->
        <div
          v-if="false"
          class="ml-2"
        >
          <f-icon
            name="heart"
            size="14"
          />
          <span class="ml-1 text-xs">
            {{ lecture.likeCount }}
          </span>
        </div>
        <div class="flex ml-2 text-gray-400">
          <div class="flex flex-col">
            <!-- HACK: 加上一个 div 实现 SVG 居中 -->
            <div class="h-0.5" />
            <f-icon
              class="align-baseline"
              name="chat"
              size="14"
            />
          </div>
          <span class="ml-1">
            {{ lecture.ratingCount }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import FiveStars from '@/components/FiveStars.vue';
import { CardLectureItem } from './types';

export default defineComponent({
  components: {
    FiveStars,
  },
  props: {
    /** 课程数据项 */
    lecture: { type: Object as PropType<CardLectureItem>, required: true },
  },
});
</script>
