<template>
  <div class="rating__rating-list">
    <card-reactive-rating
      v-for="rating in ratings"
      :key="rating.id"
      :rating="rating"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CardRatingItem, CardReactiveRating } from '@/components/listCard';

export default defineComponent({
  components: {
    CardReactiveRating,
  },
  props: {
    ratings: { type: Array as PropType<CardRatingItem[]>, required: true },
  },
});
</script>

<style lang="scss" scoped>
.rating__rating-list {
  background-color: #f2f2f2;
  padding-top: 6px;

  > .list-card {
    margin-bottom: 8px;
  }
}
</style>
