<template>
  <div
    ref="scroll"
    class="bg-gray-100 pt-2 h-full overflow-y-auto"
  >
    <template v-if="fetching">
      <div
        v-for="i in 6"
        :key="i"
        class="p-4 pb-3 mb-2 bg-white rounded-lg h-18 shadow-lg"
      >
        <f-skeleton :width="['100%', '50%']" />
      </div>
    </template>
    <card-lecture
      v-for="item in items"
      :key="item.id"
      class="f-clickable mb-2"
      :lecture="item"
      @click="$router.push(`/rating/lecture/${item.id}`)"
    />
    <template v-if="fetchingMore">
      <div class="p-4 pb-3 mb-2 bg-white rounded-lg h-18 shadow-lg">
        <f-skeleton :width="['100%', '50%']" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watch,
} from 'vue';
import { CardLectureItem, CardLecture } from '@/components/listCard';
import { LectureType, lectureType2Categories } from '@/utils/config';
import { lectureClient } from '@/apis';
import { useFetchListData, useScrollToBottom } from '@/composables';

export default defineComponent({
  components: {
    CardLecture,
  },
  props: {
    /** 当前是否激活 */
    active: { type: Boolean, default: false },
    /** 类型，对应 tab key */
    type: { type: String as PropType<LectureType>, required: true },
  },
  setup(props) {
    const items = ref<CardLectureItem[]>([]);
    const enable = ref<boolean>(true);
    const {
      fetching, fetchingMore, fetchList, fetchMore,
    } = useFetchListData(
      async () => lectureClient
        .getLectureList({ categories: lectureType2Categories(props.type), limit: 20 })
        .then(({ data }) => {
          items.value = data;
        }),
      async () => lectureClient
        .getLectureList({
          categories: lectureType2Categories(props.type),
          limit: 20,
          lastId: items.value[items.value.length - 1].id,
        })
        .then(({ data }) => {
          items.value = [...items.value, ...data];
          if (data.length === 0) {
            enable.value = false;
          }
        }),
    );

    watch(
      () => props.active,
      (value) => {
        // activeTab 改变时，若当前 tab 无数据则重新拉数据
        if (value && !items.value.length) {
          fetchList();
        }
      },
    );

    // 首次进入该页面且 active 时拉数据
    if (props.active) {
      fetchList();
    }

    // 滚动到底部时拉新数据
    const { scrollRef: scroll } = useScrollToBottom(
      () => fetchMore(),
      500,
      enable,
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
