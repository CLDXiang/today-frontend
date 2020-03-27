<template>
  <div class="timetable__detail-page">
    <span class="detail-page__title">{{ course.name }}</span>
    <span class="detail-page__text">{{
      course.code_id ? `(${course.code_id})` : ''
    }}</span>
    <span class="detail-page__text">
      教师：{{
        (course.currentSlot && course.currentSlot.teacher.join(',')) || ''
      }}</span
    >
    <span class="detail-page__text"
      >校区：{{ course.campus }}
      {{ (course.currentSlot && course.currentSlot.place) || '' }}</span
    >
    <span class="detail-page__text">开课院系：{{ course.department }}</span>
    <span class="detail-page__text">考试时间：{{ course.exam_time }}</span>
    <span class="detail-page__text">考试方式：{{ course.exam_type }}</span>
    <span class="detail-page__text">是否允许期中退课：{{ course.drop }}</span>
    <div
      class="detail-page__time-slot"
      v-for="(timeSlot, index) in course.time_slot"
      :key="index"
    >
      <span class="detail-page__text">上课时间 {{ index + 1 }}：</span>
      <span class="detail-page__text">
        {{
          `${timeSlot.week} 周，每周周${mapDay(timeSlot.day)}第 ${
            timeSlot.section
          } 节`
        }}：</span
      >
      <span class="detail-page__text"> {{ timeSlot.place }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    course: Object,
  },
  data() {
    return {};
  },
  methods: {
    mapDay(day) {
      return ['一', '二', '三', '四', '五', '六', '日'][day - 1];
    },
  },
};
</script>

<style lang="scss" scoped>
.timetable__detail-page {
  display: flex;
  flex-direction: column;
}

.detail-page__title {
  font-size: 12px;
  font-weight: 600;
}

.detail-page__text {
  font-size: 10px;
  word-wrap: break-word;
}

.detail-page__time-slot {
  display: flex;
  flex-direction: column;
}
</style>
