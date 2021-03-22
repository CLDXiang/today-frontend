<template>
  <div class="h-full relative w-16 flex-auto flex-shrink-0 flex flex-col">
    <div
      v-for="(_, index) in cellNumbers"
      :key="'cell-' + index"
      :class="[
        'h-16 flex-auto flex-shrink-0 justify-center items-center',
        'select-none even:bg-transparent odd:bg-gray-100',
      ]"
    />
    <timetable-course-card
      v-for="(section, index) in sectionList"
      :key="index"
      :section="section"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import TimetableCourseCard from './TimetableCourseCard.vue';
import { Column, SectionInColumn } from '../types';

export default defineComponent({
  components: {
    TimetableCourseCard,
  },
  props: {
    column: { type: Array as PropType<Column>, required: true },
  },
  data() {
    return {
      cellNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    };
  },
  computed: {
    sectionList(): SectionInColumn[] {
      return this.column.filter((item) => typeof item === 'object') as SectionInColumn[];
    },
  },
  methods: {},
});
</script>
