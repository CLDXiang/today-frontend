<template>
  <div class="rating__rating-list">
    <card-rating
      v-for="rating in ratings"
      :key="rating.id"
      :rating="rating"
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
