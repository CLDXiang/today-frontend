<template>
  <div
    ref="scroll"
    class="h-full overflow-y-auto space-y-2"
  >
    <template v-if="loading">
      <div
        v-for="i in 3"
        :key="i"
        class="p-4 pb-3 mb-2 bg-white rounded-lg shadow-lg h-36"
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
      :rating="item"
      class="f-clickable"
      @click="handleClickCardRating(item.lecture.id)"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, inject, ref, watch,
} from 'vue'; import { CardRatingItem, CardRating } from '@/components/listCard';
import { rateClient } from '@/apis';
import { useScrollToBottom } from '@/composables';

export default defineComponent({
  components: {
    CardRating,
  },
  props: {
    /** 当前是否激活 */
    active: { type: Boolean, default: false },
  },
  setup(props) {
    /** 正在加载数据 */
    const loading = ref(true);
    const userId = inject<string>('userId') as string;

    const items = ref<CardRatingItem[]>([]);

    /** 拉取并覆盖当前列表 */
    const fetchList = () => {
      loading.value = true;
      rateClient.getRatingListByUser({ userId, limit: 20 }).then((resp) => {
        items.value = resp.data;
      }).finally(() => {
        loading.value = false;
      });
    };

    /** 拉取并将结果附加在当前列表后 */
    const fetchMore = () => {
      rateClient.getRatingListByUser({
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
      loading,

    };
  },
  methods: {
    handleClickCardRating(ratingId: string) {
      this.$router.push(`/rating/lecture/${ratingId}`);
    },
  },
});

</script>

<style lang="scss" scoped>

</style>
