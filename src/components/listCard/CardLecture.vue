<template>
  <div class="list-card card-lecture">
    <div class="list-card__main-field">
      <div class="list-card__content-field">
        <div class="list-card__top-field">
          <span class="card-lecture__top-lecture-name float-left">
            {{ lecture.name }}
          </span>
          <span class="card-lecture__top-rating-number float-right">
            {{ lecture.score }}
          </span>
          <span class="card-lecture__top-rating-stars float-right">
            <five-stars
              :score="lecture.score"
              :size="20"
            />
          </span>
        </div>
        <div class="list-card__middle-field">
          <span class="card-lecture__teacher-name float-left">
            {{ lecture.teachers.join(' ') }}
          </span>
        </div>
        <div class="card-rating__bottom-icon-field float-right">
          <span class="card-rating__bottom-icon">
            <f-icon
              name="reaction"
              size="16"
            />
          </span>
          <span class="card-rating__bottom-icon">
            <f-icon
              name="chat"
              size="16"
            />
            <span class="card-rating__bottom-statistics">
              {{ lecture.ratingCount }}
            </span>
          </span>
          <span class="card-rating__bottom-icon">
            <f-icon
              name="heart"
              size="16"
            />
            <span class="card-rating__bottom-statistics">
              {{ lecture.likeCount }}
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import FiveStars from '@/components/FiveStars.vue';
import { CardLectureItem } from './types';

export default defineComponent({
  components: {
    FiveStars,
  },
  props: {
    /** 课程数据项 */
    lecture: { type: Object as PropType<CardLectureItem>, required: true },
  },
});
</script>

<style lang='scss' scoped>
.card-lecture {
  .card-lecture__top-lecture-name {
    color: #4F4F4F;
    font-size: 18px;
  }
  .card-lecture__top-rating-number {
    margin-left: 6px;
    color: #828282;
  }
  .card-lecture__teacher-name {
    color: #828282;
    font-size: 14px;
  }
  .card-lecture__bottom-icons {

  }
}
five-stars {
  display: inline;
}
</style>
