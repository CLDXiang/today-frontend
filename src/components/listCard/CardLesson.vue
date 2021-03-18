<template>
  <div class="card-lesson py-2.5 px-3 rounded-lg shadow-lg">
    <div class="flex flex-row justify-between mt-1 h-7">
      <div class="overflow-hidden text-lg whitespace-nowrap overflow-ellipsis">
        {{ lesson.name }}
      </div>
      <div>
        {{ lesson.codeFull }}
      </div>
    </div>
    <div class="flex flex-row justify-between h-6 mt-2">
      <div class="overflow-hidden text-gray-400 overflow-ellipsis whitespace-nowrap">
        {{ lesson.teachers.join(' ') }}
      </div>
      <div>
        {{ lesson.semester }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CardLessonItem } from './types';

export default defineComponent({
  props: {
    /** 课程数据项 */
    lesson: { type: Object as PropType<CardLessonItem>, required: true },
  },
});
</script>

<style scoped>
</style>
