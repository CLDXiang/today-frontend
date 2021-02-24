<template>
  <div class="rating__rating-list">
    <card-rating
      v-for="rating in ratings"
      :key="rating.id"
      class="clickable"
      :rating="rating"
      @click="$router.push(`/rating/lecture/${rating.lecture.id}`)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CardRatingItem, CardRating } from '@/components/listCard';

export default defineComponent({
  components: {
    CardRating,
  },
  props: {
    ratings: { type: Array as PropType<CardRatingItem[]>, required: true },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/_clickable';

.rating__rating-list {
  background-color: #f2f2f2;
  padding-top: 6px;

  > .list-card {
    margin-bottom: 8px;
  }
}
</style>
