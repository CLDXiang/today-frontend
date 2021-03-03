<template>
  <div class="head-bar flex-shrink-0">
    <span
      v-if="isBackVisible"
      class="back-btn"
      @click="handleClickBack"
    >
      <f-icon
        name="back"
        :width="14"
        :height="24"
      />
    </span>
    <side-avatar v-else />
    <slot>
      <search-input
        :disabled="searchDisabled"
      />
    </slot>
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
    /** 是否显示返回按钮 */
    isBackVisible: { type: Boolean, default: false },
    /** 搜索是否禁用 */
    searchDisabled: { type: Boolean, default: false },
  },
  emits: ['click-back'],
  methods: {
    handleClickBack() {
      this.$emit('click-back');
    },
  },
});
</script>

<style lang="scss" scoped>
.head-bar {
  width: 100%;

  padding: 0 12px;
  padding-top: $head-margin;

  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #333;

  > .back-btn {
    cursor: pointer;
    height: 24px;

    &:hover {
      color: $primary-color;
    }
  }
}
</style>
