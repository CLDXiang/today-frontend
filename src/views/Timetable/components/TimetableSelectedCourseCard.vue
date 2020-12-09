<template>
  <div class="selected-course-card">
    <span
      class="selected-course-color"
      :class="classCourseCard"
    />
    <span class="selected-course-content">
      <div class="card-name">{{ course.name }}</div>
      <div class="card-subline">
        <span class="card-teachers">{{ course.teachers.join(',') }}</span>
        <span class="card-action">
          <a-button
            type="primary"
            size="small"
            @click.stop="handleClickDetailButton"
          >
            <span>详情</span>
          </a-button>
          <a-button
            type="danger"
            size="small"
            @click.stop="handleClickDeleteButton"
          >
            <span>删除</span>
          </a-button>
        </span>
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SelectedCourse } from '../types';

export default defineComponent({
  props: {
    course: { type: Object as PropType<SelectedCourse>, required: true },
  },
  emits: ['show-detail', 'delete-course'],
  computed: {
    classCourseCard(): string[] {
      return [
        `color-${
          (this.course.code
            && parseInt(this.course.code.slice(this.course.code.length - 3), 10) % 96)
          || 0
        }`,
      ];
    },
  },
  methods: {
    /** 点击详情按钮 */
    handleClickDetailButton() {
      this.$emit('show-detail', this.course.id);
    },
    /** 点击删除按钮 */
    handleClickDeleteButton() {
      this.$emit('delete-course', this.course.id);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/_timetable';

.selected-course-card {
  height: 60px;
  margin-top: 8px;
  border-radius: 8px;
  background-color: #fff;
  user-select: none;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  }
  display: flex;
  align-items: stretch;
  transition: box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

  > .selected-course-color {
    flex: 0 0 auto;
    width: 15px;
    border-radius: 8px 0 0 8px;
  }

  > .selected-course-content {
    width: calc(100% - 15px);
    display: flex;
    flex-direction: column;
    padding: 10px 7px 8px;

    > .card-name {
      font-weight: 700;
      font-size: 16px;
      line-height: 16px;
      color: #4f4f4f;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    > .card-subline {
      display: flex;
      justify-content: space-between;
      align-items: center;

      > .card-teachers {
        color: #828282;
        font-size: 14px;
        line-height: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      > .card-action {
        display: flex;
        > .ant-btn {
          margin-left: 5px;
          border-radius: 6px;
          padding: 0 6px;

          &.ant-btn-two-chinese-chars > *:not(.anticon) {
            margin-right: 0;
            letter-spacing: normal;
          }
        }
      }
    }
  }
}
</style>
