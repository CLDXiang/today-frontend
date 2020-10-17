<template>
  <div class="list-card card-lecture">
    <div class="list-card__main-field">
      <div class="list-card__content-field">
        <div class="list-card__top-field">
          <span class="card-lecture__top-lecture-name float-left">
            {{ lecture.name }}
          </span>
          <span class="card-lecture__top-rating-stars float-right">
            {{ lecture.score }}
          </span>
          <span class="card-lecture__top-rating-number float-right">
            <five-stars
              :score="lecture.score"
            />
          </span>
        </div>
        <div class="list-card__middle-field">
          <span class="card-lecture__teacher-name float-left">
            {{ lecture.teachers.join(' ') }}
          </span>
          <span class="card-lecture__bottom-info-icon float-right">
            ICONS
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
.list-card__content-field {
  padding-top: 10px;
  padding-bottom: 6px;
}
.card-lecture {
  .card-lecture__top-rating-number {
    margin-left: 4px;
    color: #828282;
  }
  .card-lecture__teacher-name {
    color: #979797;
  }
}
five-stars {
  display: inline;
}
</style>
