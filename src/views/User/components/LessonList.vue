<template>
  <div
    ref="scroll"
    class="h-full overflow-y-auto"
  >
    <card-lesson
      v-for="item in items"
      :key="item.id"
      :lesson="item"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, inject, ref, watch,
} from 'vue'; import { CardLessonItem, CardLesson } from '@/components/listCard';
import { selectClient } from '@/apis';
import { useScrollToBottom } from '@/composables';

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

    /** 拉取并覆盖当前列表 */
    const fetchList = () => {
      selectClient.getSelectedLessons({ userId, limit: 20 }).then((resp) => {
        items.value = resp.data;
      });
    };

    /** 拉取并将结果附加在当前列表后 */
    const fetchMore = () => {
      selectClient.getSelectedLessons({
        userId,
        lastId: items.value[items.value.length - 1].id,
        limit: 20,
      }).then((resp) => {
        items.value = [...items.value, ...resp.data];
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
    };
  },
});
</script>
