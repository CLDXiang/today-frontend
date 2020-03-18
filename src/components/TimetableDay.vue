<template>
  <div class="timetable__day">
    <div class="timetable__day__title background-one">{{ title }}</div>
    <div class="timetable__day__column-box">
      <!-- TODO: 此处应根据 props 传下来的当日的课程计算该显示几列，并将每列该显示的课程信息作为 props 传给 column-->
      <timetable-day-column></timetable-day-column>
      <timetable-day-column></timetable-day-column>
    </div>
  </div>
</template>

<script>
import TimetableDayColumn from './TimetableDayColumn.vue';

export default {
  props: {
    title: String,
  },
  data() {
    return {
    };
  },
  components: {
    TimetableDayColumn,
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/_timetable';

.timetable__day {
  height: 100%;
  border-right: 1px solid #ddd;

  flex: 1;

  display: flex;
  flex-direction: column;

  // 最后一列不需要右边界
  &:last-of-type {
    border-right: 0;
  }
}

.timetable__day__title {
  flex: 1 0 $cell-height/2;
  @include flex-center;
  
  color: #69707a;
  font-weight: 600;
}

.timetable__day__column-box {
  display: flex;
}
</style>