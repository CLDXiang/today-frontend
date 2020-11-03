<template>
  <div class="head-bar">
    <side-avatar />
    <div class="semester">
      <f-icon
        name="left"
        :height="16"
        :width="12"
        class="icon"
        @click="handleClickLeft"
      />
      <span class="semester__name">
        {{ semester }}
      </span>
      <f-icon
        name="right"
        :height="16"
        :width="12"
        class="icon"
        @click="handleClickRight"
      />
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
  props: {
    semester: { type: String, required: true },
  },
  emits: ['click-menu-button', 'click-left', 'click-right'],
  data() {
    return {
      /** 同步冷却 */
      cooldownCnt: 0,
    };
  },
  methods: {
    handleClickMenuButton() {
      this.$emit('click-menu-button');
    },
    handleClickLeft() {
      this.$emit('click-left');
    },
    handleClickRight() {
      this.$emit('click-right');
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
    display: flex;
    align-items: baseline;
    > .icon {
      cursor: pointer;
      color: $primary-color;
    }
    > .semester__name {
      width: 220px;
    }
  }

  > .action-group {
    display: flex;
    align-items: center;
    color: $primary-color;
  }
}
</style>
