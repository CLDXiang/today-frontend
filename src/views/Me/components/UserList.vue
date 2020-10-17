<template>
  <div>
    <card-user
      v-for="user in users"
      :key="user.id"
      :user="user"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CardUserItem, CardUser } from '@/components/listCard';

export default defineComponent({
  components: {
    CardUser,
  },
  props: {
    users: { type: Array as PropType<CardUserItem[]>, required: true },
  },
  created() {
    // console.log('user created');
  },
  mounted() {
    // console.log('user mounted');
  },
});

</script>

<style lang="scss" scoped>

</style>
