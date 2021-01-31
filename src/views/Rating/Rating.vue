<template>
  <div class="content-box">
    <rating-head-bar />
    <f-tabs
      v-model="activeTab"
      :bottom-offset="500"
      @on-scroll-to-bottom="handleScrollToBottom"
    >
      <f-tab-pane tab="最新">
        <rating-list :ratings="tabLists.最新" />
      </f-tab-pane>
      <f-tab-pane tab="七模">
        <lecture-list :lectures="tabLists.七模" />
      </f-tab-pane>
      <f-tab-pane tab="思政">
        <lecture-list :lectures="tabLists.思政" />
      </f-tab-pane>
      <f-tab-pane tab="外语">
        <lecture-list :lectures="tabLists.外语" />
      </f-tab-pane>
      <f-tab-pane tab="体育">
        <lecture-list :lectures="tabLists.体育" />
      </f-tab-pane>
    </f-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { rateClient, lectureClient } from '@/apis';
import { CardLectureItem, CardRatingItem } from '@/components/listCard';
import { LectureType, lectureType2Categories } from '@/utils/config';
import { RatingHeadBar, LectureList, RatingList } from './components';

type TabType = '最新' | LectureType;

export default defineComponent({
  components: {
    RatingHeadBar,
    LectureList,
    RatingList,
  },
  setup() {
    /** 激活 tab */
    const activeTab = ref<TabType>('最新');
    /** 列表项 */
    const tabLists = ref({
      /** 最新点评列表 */
      最新: [] as CardRatingItem[],
      /** 七模课程列表 */
      七模: [] as CardLectureItem[],
      /** 思政课程列表 */
      思政: [] as CardLectureItem[],
      /** 外语课程列表 */
      外语: [] as CardLectureItem[],
      /** 体育课程列表 */
      体育: [] as CardLectureItem[],
    });

    /** 拉取并覆盖当前列表 */
    const fetchList = (type: TabType) => {
      switch (type) {
        case '最新':
          rateClient.getRatingList({ limit: 20 }).then(({ data }) => {
            tabLists.value.最新 = data;
          });
          break;
        case '七模':
        case '思政':
        case '外语':
        case '体育':
          lectureClient
            .getLectureList({ categories: lectureType2Categories(type), limit: 20 })
            .then(({ data }) => {
              tabLists.value[type] = data;
            });
          break;
        default:
          break;
      }
    };

    /** 拉取并将结果附加在当前列表后 */
    const fetchMore = (type: TabType) => {
      // TODO: 传入 lastId
      switch (type) {
        case '最新':
          rateClient
            .getRatingList({
              lastId: tabLists.value.最新[tabLists.value.最新.length - 1].id,
              limit: 20,
            })
            .then(({ data }) => {
              tabLists.value.最新 = [...tabLists.value.最新, ...data];
            });
          break;
        case '七模':
        case '思政':
        case '外语':
        case '体育':
          lectureClient
            .getLectureList({ categories: lectureType2Categories(type), limit: 20 })
            .then(({ data }) => {
              tabLists.value[type] = [...tabLists.value[type], ...data];
            });
          break;
        default:
          break;
      }
    };

    watch(activeTab, () => {
      // activeTab 改变时，若当前 tab 无数据则重新拉数据
      if (!tabLists.value[activeTab.value].length) {
        fetchList(activeTab.value);
      }
    });

    // 滚动到底部时拉新数据
    const handleScrollToBottom = () => fetchMore(activeTab.value);

    // 首次进入该页面拉数据
    fetchList(activeTab.value);

    return {
      activeTab,
      tabLists,
      handleScrollToBottom,
    };
  },
});
</script>

<style lang="scss" scoped>
.content-box {
  height: 100%;
  width: 100%;
  color: #444;
  font-size: 14px;
  margin: 0 auto;
  max-width: 2560px;
  overflow-y: hidden;

  > .head-bar {
    background-color: #fff;
  }
}
</style>

<style lang="scss">
.content-box > .f-tabs {
  height: calc(100vh - 48px - 64px);
  overflow-y: auto;

  > .f-tabs__header {
    padding: 15px 15px 6px 15px;
    background-color: #fff;
    position: sticky;
    top: 0;
    z-index: 1;
  }
}
</style>
