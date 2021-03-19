<template>
  <div class="head-bar">
    <side-avatar />
    <div class="semester">
      <f-icon
        name="left"
        :height="16"
        :width="12"
        :class="`icon ${hideLeft ? 'opacity-0' : 'cursor-pointer'}`"
        @click="handleClickLeft"
      />
      <span class="semester__name">
        {{ semester }}
      </span>
      <f-icon
        name="right"
        :height="16"
        :width="12"
        :class="`icon ${hideRight ? 'opacity-0' : 'cursor-pointer'}`"
        @click="handleClickRight"
      />
    </div>
    <div
      class="action-group f-clickable"
      @click="$emit('click-menu-button')"
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
    hideLeft: { type: Boolean, default: false },
    hideRight: { type: Boolean, default: false },
  },
  emits: ['click-menu-button', 'click-left', 'click-right'],
  setup(props, ctx) {
    return {
      handleClickLeft: () => {
        if (!props.hideLeft) {
          ctx.emit('click-left');
        }
      },
      handleClickRight: () => {
        if (!props.hideRight) {
          ctx.emit('click-right');
        }
      },
    };
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

  > .semester {
    font-size: 18px;
    display: flex;
    align-items: baseline;
    > .icon {
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
