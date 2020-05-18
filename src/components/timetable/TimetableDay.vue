<template>
  <div class="timetable__day" :style="{ flexGrow: coursesByColumns.length }">
    <div class="day__title background-one">
      {{ title }}
    </div>
    <div class="day__column-box">
      <timetable-day-column
        v-for="(column, index) in coursesByColumns"
        :key="index"
        :column="column"
      />
    </div>
  </div>
</template>

<script>
import TimetableDayColumn from './TimetableDayColumn.vue';

export default {
  components: {
    TimetableDayColumn,
  },
  props: {
    title: String,
    courses: Object,
  },
  data() {
    return {};
  },
  computed: {
    // 计算列数，并将课程放到各个列中
    coursesByColumns() {
      // 占位：未被占用的位置记 0，某门课程从这里开始就将它整个放到这个位置，并将其他占的位置置 1
      const columns = [new Array(14).fill(0)];

      // this.courses.forEach((course) => {
      Object.values(this.courses).forEach((course) => {
        const sectionsArray = this.parseSections(course.currentSlot.section);

        // 插入完成
        let insertOK = false;

        // 当前在检查第几列
        let currentColumnIndex = 0;

        while (!insertOK) {
          // 当前检查列数大于总列数，则加一列
          if (currentColumnIndex >= columns.length) {
            columns.push(new Array(14).fill(0));
          }

          // 可以插入在当前列
          let canBeInsertedHere = true;
          // eslint-disable-next-line no-loop-func
          sectionsArray.forEach((section) => {
            if (columns[currentColumnIndex][section] !== 0) {
              canBeInsertedHere = false;
            }
          });
          if (canBeInsertedHere) {
            // 若可以插入，则将课程信息插入第一格，并将剩余格置 1
            const courseInserted = { ...course, sectionsArray };
            columns[currentColumnIndex][sectionsArray[0]] = courseInserted;
            // eslint-disable-next-line no-loop-func
            sectionsArray.slice(1).forEach((section) => {
              columns[currentColumnIndex][section] = 1;
            });
            insertOK = true;
          } else {
            // 若不可以插入，则尝试插入下一行
            currentColumnIndex += 1;
          }
        }
      });
      return columns;
    },
  },
  methods: {
    // 将 "3-5" 格式的字符串节数转为 [2, 3, 4] 索引数组（从 0 开始）
    parseSections(sectionString) {
      const [sectionStart, sectionEnd] = sectionString.split('-').map((i) => parseInt(i, 10));
      const sectionsArray = [];
      for (let i = sectionStart; i <= sectionEnd; i += 1) {
        sectionsArray.push(i - 1);
      }
      return sectionsArray;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/_timetable';

.timetable__day {
  height: 100%;
  border-right: 1px solid #ddd;

  flex: 1 0 auto;

  display: flex;
  flex-direction: column;

  // 最后一列不需要右边界
  &:last-of-type {
    border-right: 0;
  }
}

.day__title {
  flex: 0 0 $cell-height/2;
  @include flex-center;

  color: #69707a;
  font-weight: 600;
}

.day__column-box {
  display: flex;
}
</style>
