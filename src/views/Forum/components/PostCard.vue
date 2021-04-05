<template>
  POST CARD
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Post } from '../types';

export default defineComponent({
  props: {
    post: { type: Object as PropType<Post>, default: {} },
  },
});
</script>
