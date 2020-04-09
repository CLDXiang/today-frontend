<template>
  <v-card>
    <v-card-title>{{ course.name }}</v-card-title>
    <v-divider />
    <v-card-text>
      <div v-if="course.code_id">
        课程号：{{
          course.code_id
        }}
      </div>
      <div>
        教师：{{
          (course.currentSlot && course.currentSlot.teacher.join(',')) || ''
        }}
      </div>
      <div>
        校区：{{ course.campus }}
        {{ (course.currentSlot && course.currentSlot.place) || '' }}
      </div>
      <div>
        开课院系：{{ course.department }}
      </div>
      <div>
        考试时间：{{ course.exam_time }}
      </div>
      <div>
        考试方式：{{ course.exam_type }}
      </div>
      <div>
        是否允许期中退课：{{ course.drop }}
      </div>
      <div
        v-for="(timeSlot, index) in course.time_slot"
        :key="index"
      >
        <div>
          上课时间 {{ index + 1 }}：
        </div>
        <div>
          {{
            `${timeSlot.week} 周，每周周${mapDay(timeSlot.day)}第 ${
              timeSlot.section
            } 节`
          }}：
        </div>
        <div>
          {{ timeSlot.place }}
        </div>
      </div>
    </v-card-text>
    <v-divider />
    <v-card-actions class="justify-end">
      <v-btn color="error" @click="handleClickDeleteButton">
        <v-icon>mdi-delete-forever-outline</v-icon>删除课程
      </v-btn>
      <v-btn color="primary" @click="handleClickCloseButton">
        <v-icon>mdi-arrow-collapse</v-icon>关闭
      </v-btn>
    </v-card-actions>
  </v-card>
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
    handleClickDeleteButton() {
      this.$store.commit('hideDetailDialog');
      this.$emit('deleteCourse');
      this.$store.commit('onDeleteDetailPageCourse');
    },
    handleClickCloseButton() {
      this.$store.commit('hideDetailDialog');
    },
  },
};
</script>

<style lang="scss" scoped></style>
