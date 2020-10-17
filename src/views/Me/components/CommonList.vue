<template>
  <div>
    <card-common
      v-for="content in contents"
      :key="content.id"
      :data="content"
      :type="rating"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
  CardRatingItem,
  CardCommentItem,
  CardLectureItem,
  CardUserItem,
} from '@/components/listCard';

type CardCommonItem = CardRatingItem | CardCommentItem | CardLectureItem | CardUserItem;

export default defineComponent({
  props: {
    contents: { type: Array as PropType<CardCommonItem[]>, required: true },
  },
});
</script>

<style lang="scss" scoped>

</style>
