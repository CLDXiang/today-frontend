<template>
  <div
    :class="[
      ...classCourseCard,
      'flex flex-col justify-start z-10 box-border absolute',
      'rounded-md border-b-4 p-1 transition-colors cursor-pointer select-none f-clickable',
    ]"
    :style="styleCourseCard"
    style="width: calc(100% - 0.125rem); left: 0.0625rem"
    @click="handleClickCourseCard"
    @mouseenter="setHoveredCourseId(section.id)"
    @mouseleave="resetHoveredCourseId"
    @touchstart="setHoveredCourseId(section.id)"
    @touchend="resetHoveredCourseId"
  >
    <span
      class="break-all overflow-ellipsis overflow-hidden text-xs font-semibold"
      style="display: -webkit-box; -webkit-box-orient: vertical;"
      :style="{ '-webkit-line-clamp': lines.name }"
    >{{
      section.name
    }}</span>
    <span
      v-if="lines.code > 0"
      class="break-all overflow-ellipsis overflow-hidden text-xxs"
      style="display: -webkit-box; -webkit-box-orient: vertical;"
      :style="{ '-webkit-line-clamp': lines.code }"
    >{{
      `(${section.code_id})`
    }}</span>
    <span
      class="break-all overflow-ellipsis overflow-hidden text-xxs"
      style="display: -webkit-box; -webkit-box-orient: vertical;"
      :style="{ '-webkit-line-clamp': lines.place }"
    >{{
      `(${section.currentSlot.week})${section.currentSlot.place}`
    }}</span>
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
        hashColorClassNames(
          (this.section.code
            && parseInt(this.section.code.slice(this.section.code.length - 3), 10))
            || 0,
        ),
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
    ...mapMutations([
      'setHoveredCourseId',
      'resetHoveredCourseId',
      'changeDetailPageContent',
      'showDetailDialog',
    ]),
    handleClickCourseCard() {
      this.changeDetailPageContent(this.section);
      this.showDetailDialog();
    },
  },
});
</script>
