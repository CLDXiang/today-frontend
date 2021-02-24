<template>
  <div
    v-for="content in contents"
    :key="content.id"
  >
    <card-rating
      v-if="content.type === 'rating'"
      :rating="content"
    />
    <card-comment
      v-else-if="content.type === 'comment'"
      :comment="content"
    />
    <card-lecture
      v-else-if="content.type === 'lecture'"
      :lecture="content"
    />
    <card-user
      v-else-if="content.type === 'user'"
      :user="content"
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
  CardRating,
  CardComment,
  CardLecture,
  CardUser,
} from '@/components/listCard';

type CardCommonItem = CardRatingItem | CardCommentItem | CardLectureItem | CardUserItem;

export default defineComponent({
  components: {
    CardRating,
    CardComment,
    CardLecture,
    CardUser,
  },
  props: {
    contents: { type: Array as PropType<CardCommonItem[]>, required: true },
  },
});
</script>

<style lang="scss" scoped>

</style>
