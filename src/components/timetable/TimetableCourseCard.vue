<template>
  <div
    :class="classCourseCard"
    :style="styleCourseCard"
    class="course-card hoverable"
    @click="handleClickCourseCard"
    @mouseenter="setHoveredCourseId(section.id)"
    @mouseleave="resetHoveredCourseId"
    @touchstart="setHoveredCourseId(section.id)"
    @touchend="resetHoveredCourseId"
  >
    <span class="course-name">{{ section.name }}</span>
    <span class="course-code">{{ `(${section.code_id})` }}</span>
    <span class="course-teacher">{{
      section.currentSlot.teacher.join(',')
    }}</span>
    <span class="course-place">{{ section.currentSlot.place }}</span>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    section: Object,
  },
  data() {
    return {
      cellHeight: 64,
    };
  },
  computed: {
    ...mapState(['hoveredCourseId']),

    classCourseCard() {
      return [
        `color-${
          (this.section.code &&
            parseInt(this.section.code.slice(this.section.code.length - 3), 10) % 96) ||
          0
        }`,
        this.hoveredCourseId === this.section.id ? 'hover' : '',
      ];
    },
    styleCourseCard() {
      const { sectionsArray } = this.section;
      return {
        top: `${this.cellHeight * sectionsArray[0]}px`,
        height: `${this.cellHeight * sectionsArray.length}px`,
      };
    },
  },
  methods: {
    ...mapMutations(['setHoveredCourseId', 'resetHoveredCourseId']),
    handleClickCourseCard() {
      // only work on mobile mode
      this.$store.commit('changeDetailPageContent', this.section);
      this.$store.commit('showDetailDialog');
      // if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
      //   this.$store.commit('showDetailDialog');
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/_timetable';

.course-card {
  display: flex;
  flex-direction: column;
  z-index: 1;

  box-sizing: border-box;
  position: absolute;
  width: calc(100% - 2px);
  min-width: $cell-width - 2px;
  left: 1px;
  border-radius: 6px;
  border-bottom: 0.2rem solid;
  padding: 0.3rem;
  transition: background-color 0.195s cubic-bezier(0, 0, 0.2, 1);

  &:hover {
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
