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
import { defineComponent, markRaw, DefineComponent } from 'vue';
import { mockSelects } from '@/apis/mocks/lecture';
import { mockRatings } from '@/apis/mocks/rating';
import { RatingHeadBar, LectureList, RatingList } from './components';

export default defineComponent({
  components: {
    RatingHeadBar,
  },
  data() {
    return {
      /** 标签页
       * 关于 pages 的设计
       * 按照作用来说应当是作为 slot 传入的，
       * 但是我暂时没有找到优雅的方式将每一个传入的项分别解析到 header 和 body 中。
       * P.S. 这做法有点 React 内味儿了（逃 */
      pages: {
        最新: { component: markRaw(RatingList), props: { ratings: [...mockRatings] } },
        通识: { component: markRaw(LectureList), props: { lectures: [...mockSelects] } },
        思政: { component: markRaw(LectureList), props: { lectures: [] } },
        外语: { component: markRaw(LectureList), props: { lectures: [] } },
        体育: { component: markRaw(LectureList), props: { lectures: [] } },
      } as Record<string, { component: DefineComponent; props: Record<string, unknown> }>,
      activeTab: '最新',
    };
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

  padding-top: $head-margin;

  margin: 0 auto;

  max-width: 2560px;

  > .f-tabs {
    margin-top: 15px;
  }
}
</style>
