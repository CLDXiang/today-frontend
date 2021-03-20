<template>
  <div
    :class="classCourseCard"
    :style="styleCourseCard"
    class="course-card f-clickable"
    @click="handleClickCourseCard"
    @mouseenter="setHoveredCourseId(section.id)"
    @mouseleave="resetHoveredCourseId"
    @touchstart="setHoveredCourseId(section.id)"
    @touchend="resetHoveredCourseId"
  >
    <span
      class="course-name"
      :style="{'-webkit-line-clamp': lines.name }"
    >{{ section.name }}</span>
    <span
      v-if="lines.code > 0"
      class="course-code"
      :style="{'-webkit-line-clamp': lines.code }"
    >{{ `(${section.code_id})` }}</span>
    <span
      class="course-place"
      :style="{'-webkit-line-clamp': lines.place }"
    >{{ `(${section.currentSlot.week})${section.currentSlot.place}` }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { mapState, mapMutations } from 'vuex';
import { hashColorClassNames } from '@/utils/colors';
import { SectionInColumn } from '../types';

export default defineComponent({
  props: {
    section: { type: Object as PropType<SectionInColumn>, required: true },
  },
  data() {
    return {
      cellHeight: 64,
      lines: {
        name: 0,
        code: 0,
        place: 0,
      },
    };
  },
  computed: {
    ...mapState(['hoveredCourseId']),
    classCourseCard(): string[] {
      return [
        hashColorClassNames((this.section.code
            && parseInt(this.section.code.slice(this.section.code.length - 3), 10) % 96)
          || 0),
        this.hoveredCourseId === this.section.id ? 'f-hovered' : '',
      ];
    },
    styleCourseCard(): Record<string, string> {
      const { sectionsArray } = this.section;
      return {
        top: `${this.cellHeight * sectionsArray[0]}px`,
        height: `${this.cellHeight * sectionsArray.length}px`,
      };
    },
  },
  mounted() {
    // 计算空间以动态分配行数
    /** 计算半角宽度，半角字符算 1，全角算 2 */
    const calcNarrowWidth = (str: string) => {
      const wideCharReg = /[^\x20-\xff]/g;
      /** 全角个数 */
      const wideChars = str.match(wideCharReg);
      if (wideChars) {
        const wideCharCount = str.match(wideCharReg)?.length || 0;
        return wideCharCount + str.length;
      }
      return str.length;
    };
    /** 需要几行 */
    const needLines = (str: string) => Math.ceil(calcNarrowWidth(str) / 8);

    const lines = {
      name: 2,
      code: 0,
      place: 1,
    };
    const linesNeed = {
      name: needLines(this.section.name || ''),
      code: needLines(`(${this.section.code_id || ''})`),
      place: needLines(`(${this.section.currentSlot.week})${this.section.currentSlot.place}`),
    };

    let leftLines = this.section.sectionsArray.length * 4;
    /** 给 field 字段再分 n 行，返回是否用完所有空间 */
    const giveLines = (field: 'name' | 'code' | 'place', n: number) => {
      const needMore = linesNeed[field] - lines[field]; // 还需要多少
      if (needMore > 0) {
        const linesToAdd = Math.min(n, leftLines, needMore);
        lines[field] += linesToAdd;
        leftLines -= linesToAdd;
      }
      if (leftLines < 1) return true;
      return false;
    };

    // 优先给课程名最多两行
    lines.name = Math.min(linesNeed.name, 2);
    leftLines -= lines.name;
    if (leftLines < 1) {
      this.lines = lines;
      return;
    }

    // 优先给上课地点最多一行
    lines.place = Math.min(linesNeed.place, 1);
    leftLines -= lines.place;
    if (leftLines < 1) {
      this.lines = lines;
      return;
    }

    // 如果还有空间，继续分给上课地点
    if (giveLines('place', linesNeed.place - lines.place)) {
      this.lines = lines;
      return;
    }

    while (leftLines > 0) {
      if (
        lines.name >= linesNeed.name
        && lines.place >= linesNeed.place
        && lines.code >= linesNeed.code
      ) {
        this.lines = lines;
        return;
      }
      // 如果还有空间，依次给课程名、课程号分一行
      if (giveLines('name', 1)) {
        this.lines = lines;
        return;
      }
      if (giveLines('code', 1)) {
        this.lines = lines;
        return;
      }
    }
  },

  methods: {
    ...mapMutations(['setHoveredCourseId', 'resetHoveredCourseId', 'changeDetailPageContent', 'showDetailDialog']),
    handleClickCourseCard() {
      this.changeDetailPageContent(this.section);
      this.showDetailDialog();
    },
  },
});
</script>

<style lang="scss" scoped>
.course-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 10;

  box-sizing: border-box;
  position: absolute;
  width: calc(100% - 2px);
  min-width: 62px;
  left: 1px;
  border-radius: 6px;
  border-bottom: 0.2rem solid;
  padding: 0.3rem;
  transition: background-color 0.195s cubic-bezier(0, 0, 0.2, 1);

  cursor: pointer;
  user-select: none;
}

.course-name,
.course-code,
.course-place {
  // word-wrap: break-word;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  // -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.course-name {
  font-size: 12px;
  font-weight: 600;
  line-height: 14px;
}

.course-code,
.course-place {
  font-size: 10px;
  line-height: 12px;
}
</style>
