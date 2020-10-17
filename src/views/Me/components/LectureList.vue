<template>
  <div>
    <card-lecture
      v-for="lecture in lectures"
      :key="lecture.id"
      :lecture="lecture"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CardLectureItem, CardLecture } from '@/components/listCard';

export default defineComponent({
  components: {
    CardLecture,
  },
  props: {
    lectures: { type: Array as PropType<CardLectureItem[]>, required: true },
  },
  created() {
    // console.log('lecture created');
  },
  mounted() {
    // console.log('lecture mounted');
  },
});

</script>

<style lang="scss" scoped>

</style>
