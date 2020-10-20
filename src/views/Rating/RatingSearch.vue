<template>
  <div
    class="content-box"
  >
    <rating-head-bar is-back-visible />
    <div class="title">
      “{{ parsedQ }}”的搜索结果
    </div>
    <div
      ref="scroll"
      class="search-result-list"
    >
      <card-lecture
        v-for="searchResult in searchResults"
        :key="searchResult.id"
        class="search-result-list__card"
        :lecture="searchResult"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, toRefs, watch,
} from 'vue';
import { rpcClient } from '@/apis';
import { CardLectureItem, CardLecture } from '@/components/listCard';
import { useScrollToBottom } from '@/composables';
import { RatingHeadBar } from './components';

export default defineComponent({
  components: {
    RatingHeadBar,
    CardLecture,
  },
  props: {
    /** 传入的搜索字串 */
    q: { type: String, required: true },
  },
  setup(props) {
    const { q } = toRefs(props);

    /** 搜索结果列表 */
    const searchResults = ref<CardLectureItem[]>([]);

    /** 搜索并覆盖当前列表 */
    const search = () => {
      if (q.value) {
        rpcClient.search({ q: q.value, limit: 20 }).then((resp) => {
          searchResults.value = resp.data;
        });
      }
    };
    /** 搜索并将结果附加在当前列表后 */
    const searchMore = () => {
      // TODO: 传入 last_id
      if (q.value) {
        rpcClient.search({ q: q.value, limit: 20 }).then((resp) => {
          searchResults.value = [...searchResults.value, ...resp.data];
        });
      }
    };

    watch(q, () => {
      // q 改变时重新拉数据
      search();
    });

    // 滚动到底部时拉新数据
    const { scrollRef: scroll } = useScrollToBottom(searchMore);

    // 首次进入该页面拉数据
    search();

    return {
      scroll,

      searchResults,
    };
  },
  computed: {
    parsedQ(): string {
      if (this.q.length < 12) {
        return this.q;
      }
      return `${this.q.slice(0, 12)}...`;
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

  padding-top: $head-margin;

  margin: 0 auto;

  max-width: 2560px;

  > .title {
    align-self: flex-start;
    margin: 9px 0 8px 15px;
    font-size: 16px;
    line-height: 22px;
    color: #828282;
  }

  > .search-result-list {
    background-color: #f2f2f2;
    overflow: auto;
    align-self: stretch;
    flex: 1;
    display: flex;
    flex-direction: column;

    > .search-result-list__card {
      margin: 6px 0 2px;
    }
  }
}
</style>