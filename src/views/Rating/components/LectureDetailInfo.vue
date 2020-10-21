<template>
  <div class="lecture-info">
    <div class="lecture-info__title">
      课程信息
    </div>
    <div class="lecture-info__content">
      <span>所属模块：暂无数据</span>
      <span>学分：{{ lectureInfo.credit }}</span>
      <span>开课院系：{{ lectureInfo.department }}</span>
      <span>校区：{{ lectureInfo.campus }}</span>
      <template v-if="isAllLectureInfoVisible">
        <span>主讲老师：{{ lectureInfo.taughtBy.join(' ') }}</span>
        <span>考试时间：{{ lectureInfo.examTime }}</span>
        <span>考试形式：{{ lectureInfo.examType }}</span>
        <span>是否允许期中退课：{{ lectureInfo.withdrawable }}</span>
      </template>
    </div>
    <div
      v-if="!isAllLectureInfoVisible"
      class="lecture-info__more"
      @click="isAllLectureInfoVisible = true"
    >
      更多
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { LectureItem } from '@/apis/types';

export default defineComponent({
  props: {
    lectureInfo: {
      type: Object as PropType<LectureItem>,
      required: true,
    },
  },
  data() {
    return {
      isAllLectureInfoVisible: false,
    };
  },
});
</script>

<style lang="scss" scoped>
.lecture-info {
  display: flex;
  flex-direction: column;
  margin-top: 18px;

  > .lecture-info__title {
    color: #4f4f4f;
    font-size: 16px;
    line-height: 16px;
    align-self: flex-start;
  }
  > .lecture-info__content {
    flex-wrap: wrap;
    display: flex;

    > span {
      margin-top: 10px;
      color: #828282;
      font-size: 12px;
      line-height: 12px;
      text-align: left;
      flex: 0 0 50%;
    }
  }

  > .lecture-info__more {
    color: $primary-color;
    font-size: 12px;
    line-height: 12px;
    margin-top: 12px;
  }
}
</style>
