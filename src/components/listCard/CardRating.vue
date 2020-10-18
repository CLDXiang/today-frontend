<template>
  <div class="list-card card-rating">
    <div class="list-card__main-field">
      <div class="list-card__avatar-field">
        <img src="/assets/default_avatar.png">
      </div>
      <div class="list-card__content-field">
        <div class="list-card__top-field">
          <span class="card-rating__top-nickname float-left">
            {{ rating.creator.nickname }}
          </span>
          <span class="card-rating__top-datetime float-right">
            <time-diff
              :time-created="rating.createdAt"
            />
          </span>
        </div>
        <div class="list-card__middle-field">
          <span class="card-rating__content float-left">
            {{ rating.content }}
          </span>
        </div>
      </div>
    </div>
    <div class="list-card__bottom-field">
      <span class="card-rating__bottom-class-info float-left">
        {{ `${rating.lecture.name} ${rating.lecture.teachers.join(' ')}` }}
      </span>
      <span class="card-rating__bottom-info-icon float-right">
        ICON1 ICON2 ICON3
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import TimeDiff from '@/components/TimeDiff.vue';
import { CardRatingItem } from './types';

export default defineComponent({
  components: {
    TimeDiff,
  },
  props: {
    /** 点评数据项 */
    rating: { type: Object as PropType<CardRatingItem>, required: true },
  },
});
</script>

<style lang='scss' scoped>
.list-card {
  padding: 16px 16px 10px 16px;
}

.card-rating {
  .card-rating__content {
    color: #979797;
  }
  .card-rating__top-datetime {
    color: #c4c4c4;
  }
  .card-rating__content {
    text-align: left;
  }
  > .list-card__main-field .list-card__content-field .list-card__middle-field {
    margin-bottom: 30px;
  }
}
</style>