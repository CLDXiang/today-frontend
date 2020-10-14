<template>
  <div class="list-card card-lecture">
    <div class="list-card__main-field">
      <div class="list-card__content-field">
        <div class="list-card__top-field">
          <span class="card-lecture__top-rating float-right">
            RATINGS
          </span>
          <span class="card-lecture__top-lecture-name float-left">
            {{ lecture.name }}
          </span>
        </div>
        <div class="list-card__middle-field">
          <span class="card-lecture__teacher-name float-left">
            {{ lecture.teachers.join(' ') }}
          </span>
        </div>
      </div>
    </div>
    <div class="list-card__bottom-field">
      <span class="card-lecture__bottom-reaction float-left">
        REACTIONS
      </span>
      <span class="card-lecture__bottom-info-icon float-right">
        ICONS
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CardLectureItem } from './types';

export default defineComponent({
  props: {
    /** 课程数据项 */
    lecture: { type: Object as PropType<CardLectureItem>, required: true },
  },
});
</script>

<style lang='scss' scoped>
.card-lecture {
  .card-lecture__teacher-name {
    color: #979797;
  }
}
</style>
