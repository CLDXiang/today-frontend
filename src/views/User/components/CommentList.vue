<template>
  <div
    ref="scroll"
    class="h-full overflow-y-auto space-y-2"
  >
    <!-- TODO: 接入后加 skeleton  -->
    <card-comment
      v-for="item in items"
      :key="item.id"
      :comment="item"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, inject, ref, watch,
} from 'vue';
import { CardCommentItem, CardComment } from '@/components/listCard';
import { commentClient } from '@/apis';
import { useFetchListData, useScrollToBottom } from '@/composables';

export default defineComponent({
  components: {
    CardComment,
  },
  props: {
    /** 当前是否激活 */
    active: { type: Boolean, default: false },
  },
  setup(props) {
    const userId = inject<string>('userId');

    const items = ref<CardCommentItem[]>([]);
    const enable = ref<boolean>(true);
    const {
      fetching, fetchingMore, fetchList, fetchMore,
    } = useFetchListData(
      async () => commentClient
        .getCommentList({ userId, limit: 20 }).then((resp) => {
          items.value = resp.data;
        }),
      async () => commentClient
        .getCommentList({
          userId,
          lastId: items.value[items.value.length - 1].id,
          limit: 20,
        }).then((resp) => {
          items.value = [...items.value, ...resp.data];
          if (resp.data.length === 0) {
            enable.value = false;
          }
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
