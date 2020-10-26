<template>
  <div>
    <card-comment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CardCommentItem, CardComment } from '@/components/listCard';

export default defineComponent({
  components: {
    CardComment,
  },
  props: {
    comments: { type: Array as PropType<CardCommentItem[]>, required: true },
  },
});

</script>

<style lang="scss" scoped>

</style>
