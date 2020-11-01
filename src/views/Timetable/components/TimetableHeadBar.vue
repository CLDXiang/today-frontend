<template>
  <div class="head-bar">
    <side-avatar />
    <div class="semester">
      2020年秋季学期
    </div>
    <div
      class="action-group clickable"
      @click="handleClickMenuButton"
    >
      <f-icon
        name="menu-button"
        size="24"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideAvatar from '@/components/SideAvatar.vue';

export default defineComponent({
  components: {
    SideAvatar,
  },
  emits: ['click-menu-button'],
  methods: {
    handleClickMenuButton() {
      this.$emit('click-menu-button');
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/_clickable';

.head-bar {
  width: 100%;

  padding: 0 12px;
  margin-bottom: 12px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #333;

  > .semester {
    font-size: 18px;
  }

  > .action-group {
    display: flex;
    align-items: center;
    color: $primary-color;
  }
}
</style>
