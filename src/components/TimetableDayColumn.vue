<template>
  <div class="timetable__day__column">
    <div
      class="timetable__day__cell"
      v-for="(_, index) in cellNumbers"
      :key="index"
    ></div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      cellNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '../scss/_timetable';

.timetable__day__column {
  height: 100%;

  flex: 1;

  display: flex;
  flex-direction: column;
}

.timetable__day__cell {
  flex: 1 0 $cell-height;
  @include flex-center;

  min-width: $cell-width;

  // 设定奇/偶行的背景色
  &:nth-of-type(2n) {
    @extend .background-one;
  }
  &:nth-of-type(2n + 1) {
    @extend .background-two;
  }
}
</style>
