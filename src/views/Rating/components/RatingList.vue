<template>
  <div
    ref="scroll"
    class="bg-gray-100 pt-2 h-full overflow-y-auto"
  >
    <template v-if="fetching">
      <div
        v-for="i in 3"
        :key="i"
        class="p-4 pb-3 mb-2 bg-white rounded-lg h-36 shadow-lg"
      >
        <f-skeleton
          avatar
          :rows="4"
          :width="['80px', '100%', '100%', '144px']"
        />
      </div>
    </template>
    <card-rating
      v-for="item in items"
      :key="item.id"
      class="f-clickable mb-2"
      :rating="item"
      @click="$router.push(`/rating/lecture/${item.lecture.id}`)"
    />
    <template v-if="fetchingMore">
      <div class="p-4 pb-3 mb-2 bg-white rounded-lg h-36 shadow-lg">
        <f-skeleton
          avatar
          :rows="4"
          :width="['80px', '100%', '100%', '144px']"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, watch,
} from 'vue';
import { CardRatingItem, CardRating } from '@/components/listCard';
import { rateClient } from '@/apis';
import { useFetchListData, useScrollToBottom } from '@/composables';

export default defineComponent({
  components: {
    CardRating,
  },
  props: {
    /** 当前是否激活 */
    active: { type: Boolean, default: false },
  },
  setup(props) {
    const items = ref<CardRatingItem[]>([]);
    const {
      fetching, fetchingMore, fetchList, fetchMore,
    } = useFetchListData(
      async () => rateClient
        .getRatingList({ limit: 20 }).then(({ data }) => {
          items.value = data;
        }),
      async () => rateClient
        .getRatingList({
          lastId: items.value[items.value.length - 1].id,
          limit: 20,
        })
        .then(({ data }) => {
          items.value = [...items.value, ...data];
        }),
    );

    watch(() => props.active, (value) => {
      // activeTab 改变时，若当前 tab 无数据则重新拉数据
      if (value && !items.value.length) {
        fetchList();
      }
    });

    // 首次进入该页面且 active 时拉数据
    if (props.active) {
      fetchList();
    }

    // 滚动到底部时拉新数据
    const { scrollRef: scroll } = useScrollToBottom(
      () => fetchMore(),
      500,
    );

    return {
      items,
      scroll,
      fetching,
      fetchingMore,
    };
  },
});
</script>
