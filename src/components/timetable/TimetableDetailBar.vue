<template>
  <v-card v-if="course.id" class="mx-3 detail-bar" min-width="320px" height="928px">
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
          (course.currentSlot && course.currentSlot.teacher.join(', ')) || ''
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
    <v-card-actions class="justify-center">
      <v-btn v-if="isDetailPageCourseDeleted" color="primary" @click="handleClickRestoreButton">
        <v-icon>mdi-delete-restore</v-icon>撤销删除
      </v-btn>
      <v-btn v-else color="error" @click="handleClickDeleteButton">
        <v-icon>mdi-delete-forever-outline</v-icon>删除课程
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-card v-else class="mx-3" min-width="320px" height="928px">
    <v-card-text>
      点击课程查看详细信息
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    course: Object,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['isDetailPageCourseDeleted']),
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
    handleClickRestoreButton() {
      this.$emit('restoreCourse');
      this.isCourseDeleted = false;
      this.$store.commit('onRestoreDetailPageCourse');
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-bar {
  overflow-y: auto;
}
</style>
