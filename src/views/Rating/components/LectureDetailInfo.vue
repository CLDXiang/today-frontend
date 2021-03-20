<template>
  <div class="lecture-info">
    <div class="lecture-info__title">
      课程信息
    </div>
    <div
      v-if="loading"
      class="py-3"
    >
      <f-skeleton />
    </div>
    <div
      v-else
      class="lecture-info__content"
    >
      <span>所属模块：{{ lectureInfo.category }}</span>
      <span>学分：{{ lectureInfo.detailInfo.credit }}</span>
      <span>开课院系：{{ lectureInfo.detailInfo.department }}</span>
      <span>校区：{{ lectureInfo.detailInfo.campus }}</span>
      <template v-if="isAllLectureInfoVisible">
        <span>主讲老师：{{ lectureInfo.taughtBy.join(' ') }}</span>
        <span>考试时间：{{ lectureInfo.detailInfo.examTime }}</span>
        <span>考试形式：{{ lectureInfo.detailInfo.examType }}</span>
        <span>是否允许期中退课：{{ withdrawable }}</span>
      </template>
    </div>
    <div
      v-if="!loading && !isAllLectureInfoVisible"
      class="lecture-info__more text-primary"
      @click="isAllLectureInfoVisible = true"
    >
      更多
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { LectureDetail } from '@/apis/lecture/types';

export default defineComponent({
  props: {
    lectureInfo: {
      type: Object as PropType<LectureDetail>,
      required: true,
    },
    loading: { type: Boolean, required: true },
  },
  setup(props) {
    const withdrawable = computed(() => {
      if (props.lectureInfo.detailInfo.withdrawable === 'true' || props.lectureInfo.detailInfo.withdrawable === '是') {
        return '是';
      }
      if (props.lectureInfo.detailInfo.withdrawable === '否' || props.lectureInfo.detailInfo.withdrawable === '') {
        return '否';
      }
      return '未知';
    });
    return {
      withdrawable,
    };
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
  padding: 0 8px;

  > .lecture-info__title {
    color: $gray2;
    font-size: 16px;
    line-height: 16px;
    align-self: flex-start;
  }
  > .lecture-info__content {
    flex-wrap: wrap;
    display: flex;

    > span {
      margin-top: 10px;
      color: $gray3;
      font-size: 12px;
      line-height: 12px;
      text-align: left;
      flex: 0 0 50%;
    }
  }

  > .lecture-info__more {
    font-size: 12px;
    line-height: 12px;
    margin-top: 12px;
    cursor: pointer;
  }
}
</style>
