<template>
  <div
    class="list-card card-lecture"
    @click="handleClickCardLecture"
  >
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
      </div>
    </div>
    <div class="list-card__bottom-field">
      <span class="card-lecture__teacher-name float-left">
        {{ lecture.teachers.join(' ') }}
      </span>
      <div class="card-lecture__bottom-icon-field float-right">
        <span class="card-lecture__bottom-icon">
          <f-icon
            name="reaction"
            size="16"
          />
          <span class="card-lecture__bottom-statistics">
            {{ lecture.reactionCount }}
          </span>
        </span>
        <span class="card-lecture__bottom-icon">
          <f-icon
            name="chat"
            size="16"
          />
          <span class="card-lecture__bottom-statistics">
            {{ lecture.ratingCount }}
          </span>
        </span>
        <span class="card-lecture__bottom-icon">
          <f-icon
            name="heart"
            size="16"
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
  emits: ['card-lecture-clicked'],
  methods: {
    handleClickCardLecture() {
      this.$emit('card-lecture-clicked', this.lecture.id);
    },
  },
});
</script>

<style lang='scss' scoped>
.card-lecture {
  .list-card__bottom-field {
    margin-top: 10px;
  }
  .card-lecture__top-lecture-name {
    color: $gray2;
    font-size: 18px;
  }
  .card-lecture__top-rating-number {
    margin-left: 6px;
    color: $gray3;
  }
  .card-lecture__teacher-name {
    color: $gray3;
    font-size: 14px;
  }
  .card-lecture__bottom-icon-field {
    color: $gray3;
    .card-lecture__bottom-icon {
      margin-right: 10px;
      .card-lecture__bottom-statistics {
        margin-left: 4px;
      }
    }
  }
}
five-stars {
  display: inline;
}
</style>
