<template>
  <div
    :class="
      'w-full h-full overflow-y-auto max-w-14xl' +
        'flex flex-col items-center text-gray-600 text-sm mx-auto my-0'
    "
  >
    <rating-head-bar
      is-back-visible
      @click-back="routerBack('/rating')"
    />
    <div class="self-start my-2 mr-0 ml-4 text-base text-gray-200">
      “{{ parsedQ }}”的搜索结果
    </div>
    <div
      ref="scroll"
      class="bg-gray-100 overflow-auto flex flex-1 flex-col self-stretch"
    >
      <card-lecture
        v-for="searchResult in searchResults"
        :key="searchResult.id"
        class="mt-1.5 mx-0 mb-1 f-clickable"
        :lecture="searchResult"
        @click="$router.push(`/rating/lecture/${searchResult.id}`)"
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
import { useScrollToBottom, useRouterBack } from '@/composables';
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
      // TODO: 传入 lastId
      if (q.value) {
        rpcClient
          .search({
            q: q.value,
            lastId: searchResults.value[searchResults.value.length - 1].id,
            limit: 20,
          })
          .then((resp) => {
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
      /** 列表元素 ref */
      scroll,

      /** 搜索结果列表 */
      searchResults,

      /** 路由回退 */
      routerBack: useRouterBack(),
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
