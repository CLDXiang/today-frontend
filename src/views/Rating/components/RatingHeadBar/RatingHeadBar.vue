<template>
  <div class="head-bar">
    <side-avatar />
    <search-input
      :disabled="searchDisabled"
      @search-lecture="handleSearch"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideAvatar from '@/components/SideAvatar.vue';
import SearchInput from './SearchInput.vue';

export default defineComponent({
  components: {
    SideAvatar,
    SearchInput,
  },
  props: {
    searchDisabled: { type: Boolean, default: false },
  },
  emits: ['search-lecture'],
  data() {
    return {
    };
  },
  methods: {
    handleSearch(query: string) {
      this.$emit('search-lecture', query);
    },
  },
});
</script>

<style lang="scss" scoped>
.head-bar {
  width: 100%;

  padding: 0 12px;
  margin-bottom: 12px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #333;
}
</style>
