<template>
  <div class="selected-course-list-box">
    <div class="selected-course-list__header">
      <span>
        <span>已选课程列表</span>
        <span
          class="icon-cloud f-clickable"
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
        class="icon-right f-clickable"
        @click="$emit('click-back')"
      >
        <f-icon
          name="right"
          :width="10"
          :height="16"
        />
      </span>
    </div>
    <div class="selected-course-list">
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

<style lang="scss" scoped>
$header-height: 55px;

.selected-course-list-box {
  background-color: #e3f1f3;
  height: 100%;
  border-radius: 16px 0 0 16px;
  display: flex;
  flex-direction: column;

  > .selected-course-list__header {
    flex-shrink: 0;
    height: $header-height;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px;
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
    color: #4f4f4f;

    > span:first-child {
      display: flex;
      align-items: center;
      > .icon-cloud {
        margin-left: 8px;
        color: $primary-color;
        height: 20px;
      }
    }

    > .icon-right {
      justify-self: flex-end;
      color: #828282;
      height: 16px;
    }
  }

  > .selected-course-list {
    padding: 4px 8px 12px 10px;
    flex: 1;
    overflow-y: auto;
  }
}
</style>
