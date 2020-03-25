<template>
  <div class="course-card" :class="classCourseCard" :style="styleCourseCard">
    <span class="course-name">{{ course.name }}</span>
    <span class="course-code">{{ `(${course.code_id})` }}</span>
    <span class="course-teacher">{{
      course.currentSlot.teacher.join(',')
    }}</span>
    <span class="course-place">{{ course.currentSlot.place }}</span>
  </div>
</template>

<script>
export default {
  props: {
    course: Object,
  },
  data() {
    return {
      cellHeight: 64,
    };
  },
  computed: {
    classCourseCard() {
      return [
        `color-${(this.course.code &&
          parseInt(this.course.code[this.course.code.length - 1], 10) % 8) ||
          0}`,
      ];
    },
    styleCourseCard() {
      const { sectionsArray } = this.course;
      return {
        top: `${this.cellHeight * (sectionsArray[0] - 1)}px`,
        height: `${this.cellHeight * sectionsArray.length}px`,
      };
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '../scss/_timetable';

.course-card {
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  position: absolute;
  width: $cell-width - 2px;
  left: 1px;
  border-radius: 6px;
  border-bottom: 0.2rem solid;
  padding: 0.3rem;
  transition: background-color 0.195s cubic-bezier(0, 0, 0.2, 1);

  word-wrap: break-word;

  &:hover,
  &.hover {
    cursor: pointer;
  }
}

.course-name {
  font-size: 12px;
  font-weight: 600;
}

.course-code,
.course-teacher,
.course-place {
  font-size: 10px;
}
</style>
