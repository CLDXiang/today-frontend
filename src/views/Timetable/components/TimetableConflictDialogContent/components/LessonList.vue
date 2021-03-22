<template>
  <div class="flex-grow bg-gray-100 rounded-lg mb-1 p-2 pt-1 overflow-y-auto">
    <div
      v-for="course in selectedCourses"
      :key="course.codeId"
      class="mt-2 flex"
    >
      <div
        class="rounded-l-lg w-4 flex-initial flex-shrink-0"
        :class="[
          hashColorClassNames(
            (course.codeId &&
              parseInt(
                course.codeId.slice(course.codeId.length - 6, course.codeId.length - 3),
                10,
              )) ||
              0
          ),
        ]"
      />
      <div class="bg-white flex-grow rounded-r-lg py-3 px-1.5">
        <div class="text-sm mb-2 text-gray-600">
          {{ course.name }}
        </div>
        <div class="text-xs text-gray-500">
          {{ course.codeId }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { hashColorClassNames } from '@/utils/colors';
import { SelectedCourseInfo } from '../types';

export default defineComponent({
  props: {
    selectedCourses: { type: Array as PropType<SelectedCourseInfo[]>, required: true },
  },
  setup() {
    return {
      hashColorClassNames,
    };
  },
});
</script>
