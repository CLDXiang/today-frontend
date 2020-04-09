<template>
  <div
    class="course-card hoverable"
    :class="classCourseCard"
    :style="styleCourseCard"
    @click="handleClickCourseCard"
  >
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
          parseInt(this.course.code.slice(this.course.code.length - 3), 10) % 96) ||
          0}`,
      ];
    },
    styleCourseCard() {
      const { sectionsArray } = this.course;
      return {
        top: `${this.cellHeight * sectionsArray[0]}px`,
        height: `${this.cellHeight * sectionsArray.length}px`,
      };
    },
  },
  methods: {
    handleClickCourseCard() {
      // only work on mobile mode
      this.$store.commit('changeDetailPageContent', this.course);
      this.$store.commit('showDetailDialog');
      // if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
      //   this.$store.commit('showDetailDialog');
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/_timetable';

.course-card {
  display: flex;
  flex-direction: column;
  z-index: 1;

  box-sizing: border-box;
  position: absolute;
  width: $cell-width - 2px;
  left: 1px;
  border-radius: 6px;
  border-bottom: 0.2rem solid;
  padding: 0.3rem;
  transition: background-color 0.195s cubic-bezier(0, 0, 0.2, 1);

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
  word-wrap: break-word;
}
</style>
