<template>
  <div class="content-box">
    <rating-head-bar />
    <f-tabs
      v-model="activeTab"
    >
      <f-tab-pane
        v-show="activeTab === '最新'"
        tab="最新"
      >
        <rating-list :ratings="latestRatingList" />
      </f-tab-pane>
      <f-tab-pane
        v-show="activeTab === '通识'"
        tab="通识"
      >
        <lecture-list :lectures="通识LectureList" />
      </f-tab-pane>
      <f-tab-pane
        v-show="activeTab === '思政'"
        tab="思政"
      >
        <lecture-list :lectures="思政LectureList" />
      </f-tab-pane>
      <f-tab-pane
        v-show="activeTab === '外语'"
        tab="外语"
      >
        <lecture-list :lectures="外语LectureList" />
      </f-tab-pane>
      <f-tab-pane
        v-show="activeTab === '体育'"
        tab="体育"
      >
        <lecture-list :lectures="体育LectureList" />
      </f-tab-pane>
    </f-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RatingHeadBar, LectureList, RatingList } from './components';

export default defineComponent({
  components: {
    RatingHeadBar,
    LectureList,
    RatingList,
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
