<template>
  <div
    :class="[
      'h-16 mt-2 rounded-lg bg-white',
      'select-none hover:shadow-lg flex items-stretch transition-shadow',
    ]"
  >
    <span
      class="flex-initial flex-shrink-0 w-4 rounded-l-lg"
      :class="classCourseCard"
    />
    <span
      class="flex flex-col p-2"
      style="width: calc(100% - 1rem)"
    >
      <div
        :class="[
          'font-bold text-base text-gray-600',
          'overflow-hidden overflow-ellipsis whitespace-nowrap',
        ]"
      >
        {{ course.name }}
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-500 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">{{
          course.teachers.join(',')
        }}</span>
        <span class="flex">
          <a-button
            class="ml-1 rounded-md py-0 px-1.5"
            type="primary"
            size="small"
            @click.stop="handleClickDetailButton"
          >
            <span>详情</span>
          </a-button>
          <a-button
            class="ml-1 rounded-md py-0 px-1.5"
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
import { hashColorClassNames } from '@/utils/colors';
import { SelectedCourse } from '../../../types';

export default defineComponent({
  props: {
    course: { type: Object as PropType<SelectedCourse>, required: true },
  },
  emits: ['show-detail', 'delete-course'],
  computed: {
    classCourseCard(): string[] {
      return [
        hashColorClassNames(
          (this.course.code && parseInt(this.course.code.slice(this.course.code.length - 3), 10))
            || 0,
        ),
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

<style scoped>
.ant-btn.ant-btn-two-chinese-chars > *:not(.anticon) {
  margin-right: 0;
  letter-spacing: normal;
}
</style>
