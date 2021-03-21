<template>
  <div class="list-card card-lesson">
    <div class="list-card__main-field">
      <div class="list-card__content-field">
        <div class="list-card__top-field">
          <span class="card-lesson__top-lesson-name text-gray-600">
            {{ lesson.name }}
          </span>
          <div class="card-lesson__top-right">
            {{ lesson.codeFull }}
          </div>
        </div>
      </div>
    </div>
    <div class="list-card__bottom-field">
      <span class="card-lesson__teacher-name text-gray-500">
        {{ lesson.teachers.join(' ') }}
      </span>
      <div class="card-lesson__smester">
        {{ lesson.semester }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CardLessonItem } from './types';

export default defineComponent({
  props: {
    /** 课程数据项 */
    lesson: { type: Object as PropType<CardLessonItem>, required: true },
  },
});
</script>

<style lang="scss" scoped>
// TODO: 这个 Card 样式并未细调
.card-lesson {
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
  .card-lesson__top-lesson-name {
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .card-lesson__teacher-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
  }
}
</style>
