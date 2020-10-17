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
import { CardCommonItem, CardCommon } from '@/components/listCard';

export default defineComponent({
  components: {
    CardCommon,
  },
  props: {
    ratings: { type: Array as PropType<CardCommonItem[]>, required: true },
  },
});

</script>

<style lang="scss" scoped>

</style>
