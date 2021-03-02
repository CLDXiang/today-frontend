<template>
  <div class="content-box">
    <rating-head-bar />
    <f-tabs
      v-model="activeTab"
    >
      <f-tab-pane
        v-for="tabName in ratingTabList"
        :key="tabName"
        :tab="tabName"
      >
        <rating-list
          :active="activeTab === tabName"
          :type="tabName"
        />
      </f-tab-pane>
      <f-tab-pane
        v-for="tabName in lectureTabList"
        :key="tabName"
        :tab="tabName"
      >
        <lecture-list
          :active="activeTab === tabName"
          :type="tabName"
        />
      </f-tab-pane>
    </f-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RatingType, LectureType } from '@/utils/config';
import { RatingHeadBar, LectureList, RatingList } from './components';

type TabType = RatingType | LectureType;

export default defineComponent({
  components: {
    RatingHeadBar,
    LectureList,
    RatingList,
  },
  setup() {
    /** 激活 tab */
    const activeTab = ref<TabType>('最新');
    /** rating 类 tab 列表 */
    const ratingTabList = ref<RatingType[]>(['最新']);
    /** lecture 类 tab 列表 */
    const lectureTabList = ref<LectureType[]>(['七模', '思政', '外语', '体育']);
    return {
      activeTab,
      ratingTabList,
      lectureTabList,
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
