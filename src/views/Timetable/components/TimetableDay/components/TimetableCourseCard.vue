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
      style="display: -webkit-box; -webkit-box-orient: vertical"
      :style="{ '-webkit-line-clamp': lines.name }"
    >{{ section.name }}</span>
    <span
      v-if="lines.code > 0"
      class="break-all overflow-ellipsis overflow-hidden text-xxs"
      style="display: -webkit-box; -webkit-box-orient: vertical"
      :style="{ '-webkit-line-clamp': lines.code }"
    >{{ `(${section.codeId})` }}</span>
    <span
      class="break-all overflow-ellipsis overflow-hidden text-xxs"
      style="display: -webkit-box; -webkit-box-orient: vertical"
      :style="{ '-webkit-line-clamp': lines.place }"
    >{{ placeString }}</span>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType,
} from 'vue';
import { mapMutations, useStore } from 'vuex';
import { hashColorClassNames } from '@/utils/colors';
import { SectionInColumn } from '../types';

export default defineComponent({
  props: {
    section: { type: Object as PropType<SectionInColumn>, required: true },
  },
  setup(props) {
    const store = useStore();
    const hoveredCourseId = computed(() => store.state.hoveredCourseId);

    const placeString = computed(
      () => `${props.section.place}(${props.section.weeksArray.join(',')})`,
    );

    const lines = computed<{
      name: number;
      code: number;
      place: number;
    }>(() => {
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

      const linesCache = {
        name: 2,
        code: 0,
        place: 1,
      };
      const linesNeed = {
        name: needLines(props.section.name || ''),
        code: needLines(`(${props.section.codeId || ''})`),
        place: needLines(placeString.value),
      };

      let leftLines = props.section.sectionsArray.length * 4;
      /** 给 field 字段再分 n 行，返回是否用完所有空间 */
      const giveLines = (field: 'name' | 'code' | 'place', n: number) => {
        const needMore = linesNeed[field] - linesCache[field]; // 还需要多少
        if (needMore > 0) {
          const linesToAdd = Math.min(n, leftLines, needMore);
          linesCache[field] += linesToAdd;
          leftLines -= linesToAdd;
        }
        if (leftLines < 1) return true;
        return false;
      };

      // 优先给课程名最多两行
      linesCache.name = Math.min(linesNeed.name, 2);
      leftLines -= linesCache.name;
      if (leftLines < 1) {
        return linesCache;
      }

      // 优先给上课地点最多一行
      linesCache.place = Math.min(linesNeed.place, 1);
      leftLines -= linesCache.place;
      if (leftLines < 1) {
        return linesCache;
      }

      // 如果还有空间，继续分给上课地点
      if (giveLines('place', linesNeed.place - linesCache.place)) {
        return linesCache;
      }

      while (leftLines > 0) {
        if (
          linesCache.name >= linesNeed.name
          && linesCache.place >= linesNeed.place
          && linesCache.code >= linesNeed.code
        ) {
          return linesCache;
        }
        // 如果还有空间，依次给课程名、课程号分一行
        if (giveLines('name', 1)) {
          return linesCache;
        }
        if (giveLines('code', 1)) {
          return linesCache;
        }
      }
      return {
        name: 0,
        code: 0,
        place: 0,
      };
    });
    /** 课程卡片类名数组 */
    const classCourseCard = computed(() => [
      hashColorClassNames(
        (props.section.code
          && parseInt(props.section.code.slice(props.section.code.length - 3), 10))
          || 0,
      ),
      hoveredCourseId.value === props.section.id ? 'f-hovered' : '',
    ]);
    /** 格子高度 */
    const CELL_HEIGHT = 64;
    /** 课程卡片样式 */
    const styleCourseCard = computed(() => {
      const { sectionsArray } = props.section;
      return {
        top: `${CELL_HEIGHT * sectionsArray[0]}px`,
        height: `${CELL_HEIGHT * sectionsArray.length}px`,
      };
    });

    return {
      placeString,
      lines,
      classCourseCard,
      styleCourseCard,
    };
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
