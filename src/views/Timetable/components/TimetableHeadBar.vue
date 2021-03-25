<template>
  <div class="w-full py-0 px-3 mb-3 h-9 flex justify-between items-center text-gray-800">
    <side-avatar />
    <div class="text-lg flex items-baseline">
      <f-icon
        name="left"
        :height="16"
        :width="12"
        :class="`text-primary ${hideLeft ? 'opacity-0' : 'cursor-pointer'}`"
        @click="handleClickLeft"
      />
      <span class="w-56">
        {{ semester }}
      </span>
      <f-icon
        name="right"
        :height="16"
        :width="12"
        :class="`text-primary ${hideRight ? 'opacity-0' : 'cursor-pointer'}`"
        @click="handleClickRight"
      />
    </div>
    <div
      class="flex items-center f-clickable text-primary"
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
      handleClickLeft() {
        if (!props.hideLeft) {
          ctx.emit('click-left');
        }
      },
      handleClickRight() {
        if (!props.hideRight) {
          ctx.emit('click-right');
        }
      },
    };
  },
});
</script>
