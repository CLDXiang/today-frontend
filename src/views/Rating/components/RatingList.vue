<template>
  <div
    ref="scroll"
    class="bg-gray-100 pt-2 h-full overflow-y-auto"
  >
    <card-rating
      v-for="rating in ratings"
      :key="rating.id"
      class="f-clickable mb-2"
      :rating="rating"
      @click="$router.push(`/rating/lecture/${rating.lecture.id}`)"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watch,
} from 'vue';
import { CardRatingItem, CardRating } from '@/components/listCard';
import { rateClient } from '@/apis';
import { RatingType } from '@/utils/config';
import { useScrollToBottom } from '@/composables';

export default defineComponent({
  components: {
    CardRating,
  },
  props: {
    /** 当前是否激活 */
    active: { type: Boolean, default: false },
    /** 类型，对应 tab key */
    type: { type: String as PropType<RatingType>, required: true },
  },
  setup(props) {
    const ratings = ref<CardRatingItem[]>([]);

    /** 拉取并覆盖当前列表 */
    const fetchList = () => {
      rateClient.getRatingList({ limit: 20 }).then(({ data }) => {
        ratings.value = data;
      });
    };

    /** 拉取并将结果附加在当前列表后 */
    const fetchMore = () => {
      rateClient
        .getRatingList({
          lastId: ratings.value[ratings.value.length - 1].id,
          limit: 20,
        })
        .then(({ data }) => {
          ratings.value = [...ratings.value, ...data];
        });
    };

    watch(() => props.active, (value) => {
      // activeTab 改变时，若当前 tab 无数据则重新拉数据
      if (value && !ratings.value.length) {
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
      ratings,
      scroll,
    };
  },
});
</script>
