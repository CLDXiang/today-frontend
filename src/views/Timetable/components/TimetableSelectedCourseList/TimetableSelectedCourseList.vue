<template>
  <div class="bg-blue-50 h-full rounded-l-lg flex flex-col">
    <div
      :class="[
        'flex-shrink-0 h-14 bg-white flex justify-between items-center',
        'p-3 font-bold text-lg text-gray-600',
      ]"
    >
      <span class="flex items-center">
        <span>已选课程列表</span>
        <span
          class="ml-2 h-5 f-clickable text-primary"
          @click="handleClickCloud"
        >
          <f-icon
            name="cloud"
            :width="24"
            :height="20"
          />
        </span>
      </span>
      <span
        class="justify-self-end text-gray-500 h-4 f-clickable"
        @click="$emit('click-back')"
      >
        <f-icon
          name="right"
          :width="10"
          :height="16"
        />
      </span>
    </div>
    <div class="pt-1 px-2 pb-3 flex-grow overflow-y-auto">
      <timetable-selected-course-card
        v-for="course in courses"
        :key="course.id"
        :course="course"
        @click="handleClickCard"
        @delete-course="(courseId) => $emit('delete-course', courseId)"
        @show-detail="(courseId) => $emit('show-detail', courseId)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SelectedCourse } from '../../types';
import TimetableSelectedCourseCard from './components/TimetableSelectedCourseCard.vue';

export default defineComponent({
  components: {
    TimetableSelectedCourseCard,
  },
  props: {
    courses: { type: Array as PropType<SelectedCourse[]>, required: true },
  },
  emits: ['click-cloud', 'click-back', 'delete-course', 'show-detail'],
  data() {
    return {
      /** 同步冷却 */
      cooldownCnt: 0,
    };
  },
  methods: {
    /** 点击云 */
    handleClickCloud() {
      if (this.cooldownCnt > 0) {
        this.$message.warn(`请等待${this.cooldownCnt}秒再进行下一次云同步~`);
        return;
      }
      const cooldown = () => {
        setTimeout(() => {
          this.cooldownCnt -= 1;
          if (this.cooldownCnt > 0) {
            cooldown();
          }
        }, 1000);
      };

      this.cooldownCnt = 60;
      cooldown();
      this.$emit('click-cloud');
    },
    /** 点击卡片 */
    handleClickCard() {
      // TODO: 待后端传入 lectureId 后跳转至评课页
    },
  },
});
</script>
