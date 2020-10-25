<template>
  <div class="content-box">
    <rating-head-bar />
    <f-tabs
      v-model="activeTab"
      size="small"
      :pages="pages"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import { RatingHeadBar, LectureList, RatingList } from './components';

export default defineComponent({
  components: {
    RatingHeadBar,
  },
  data() {
    return {
      activeTab: '最新',
      /** 最新点评列表 */
      latestRatingList: [],
      /** 通识课程列表 */
      通识LectureList: [],
      /** 思政课程列表 */
      思政LectureList: [],
      /** 外语课程列表 */
      外语LectureList: [],
      /** 体育课程列表 */
      体育LectureList: [],
    };
  },
  computed: {
    /** 标签页 */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pages(): Record<string, { component: any; props: Record<string, any> }> {
      return {
        最新: { component: markRaw(RatingList), props: { ratings: this.latestRatingList } },
        通识: { component: markRaw(LectureList), props: { lectures: this.通识LectureList } },
        思政: { component: markRaw(LectureList), props: { lectures: this.思政LectureList } },
        外语: { component: markRaw(LectureList), props: { lectures: this.外语LectureList } },
        体育: { component: markRaw(LectureList), props: { lectures: this.体育LectureList } },
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.content-box {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: #444;
  font-size: 14px;

  margin: 0 auto;

  max-width: 2560px;

  > .f-tabs {
    margin-top: 15px;
  }
}
</style>
