<template>
  <div
    :class="
      'w-full h-full overflow-hidden max-w-14xl text-warm-gray-700 text-sm mx-auto ' +
        'flex flex-col'
    "
  >
    <rating-head-bar />
    <f-tabs v-model="activeTab">
      <f-tab-pane
        v-for="tabName in ['最新']"
        :key="tabName"
        :tab="tabName"
      >
        <rating-list
          :active="activeTab === tabName"
          :type="tabName"
        />
      </f-tab-pane>
      <f-tab-pane
        v-for="tabName in ['七模', '思政', '外语', '体育']"
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
    return {
      activeTab,
    };
  },
});
</script>
