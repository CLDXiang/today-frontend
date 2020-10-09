<template>
  <div class="list-card card-lecture">
    {{ lecture.id }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CardLectureItem } from './types';

export default defineComponent({
  props: {
    /** 课程数据项 */
    lecture: { type: Object as PropType<CardLectureItem>, required: true },
  },
});
</script>

<style lang='scss'>
</style>
