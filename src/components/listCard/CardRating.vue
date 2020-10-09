<template>
  <div class="list-card card-rating">
    {{ rating.id }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CardRatingItem } from './types';

export default defineComponent({
  props: {
    /** 点评数据项 */
    rating: { type: Object as PropType<CardRatingItem>, required: true },
  },
});
</script>

<style lang='scss'>
</style>
