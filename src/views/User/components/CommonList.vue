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
      />
      <card-comment
        v-else-if="item.type === 'comment'"
        :comment="item"
      />
      <card-lecture
        v-else-if="item.type === 'lecture'"
        :lecture="item"
      />
      <card-user
        v-else-if="item.type === 'user'"
        :user="item"
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
import { useScrollToBottom } from '@/composables';
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
    /** 正在加载数据 */
    const loading = ref(true);
    const userId = inject<string>('userId') as string;

    const items = ref<CardCommonItem[]>([]);

    /** 拉取并覆盖当前列表 */
    const fetchList = () => {
      loading.value = true;
      switch (props.type) {
        case '收藏':
          starClient.getStarList({ userId, limit: 20 }).then((resp) => {
            items.value = resp.data;
          }).finally(() => {
            loading.value = false;
          });
          break;
        case '关注':
          watchClient.getWatchList({ userId, limit: 20 }).then((resp) => {
            items.value = resp.data;
          }).finally(() => {
            loading.value = false;
          });
          break;
        case '足迹':
          historyClient.getHistoryList({ userId, limit: 20 }).then((resp) => {
            items.value = resp.data;
          }).finally(() => {
            loading.value = false;
          });
          break;
        default: break;
      }
    };

    /** 拉取并将结果附加在当前列表后 */
    const fetchMore = () => {
      // TODO: API 实现后确认 lastId 字段是否正确使用
      switch (props.type) {
        case '收藏':
          starClient.getStarList({
            userId,
            lastId: items.value[items.value.length - 1].id,
            limit: 20,
          }).then((resp) => {
            items.value = [...items.value, ...resp.data];
          });
          break;
        case '关注':
          watchClient.getWatchList({
            userId,
            lastId: items.value[items.value.length - 1].id,
            limit: 20,
          }).then((resp) => {
            items.value = [...items.value, ...resp.data];
          });
          break;
        case '足迹':
          historyClient.getHistoryList({
            userId,
            lastId: items.value[items.value.length - 1].id,
            limit: 20,
          }).then((resp) => {
            items.value = [...items.value, ...resp.data];
          });
          break;
        default: break;
      }
    };

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
    );

    return {
      items,
      scroll,
      loading,
    };
  },
});
</script>
