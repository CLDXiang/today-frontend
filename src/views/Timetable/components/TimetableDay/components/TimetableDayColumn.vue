<template>
  <div class="day__column">
    <div
      v-for="(_, index) in cellNumbers"
      :key="'cell-' + index"
      class="day__cell even:bg-transparent odd:bg-gray-100"
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
      return this.column.filter(
        (item) => typeof item === 'object',
      ) as SectionInColumn[];
    },
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.day__column {
  height: 100%;
  position: relative;
  min-width: 64px;

  flex: 1;

  display: flex;
  flex-direction: column;
}

.day__cell {
  flex: 1 0 64px;
  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;
}
</style>
