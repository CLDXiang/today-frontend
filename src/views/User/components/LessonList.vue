<template>
  <div
    ref="scroll"
    class="h-full overflow-y-auto space-y-2"
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
    <card-lesson
      v-for="item in items"
      :key="item.id"
      :lesson="item"
    />
    <template v-if="fetchingMore">
      <div class="p-4 pb-3 mb-2 bg-white rounded-lg shadow-lg h-18">
        <f-skeleton :width="['100%', '50%']" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, inject, ref, watch,
} from 'vue'; import { CardLessonItem, CardLesson } from '@/components/listCard';
import { selectClient } from '@/apis';
import { useFetchListData, useScrollToBottom } from '@/composables';

export default defineComponent({
  components: {
    CardLesson,
  },
  props: {
    /** 当前是否激活 */
    active: { type: Boolean, default: false },
  },
  setup(props) {
    const userId = inject<string>('userId');

    const items = ref<CardLessonItem[]>([]);
    const enable = ref<boolean>(true);
    const {
      fetching, fetchingMore, fetchList, fetchMore,
    } = useFetchListData(
      async () => selectClient
        .getSelectedLessons({ userId, limit: 20 }).then((resp) => {
          items.value = resp.data;
        }),
      async () => selectClient.getSelectedLessons({
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
