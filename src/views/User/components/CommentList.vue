<template>
  <div
    ref="scroll"
    class="h-full overflow-y-auto"
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
import { useScrollToBottom } from '@/composables';

export default defineComponent({
  components: {
    CardComment,
  },
  props: {
    /** 当前是否激活 */
    active: { type: Boolean, default: false },
  },
  setup(props) {
    /** 正在加载数据 */
    const loading = ref(true);
    const userId = inject<string>('userId');

    const items = ref<CardCommentItem[]>([]);

    /** 拉取并覆盖当前列表 */
    const fetchList = () => {
      loading.value = true;
      commentClient.getCommentList({ userId, limit: 20 }).then((resp) => {
        items.value = resp.data;
      }).finally(() => {
        loading.value = false;
      });
    };

    /** 拉取并将结果附加在当前列表后 */
    const fetchMore = () => {
      loading.value = true;
      commentClient.getCommentList({
        userId,
        lastId: items.value[items.value.length - 1].id,
        limit: 20,
      }).then((resp) => {
        items.value = [...items.value, ...resp.data];
      }).finally(() => {
        loading.value = false;
      });
    };

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
      loading,
    };
  },
});
</script>
