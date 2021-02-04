<template>
  <div>
    <card-lesson
      v-for="lesson in lessons"
      :key="lesson.id"
      :lesson="lesson"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CardLessonItem, CardLesson } from '@/components/listCard';

export default defineComponent({
  components: {
    CardLesson,
  },
  props: {
    lessons: { type: Array as PropType<CardLessonItem[]>, required: true },
  },
});

</script>

<style lang="scss" scoped>

</style>
