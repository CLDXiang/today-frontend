<template>
  <div class="day__column">
    <div
      v-for="(_, index) in cellNumbers"
      :key="'cell-' + index"
      class="day__cell"
    />
    <timetable-course-card
      v-for="(section, index) in sectionList"
      :key="index"
      :section="section"
    />
  </div>
</template>

<script>
import TimetableCourseCard from './TimetableCourseCard.vue';

export default {
  components: {
    TimetableCourseCard,
  },
  props: {
    column: Array,
  },
  data() {
    return {
      cellNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    };
  },
  computed: {
    sectionList() {
      return this.column.filter((item) => typeof item === 'object');
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '@/scss/_timetable';

.day__column {
  height: 100%;
  position: relative;
  min-width: $cell-width;

  flex: 1;

  display: flex;
  flex-direction: column;
}

.day__cell {
  flex: 1 0 $cell-height;
  @include flex-center;

  // 设定奇/偶行的背景色
  &:nth-of-type(2n) {
    @extend .background-one;
  }
  &:nth-of-type(2n + 1) {
    @extend .background-two;
  }
}
</style>
