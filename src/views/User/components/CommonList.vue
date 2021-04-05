<template>
  <div
    ref="scroll"
    class="h-full overflow-y-auto space-y-2"
  >
    <!-- TODO: 接入后加 skeleton  -->
    <template
      v-for="item in items"
      :key="item.id"
    >
      <card-rating
        v-if="item.type === 'rating'"
        :rating="item"
        class="f-clickable"
      />
      <card-comment
        v-else-if="item.type === 'comment'"
        :comment="item"
        class="f-clickable"
      />
      <card-lecture
        v-else-if="item.type === 'lecture'"
        :lecture="item"
        class="f-clickable"
      />
      <card-user
        v-else-if="item.type === 'user'"
        :user="item"
        class="f-clickable"
      />
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, inject, PropType, ref, watch,
} from 'vue';
import {
  CardRating,
  CardComment,
  CardLecture,
  CardUser,
  CardCommonItem,
} from '@/components/listCard';
import { useFetchListData, useScrollToBottom } from '@/composables';
import { historyClient, starClient, watchClient } from '@/apis';
import { CommonTabType } from '../types';

export default defineComponent({
  components: {
    CardRating,
    CardComment,
    CardLecture,
    CardUser,
  },
  props: {
    /** 当前是否激活 */
    active: { type: Boolean, default: false },
    /** 类型，对应 tab key */
    type: { type: String as PropType<CommonTabType>, required: true },
  },
  setup(props) {
    const userId = inject<string>('userId') as string;

    const items = ref<CardCommonItem[]>([]);
    const enable = ref<boolean>(true);
    const {
      fetching, fetchingMore, fetchList, fetchMore,
    } = useFetchListData(
      async () => {
        switch (props.type) {
          case '收藏':
            return starClient.getStarList({ userId, limit: 20 }).then((resp) => {
              items.value = resp.data;
            });
          case '关注':
            return watchClient.getWatchList({ userId, limit: 20 }).then((resp) => {
              items.value = resp.data;
            });
          case '足迹':
            return historyClient.getHistoryList({ userId, limit: 20 }).then((resp) => {
              items.value = resp.data;
            });
          default: return undefined;
        }
      },
      async () => {
        // TODO: API 实现后确认 lastId 字段是否正确使用
        switch (props.type) {
          case '收藏':
            return starClient.getStarList({
              userId,
              lastId: items.value[items.value.length - 1].id,
              limit: 20,
            }).then((resp) => {
              items.value = [...items.value, ...resp.data];
              if (resp.data.length === 0) {
                enable.value = false;
              }
            });
          case '关注':
            return watchClient.getWatchList({
              userId,
              lastId: items.value[items.value.length - 1].id,
              limit: 20,
            }).then((resp) => {
              items.value = [...items.value, ...resp.data];
              if (resp.data.length === 0) {
                enable.value = false;
              }
            });
          case '足迹':
            return historyClient.getHistoryList({
              userId,
              lastId: items.value[items.value.length - 1].id,
              limit: 20,
            }).then((resp) => {
              items.value = [...items.value, ...resp.data];
              if (resp.data.length === 0) {
                enable.value = false;
              }
            });
          default: return undefined;
        }
      },
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
