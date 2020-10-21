<template>
  <div class="list-card card-user">
    <div class="list-card__main-field">
      <div class="list-card__avatar-field">
        <img src="default_avatar.png">
      </div>
      <div class="list-card__content-field">
        <div class="list-card__top-field">
          <span class="card-user__user-name float-left">
            {{ user.name }}
          </span>
        </div>
        <div class="list-card__middle-field float-left">
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
import { CardUserItem } from './types';

export default defineComponent({
  props: {
    /** 课程数据项 */
    user: { type: Object as PropType<CardUserItem>, required: true },
  },
});
</script>

<style lang='scss' scoped>
.card-user__user-name {
  color: $primary-color;
}
.card-user__user-signature {
  color: #979797;
}
</style>
