<template>
  <div class="head-bar">
    <span
      v-if="isBackVisible"
      class="back-btn"
      @click="$router.go('-1')"
    >
      <f-icon name="back" />
    </span>
    <side-avatar v-else />
    <search-input
      :disabled="searchDisabled"
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
    /** 是否显示返回按钮 */
    isBackVisible: { type: Boolean, default: false },
    /** 搜索是否禁用 */
    searchDisabled: { type: Boolean, default: false },
  },
  data() {
    return {
    };
  },
});
</script>

<style lang="scss" scoped>
.head-bar {
  width: 100%;

  padding: 0 12px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #333;

  > .back-btn {
    height: 20px;
    color: $primary-color;
  }
}
</style>
