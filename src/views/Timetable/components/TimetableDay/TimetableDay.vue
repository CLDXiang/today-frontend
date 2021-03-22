<template>
  <div
    :style="{ flexGrow: sectionsByColumns.length }"
    class="h-full border-r last:border-0 border-gray-200 flex-auto flex-shrink-0 flex flex-col"
  >
    <div
      :class="[
        'flex-initial flex-shrink-0 h-8',
        'flex justify-center items-center text-gray-500 font-semibold bg-transparent',
      ]"
    >
      {{ title }}
    </div>
    <div class="flex">
      <timetable-day-column
        v-for="(column, index) in sectionsByColumns"
        :key="index"
        :column="column"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import TimetableDayColumn from './components/TimetableDayColumn.vue';
import { Sections } from '../../types';
import { Column } from './types';

export default defineComponent({
  components: {
    TimetableDayColumn,
  },
  props: {
    title: { type: String, required: true },
    sections: { type: Object as PropType<Sections>, required: true },
  },
  computed: {
    /** 计算列数，并将课程放到各个列中 */
    sectionsByColumns() {
      // 占位：未被占用的位置记 0，某门课程从这里开始就将它整个放到这个位置，并将其他占的位置置 1
      const columns: Column[] = [new Array<number>(14).fill(0)];

      // this.courses.forEach((course) => {
      Object.values(this.sections).forEach((section) => {
        const sectionsArray = this.parseSections(section.currentSlot.section);

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
          sectionsArray.forEach((sec) => {
            if (columns[currentColumnIndex][sec] !== 0) {
              canBeInsertedHere = false;
            }
          });
          if (canBeInsertedHere) {
            // 若可以插入，则将课程信息插入第一格，并将剩余格置 1
            const sectionInserted = { ...section, sectionsArray };
            columns[currentColumnIndex][sectionsArray[0]] = sectionInserted;
            // eslint-disable-next-line no-loop-func
            sectionsArray.slice(1).forEach((sec) => {
              columns[currentColumnIndex][sec] = 1;
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
    /** 将 "3-5" 格式的字符串节数转为 [2, 3, 4] 索引数组（从 0 开始） */
    parseSections(sectionString: string): number[] {
      const [sectionStart, sectionEnd] = sectionString.split('-').map((i) => parseInt(i, 10));
      const sectionsArray = [];
      for (let i = sectionStart; i <= sectionEnd; i += 1) {
        sectionsArray.push(i - 1);
      }
      return sectionsArray;
    },
  },
});
</script>
