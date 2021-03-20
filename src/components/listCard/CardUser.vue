<template>
  <div class="list-card card-user">
    <div class="list-card__main-field">
      <div class="list-card__avatar-field">
        <img
          class="avatar"
          :src="processAvatar(user.avatar)"
        >
      </div>
      <div class="list-card__content-field">
        <div class="list-card__top-field">
          <span class="card-user__user-name text-primary">
            {{ user.name }}
          </span>
        </div>
        <div class="list-card__middle-field">
          <span class="card-user__user-signature">
            {{ user.bio }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useProcessAvatar } from '@/composables';
import { CardUserItem } from './types';

export default defineComponent({
  props: {
    /** 课程数据项 */
    user: { type: Object as PropType<CardUserItem>, required: true },
  },
  setup() {
    const { processAvatar } = useProcessAvatar();
    return {
      processAvatar,
    };
  },
});
</script>

<style lang='scss' scoped>
.card-user__user-name {
  font-weight: bold;
  font-size: 16px;
}
.card-user__user-signature {
  color: #979797;
}
</style>
