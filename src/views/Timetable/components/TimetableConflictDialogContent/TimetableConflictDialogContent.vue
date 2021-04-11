<template>
  <div class="h-full bg-white py-5 px-3 flex flex-col items-stretch">
    <div class="flex-initial flex-shrink-0 self-center text-xl text-gray-800 mb-3">
      课表云同步
    </div>
    <div class="flex-initial flex-shrink-0 self-center text-sm mb-5 text-gray-600">
      本地数据与服务器不一致，需要进行同步
    </div>
    <div class="h-0 flex-grow flex justify-between">
      <div class="flex-grow flex flex-col my-0 mx-1">
        <div class="self-center text-sm font-bold mb-1 text-gray-600">
          本地新增课程
        </div>
        <lesson-list :selected-courses="selectedCoursesOnlyInLocal" />
        <div class="self-center">
          <f-button
            shape="circle"
            @click="() => handleChoosen('local')"
          >
            使用本地课表
          </f-button>
        </div>
      </div>
      <div class="flex-grow flex flex-col my-0 mx-1">
        <div class="self-center text-sm font-bold mb-1 text-gray-600">
          云端新增课程
        </div>
        <lesson-list :selected-courses="selectedCoursesOnlyInDataBase" />
        <div class="self-center">
          <f-button
            shape="circle"
            depressed
            @click="() => handleChoosen('cloud')"
          >
            使用云端课表
          </f-button>
        </div>
      </div>
    </div>
    <div class="flex-grow-0 flex-shrink-0 flex justify-end my-4 mx-5">
      <f-button
        shape="circle"
        type="primary"
        @click="() => handleChoosen('both')"
      >
        合并
      </f-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { AllCourses } from '../../types';
import { SelectedCourseInfo } from './types';
import LessonList from './components/LessonList.vue';

export default defineComponent({
  components: {
    LessonList,
  },
  props: {
    selectedCoursesIds: { type: Set as PropType<Set<number>>, required: true },
    selectedCoursesIdsFromDatabase: { type: Set as PropType<Set<number>>, required: true },
    courses: { type: Object as PropType<AllCourses>, required: true },
  },
  emits: ['conflict-resolved'],
  setup(props, ctx) {
    return {
      /** （展示用）仅存在于本地的课程列表 */
      selectedCoursesOnlyInLocal: computed<SelectedCourseInfo[]>(() =>
        [...props.selectedCoursesIds]
          .filter((x) => !props.selectedCoursesIdsFromDatabase.has(x))
          .map((courseId) => ({
            codeId: props.courses[courseId].code_id,
            name: props.courses[courseId].name,
          }))),
      /** （展示用）仅存在于服务端的课程列表 */
      selectedCoursesOnlyInDataBase: computed<SelectedCourseInfo[]>(() =>
        [...props.selectedCoursesIdsFromDatabase]
          .filter((x) => !props.selectedCoursesIds.has(x))
          .map((courseId) => ({
            codeId: props.courses[courseId].code_id,
            name: props.courses[courseId].name,
          }))),

      /** 解决冲突回调 */
      handleChoosen(choice: 'both' | 'local' | 'cloud') {
        if (choice === 'both') {
          const combinedSelectedCoursesIds = new Set([
            ...props.selectedCoursesIds,
            ...props.selectedCoursesIdsFromDatabase,
          ]);
          ctx.emit('conflict-resolved', combinedSelectedCoursesIds, true, true);
        } else if (choice === 'local') {
          ctx.emit('conflict-resolved', props.selectedCoursesIds, false, true);
        } else if (choice === 'cloud') {
          ctx.emit('conflict-resolved', props.selectedCoursesIdsFromDatabase, true, false);
        }
      },
    };
  },
});
</script>
