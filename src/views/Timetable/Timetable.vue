<template>
  <div class="h-full w-full overflow-y-auto max-w-14xl relative flex flex-col pt-4 mx-auto">
    <a-drawer
      height="90%"
      placement="bottom"
      :closable="false"
      :visible="isDetailDialogVisible"
      @close="hideDetailDialog"
    >
      <timetable-detail-dialog-content @delete-course="(id) => removeSelectedCourse(id)" />
    </a-drawer>
    <a-drawer
      height="90%"
      placement="bottom"
      :closable="false"
      :visible="isConflictDialogVisible"
      :mask-closable="false"
    >
      <timetable-conflict-dialog-content
        :selected-courses-ids="selectedCoursesIds"
        :selected-courses-ids-from-database="selectedCoursesIdsFromDatabase"
        :courses="allCourses"
        @conflict-resolved="onConflictResolved"
      />
    </a-drawer>
    <a-drawer
      height="90%"
      placement="bottom"
      :closable="false"
      :visible="isSearchDialogVisible"
      class="md:hidden"
      @close="isSearchDialogVisible = false"
    >
      <timetable-search-bar
        :search-index="searchIndex"
        :is-loading-courses="isLoadingCourses"
        @add-course="addSelectedCourse"
        @hide-search-dialog="isSearchDialogVisible = false"
      />
    </a-drawer>
    <a-drawer
      height="90%"
      placement="right"
      :closable="false"
      :visible="isSelectedCourseListVisible"
      @close="isSelectedCourseListVisible = false"
    >
      <timetable-selected-course-list
        :courses="selectedCourses"
        @click-cloud="fetchSelectedCourses"
        @click-back="isSelectedCourseListVisible = false"
        @delete-course="(courseId) => removeSelectedCourse(courseId)"
        @show-detail="handleShowDetail"
      />
    </a-drawer>
    <timetable-head-bar
      :semester="semesterName"
      :hide-left="semesterIndex === 0"
      :hide-right="semesterIndex === semesterArray.length - 1"
      @click-menu-button="isSelectedCourseListVisible = true"
      @click-left="moveSemester(-1)"
      @click-right="moveSemester(1)"
    />
    <div class="flex items-start">
      <div class="overflow-x-auto flex flex-grow border border-gray-300 rounded-md">
        <div class="sticky left-0 z-20 pr-1 flex-initial flex-shrink-0 flex flex-col">
          <div class="flex-grow-0 flex-shrink-0 h-8 flex justify-center items-center py-0 px-1" />
          <div
            v-for="(section, index) in [
              { name: '1', clock: '08:00' },
              { name: '2', clock: '08:55' },
              { name: '3', clock: '09:55' },
              { name: '4', clock: '10:50' },
              { name: '5', clock: '11:45' },
              { name: '6', clock: '13:30' },
              { name: '7', clock: '14:25' },
              { name: '8', clock: '15:25' },
              { name: '9', clock: '16:20' },
              { name: '10', clock: '17:15' },
              { name: '11', clock: '18:30' },
              { name: '12', clock: '19:25' },
              { name: '13', clock: '20:20' },
              { name: '14', clock: '21:15' },
            ]"
            :key="index"
            :class="
              'relative flex-grow-0 flex-shrink-0 h-16 ' +
                'flex justify-center items-center w-8 py-0 px-4 ' +
                'bg-white bg-opacity-50 text-gray-500 font-semibold'
            "
          >
            <span class="absolute top-0 text-gray-400 font-normal text-xs">
              {{ section.clock }}
            </span>
            {{ section.name }}
          </div>
        </div>
        <timetable-day
          v-for="(sectionsByDay, index) in selectedSectionsByDay"
          :key="index"
          :title="['周一', '周二', '周三', '周四', '周五', '周六', '周日'][index]"
          :sections="sectionsByDay"
        />
      </div>
      <div
        class="flex-grow-1 max-w-sm my-0 mx-3 flex-auto flex-shrink-0 hidden md:block"
        style="height: 928px"
      >
        <timetable-search-bar
          :search-index="searchIndex"
          :is-loading-courses="isLoadingCourses"
          @add-course="addSelectedCourse"
          @hide-search-dialog="isSearchDialogVisible = false"
        />
      </div>

      <a-button
        class="fixed bottom-20 right-5 w-12 h-12 z-20 flex justify-center items-center md:hidden"
        type="primary"
        size="small"
        shape="circle"
        @click="isSearchDialogVisible = true"
      >
        <f-badge
          :visible="!selectedCoursesIds.size"
          offset-x="0.5"
          offset-y="1"
        >
          <f-icon
            name="search"
            size="24"
          />
        </f-badge>
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import {
  defineComponent, onMounted, ref,
} from 'vue';
import { userClient } from '@/apis';
import log from '@/utils/log';
import { semesterArray } from '@/utils/config';
import { message } from 'ant-design-vue';

import {
  TimetableDay,
  TimetableDetailDialogContent,
  TimetableConflictDialogContent,
  TimetableSearchBar,
  TimetableHeadBar,
  TimetableSelectedCourseList,
} from './components';
import {
  RawCourse,
  AllCourses,
} from './types';
import {
  useVuex,
  useSemester,
  useCourseSelection,
  useSearchIndex,
  useCloudSync,
} from './composables';

export default defineComponent({
  components: {
    TimetableDay,
    TimetableDetailDialogContent,
    TimetableConflictDialogContent,
    TimetableSearchBar,
    TimetableHeadBar,
    TimetableSelectedCourseList,
  },
  setup() {
    // TODO: 重命名 course 为 lesson

    /** 在与后端交互失败后进入离线模式，在下一次进入页面时再尝试修正 */
    const isOffline = ref(false);

    const {
      store, isUserLoggedIn, isDetailDialogVisible, hideDetailDialog,
    } = useVuex();

    const { semester, semesterIndex, semesterName } = useSemester();

    const {
      allCourses,
      selectedCoursesIds,
      selectedSectionsByDay,
      initSelectedSectionsByDay,
      isLoadingCourses,
      isSelectedCourseListVisible,
      selectedCourses,
      addSelectedCourse,
      removeSelectedCourse,
      replaceSelectedCourses,
    } = useCourseSelection(semester, isOffline);

    const { isSearchDialogVisible, initSearchIndex, searchIndex } = useSearchIndex(allCourses);

    const {
      fetchSelectedCourses,
      selectedCoursesIdsFromDatabase,
      isConflictDialogVisible,
      onConflictResolved,
    } = useCloudSync(semester, selectedCoursesIds, replaceSelectedCourses, isOffline);

    // 课程数据读取
    /** 从 JSON 中读取课程数据 */
    const getCoursesFromJSON = (JSONFileName: string) => {
      const filePath = `lessons/${JSONFileName}`;
      isLoadingCourses.value = true;
      axios
        .get(filePath)
        .then((resp) => {
          const allCoursesCache = {} as AllCourses;
          resp.data.forEach((course: RawCourse) => {
            if (course && course.id) {
              allCoursesCache[course.id] = course;
            }
          });
          allCourses.value = allCoursesCache;

          // 初始化
          initSelectedSectionsByDay();
          initSearchIndex();
          isLoadingCourses.value = false;

          // 若用户已登录，从后端同步所选课程 Id 列表
          if (isUserLoggedIn.value && !store.state.hasFetchedSelectedCourses) {
            fetchSelectedCourses();
            // 顺便更新用户信息
            userClient
              .getUserInfo({})
              .then((profile) => {
                store.commit('setUserProfile', profile);
              })
              .catch((err) => {
                log.error(err);
              });
          }
        })
        .catch((err) => {
          message.error('拉取课程数据失败，请尝试刷新页面', 1.5);
          throw err;
        });
    };
    onMounted(() => {
      // 读取课程信息
      getCoursesFromJSON(semesterArray[semesterIndex.value].jsonFileName);
    });

    /** 变更学期 */
    const moveSemester = (step: -1 | 1) => {
      if (step === -1 && semesterIndex.value === 0) {
        message.warn('已经是最后一个学期啦', 1);
        return;
      }
      if (step === 1 && semesterIndex.value === semesterArray.length - 1) {
        message.warn('已经是最新学期啦', 1);
        return;
      }
      semester.value = semesterArray[semesterIndex.value + step].key;
      selectedCoursesIds.value = new Set(store.state.selectedCoursesIds[semester.value]);
      selectedSectionsByDay.value = [{}, {}, {}, {}, {}, {}, {}];
      getCoursesFromJSON(semesterArray[semesterIndex.value].jsonFileName);
      fetchSelectedCourses(true);

      store.commit('setSemester', semester.value);
    };

    /** 根据 lesson id 显示详情页 */
    const handleShowDetail = (courseId: number) => {
      isSelectedCourseListVisible.value = false;
      store.commit('changeDetailPageContent', allCourses.value[courseId]);
      store.commit('showDetailDialog');
    };

    return {
      isUserLoggedIn,
      isDetailDialogVisible,
      hideDetailDialog,
      isSelectedCourseListVisible,
      selectedCoursesIds,
      selectedSectionsByDay,
      selectedCourses,
      addSelectedCourse,
      removeSelectedCourse,
      isSearchDialogVisible,
      searchIndex,
      selectedCoursesIdsFromDatabase,
      isConflictDialogVisible,
      onConflictResolved,
      fetchSelectedCourses,
      allCourses,
      isLoadingCourses,
      semester,
      semesterIndex,
      semesterName,
      semesterArray,
      moveSemester,
      handleShowDetail,
    };
  },
});
</script>
