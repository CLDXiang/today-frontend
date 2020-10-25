<template>
  <div
    class="list-card card-lecture"
  >
    <div class="list-card__main-field">
      <div class="list-card__content-field">
        <div class="list-card__top-field">
          <span class="card-lecture__top-lecture-name">
            {{ lecture.name }}
          </span>
          <div class="card-lecture__top-right">
            <span class="card-lecture__top-rating-stars">
              <five-stars
                :score="lecture.score"
                :size="20"
              />
            </span>
            <span class="card-lecture__top-rating-number">
              {{ lecture.score }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="list-card__bottom-field">
      <span class="card-lecture__teacher-name">
        {{ lecture.teachers.join(' ') }}
      </span>
      <div class="card-lecture__bottom-icon-field">
        <span class="card-lecture__bottom-icon">
          <f-icon
            name="reaction"
            size="14"
          />
          <span class="card-lecture__bottom-statistics">
            {{ lecture.reactionCount }}
          </span>
        </span>
        <span class="card-lecture__bottom-icon">
          <f-icon
            name="chat"
            size="14"
          />
          <span class="card-lecture__bottom-statistics">
            {{ lecture.ratingCount }}
          </span>
        </span>
        <span class="card-lecture__bottom-icon">
          <f-icon
            name="heart"
            size="14"
          />
          <span class="card-lecture__bottom-statistics">
            {{ lecture.likeCount }}
          </span>
        </span>
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
  .list-card__top-field {
    display: flex;
    justify-content: space-between;
    > .card-lecture__top-right {
      display: flex;
    }
  }
  .list-card__bottom-field {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .card-lecture__top-lecture-name {
    color: $gray2;
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .card-lecture__top-rating-number {
    margin-left: 6px;
    color: $gray3;
  }
  .card-lecture__teacher-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: $gray3;
    font-size: 14px;
  }
  .card-lecture__bottom-icon-field {
    display: flex;
    color: $gray3;
    .card-lecture__bottom-icon {
      margin-left: 10px;
      display: flex;
      align-items: center;
      .card-lecture__bottom-statistics {
        margin-left: 4px;
        font-size: 12px;
      }
    }
  }
}
five-stars {
  display: inline;
}
</style>
