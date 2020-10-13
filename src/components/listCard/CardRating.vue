<template>
  <div class="list-card card-rating">
    <div class="list-card__avatar-field">
      <img src="/assets/default_avatar.png">
    </div>
    <div class="list-card__top-field">
      <span class="card-rating__top-nickname float-left">
        {{ rating.creator.nickname }}
      </span>
      <span class="card-rating__top-datetime float-right">
        13 minutes ago
      </span>
    </div>
    <div class="list-card__main-field">
      <span class="card-rating__content float-left">
        {{ rating.content }}
      </span>
    </div>
    <div class="list-card__bottom-field">
      <span class="card-rating__bottom-class-info float-left">
        {{ `${rating.lecture.name} ${rating.lecture.id}` }}
      </span>
      <span class="card-rating__bottom-info-icon float-right">
        ICONS
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CardRatingItem } from './types';

export default defineComponent({
  props: {
    /** 点评数据项 */
    rating: { type: Object as PropType<CardRatingItem>, required: true },
  },
});
</script>

<style lang='scss'>
</style>
