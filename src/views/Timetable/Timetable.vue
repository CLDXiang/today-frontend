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
        @addcourse="addSelectedCourse"
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
          @addcourse="addSelectedCourse"
          @hide-search-dialog="isSearchDialogVisible = false"
        />
        <!-- <timetable-search-bar
          :search-index="searchIndex"
          :is-loading-courses="isLoadingCourses"
          @addcourse="addSelectedCourse"
        /> -->
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
  computed, defineComponent, onMounted, ref,
} from 'vue';
import { useStore } from 'vuex';
import { selectClient, userClient } from '@/apis';
import log from '@/utils/log';
import { semesterArray } from '@/utils/config';
import { message } from 'ant-design-vue';
import { areSetsSame, mapDay } from './utils';

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
  SearchIndexItem,
  SearchIndexItemTimeSlot,
  Sections,
  SelectedCourse,
} from './types';

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
    // Vuex
    const store = useStore();

    /** 当前用户是否已登录 */
    const isUserLoggedIn = computed<boolean>(() => store.getters.userLoggedIn);
    /** 课程详情卡片是否显示 */
    const isDetailDialogVisible = computed<boolean>(() => store.state.isDetailDialogVisible);
    const setSelectedCourses = (payload: {
      semester: string;
      selectedCoursesIds: number[];
      selectedSectionsByDay: Sections[];
    }) => store.commit('setSelectedCourses', payload);
    const hideDetailDialog = () => store.commit('hideDetailDialog');

    // 学期

    /** 当前选择学期 */
    const semester = ref('2020-2021学年2学期');
    /** 当前学期在学期数组的索引值 */
    const semesterIndex = computed<number>(
      () => semesterArray.findIndex((sem) => sem.key === semester.value),
    );
    /** 展示的学期名 */
    const semesterName = computed(() => semesterArray[semesterIndex.value].name);

    onMounted(() => {
      // 从 Vuex 中读取用户上一次选取的学期来初始化
      semester.value = store.state.semester;
    });

    // 选课

    /** 在与后端交互失败后进入离线模式，在下一次进入页面时再尝试修正 */
    const isOffline = ref(false);
    /** 是否正在读取课程数据 */
    const isLoadingCourses = ref(true);
    /** 课程数据 */
    const allCourses = ref<AllCourses>({});
    /** 当前学期已加入课程 Id */
    const selectedCoursesIds = ref(new Set<number>());
    /** 按周一到周日划分的 sections 数据 */
    const selectedSectionsByDay = ref<Sections[]>([{}, {}, {}, {}, {}, {}, {}]);
    /** 已选课程列表数据 */
    const selectedCourses = computed<SelectedCourse[]>(() => {
      if (isLoadingCourses.value) {
        // 还没加载好 JSON
        return [];
      }
      return [...selectedCoursesIds.value].map((lessonId) => {
        const {
          id, name, teachers, code,
        } = allCourses.value[lessonId];
        return {
          id,
          name,
          teachers: teachers.split(','),
          code,
        };
      });
    });
    /** 是否显示已选课程列表抽屉 */
    const isSelectedCourseListVisible = ref(false);
    onMounted(() => {
      // 从 Vuex 中读取选课信息缓存
      selectedSectionsByDay.value = store.state.selectedSectionsByDay;
      selectedCoursesIds.value = new Set(store.state.selectedCoursesIds[semester.value]);
    });
    /** 根据 selectedCoursesIds 初始化 selectedSectionsByDay */
    const initSelectedSectionsByDay = () => {
      const selectedSectionsByDayCache = [...selectedSectionsByDay.value];
      selectedCoursesIds.value.forEach((courseId) => {
        const course = allCourses.value[courseId];

        // 对每个时间段，将该课程信息加入对应天
        course.time_slot.forEach((ts, i) => {
          const sections = { ...selectedSectionsByDayCache[ts.day - 1] };
          sections[`${courseId}-${i}`] = {
            ...course,
            currentSlot: ts,
          };
          selectedSectionsByDayCache[ts.day - 1] = sections;
        });
      });
      selectedSectionsByDay.value = selectedSectionsByDayCache;
      setSelectedCourses({
        semester: semester.value,
        selectedCoursesIds: [...selectedCoursesIds.value],
        selectedSectionsByDay: selectedSectionsByDay.value,
      });
    };
    /** 将一门课加入课表 */
    const addSelectedCourse = (courseId: number) => {
      // 若用户已登录，向后端发送请求
      if (isUserLoggedIn.value && !isOffline.value && !selectedCoursesIds.value.has(courseId)) {
        selectClient
          .addSelectedLesson(courseId, semester.value)
          .then(() => {
            // TODO: 后端应该返回有效响应
          })
          .catch((err) => {
            if (!err.response || err.response.status !== 401) {
              message.error('数据同步失败！进入离线模式', 1.5);
            }
            isOffline.value = true;
          });
      }

      const selectedSectionsByDayCache = [...selectedSectionsByDay.value];
      const course = allCourses.value[courseId];

      // 对每个时间段，将该课程信息加入对应天
      course.time_slot.forEach((ts, i) => {
        const sections = { ...selectedSectionsByDayCache[ts.day - 1] };
        sections[`${courseId}-${i}`] = {
          ...course,
          currentSlot: ts,
        };
        selectedSectionsByDayCache[ts.day - 1] = sections;
      });
      selectedSectionsByDay.value = selectedSectionsByDayCache;
      selectedCoursesIds.value.add(courseId);

      setSelectedCourses({
        semester: semester.value,
        selectedCoursesIds: [...selectedCoursesIds.value],
        selectedSectionsByDay: selectedSectionsByDay.value,
      });
      message.success('已将课程加入课表', 1);
    };
    /** 将一门课从课表删除 */
    const removeSelectedCourse = (courseId: number) => {
      // 若用户已登录，向后端发送请求
      if (isUserLoggedIn.value && !isOffline.value && selectedCoursesIds.value.has(courseId)) {
        selectClient
          .removeSelectedLesson(courseId, semester.value)
          .then(() => {
            // TODO: 后端应该返回有效响应
          })
          .catch((err) => {
            if (!err.response || err.response.status !== 401) {
              message.error('数据同步失败！进入离线模式', 1.5);
            }
            isOffline.value = true;
          });
      }

      const selectedSectionsByDayCache = [...selectedSectionsByDay.value];
      const course = allCourses.value[courseId];

      // 对每个时间段，将该对应天的课程信息删除
      course.time_slot.forEach((ts, i) => {
        const sections = { ...selectedSectionsByDayCache[ts.day - 1] };

        delete sections[`${courseId}-${i}`];
        selectedSectionsByDayCache[ts.day - 1] = sections;
      });
      selectedSectionsByDay.value = selectedSectionsByDayCache;
      selectedCoursesIds.value.delete(courseId);
      setSelectedCourses({
        semester: semester.value,
        selectedCoursesIds: [...selectedCoursesIds.value],
        selectedSectionsByDay: selectedSectionsByDay.value,
      });
      message.success('已将课程移出课表', 1);
    };

    // 课程搜索索引
    /** 是否显示搜索对话框 */
    const isSearchDialogVisible = ref(false);
    /** 搜索索引 */
    const searchIndex = ref<SearchIndexItem[]>([]);
    /** 初始化搜索索引 */
    const initSearchIndex = () => {
      const searchIndexCache = [] as SearchIndexItem[];
      // TODO: searchIndex 的构建应当提前做好并放到 JSON 中
      Object.entries(allCourses.value).forEach(([courseId, course]) => {
        const timeSlots = [] as SearchIndexItemTimeSlot[];
        course.time_slot.forEach((ts) => {
          const {
            week, day, section, place,
          } = ts;
          const [sectionStart, sectionEnd] = section.split('-').map((i) => parseInt(i, 10));
          timeSlots.push({
            week,
            day, // 注意此处的对应关系，day 1 对应 周一，而非索引
            section: [sectionStart, sectionEnd], // 注意此处也是对应汉字的节数，而非索引
            place,
            dayText: mapDay(day),
          });
        });

        const { name, department } = course;

        // 这里提前处理便于直接显示用，如果未来需要单独使用其中的字段可以注释掉，然后在其他地方处理
        const teachersText = course.teachers || '';
        const timeSlotsTexts = timeSlots.map(
          (ts) => `${ts.week}周 周${ts.dayText} ${ts.section.join('-')} ${ts.place}`,
        );

        /* 每个字段分别搜索
        name: 局部匹配
        teachers: 以数组形式输入，要求用户用英文逗号作为分隔符，全字匹配
        department: 局部匹配
        timeSlots: 只要任一 ts 符合搜索要求即显示。对每一 ts，day 属于所选范围即可，section 以 pair 形式输入，在所选范围即选中，place 局部匹配
        codeId: 局部匹配
        courseId: 不作为搜索字段
        */

        searchIndexCache.push({
          name,
          teachers: course.teachers.split(','),
          department,
          timeSlots,
          codeId: course.code_id,
          courseId: parseInt(courseId, 10),
          teachersText,
          timeSlotsTexts,
        });
      });
      searchIndex.value = searchIndexCache;
    };

    // 云同步
    /** 服务端同步数据 */
    const selectedCoursesIdsFromDatabase = ref(new Set<number>());
    /** 冲突解决对话框是否显示 */
    const isConflictDialogVisible = ref(false);
    /** 替换所选课程列表 */
    const replaceSelectedCourses = (courseIds: Set<number>) => {
      selectedCoursesIds.value = new Set(courseIds);
      selectedSectionsByDay.value = [{}, {}, {}, {}, {}, {}, {}];

      // 重新加入每一门课
      initSelectedSectionsByDay();
    };
    /** 同步冲突解决流程 */
    const onConflictResolved = (
      finalCoursesIds: Set<number>,
      changeLocal: boolean,
      changeRemote: boolean,
    ) => {
      const messageKey = 'conflict-resolved';
      // 得到用户选择保留的 Id 列表
      if (changeLocal) {
        replaceSelectedCourses(finalCoursesIds);
      }
      if (changeRemote) {
        const hide = message.loading({
          content: '正在向服务器同步数据...',
          key: messageKey,
          duration: 0,
        });
        selectClient
          .replaceSelectedLessons([...finalCoursesIds], semester.value)
          .then(() => {
            // TODO: 根据后端响应进行处理
            hide();
            message.success({ content: '数据同步成功!', key: messageKey, duration: 1 });
          })
          .catch((e) => {
            hide();
            if (e.response.status !== 401) {
              message.error({
                content: '数据同步失败！进入离线模式',
                key: messageKey,
                duration: 1.5,
              });
            }
            isOffline.value = true;
          });
      }
      isConflictDialogVisible.value = false;
    };
    /** 同步数据
     * @param isPassive - 非用户主动触发
     */
    const fetchSelectedCourses = (isPassive?: boolean) => {
      const messageKey = 'fetch-selected-courses';
      isOffline.value = false; // 触发拉数据，重新上线
      if (!isUserLoggedIn.value) {
        if (!isPassive) {
          message.warn('需要登录才能进行云同步');
        }
        return;
      }
      const hide = message.loading({
        content: '正在与服务器同步数据',
        key: messageKey,
        duration: 0,
      });
      selectClient
        .getSelectedLessonIds(semester.value)
        .then((res: number[]) => {
          store.commit('setHasFetchedSelectedCourses');
          hide();
          if (!Array.isArray(res)) {
            message.error({
              content: '数据同步失败！进入离线模式',
              key: messageKey,
              duration: 1.5,
            });
            isOffline.value = true;
          }
          selectedCoursesIdsFromDatabase.value = new Set(res);
          if (areSetsSame(selectedCoursesIdsFromDatabase.value, selectedCoursesIds.value)) {
            message.success({ content: '数据同步成功！', key: messageKey, duration: 1 });
          } else if (selectedCoursesIds.value.size === 0) {
            // 如果本地没有数据，则默认拉取服务器数据
            onConflictResolved(selectedCoursesIdsFromDatabase.value, true, false);
            message.success({ content: '数据同步成功！', key: messageKey, duration: 1 });
          } else {
            // 冲突解决
            isConflictDialogVisible.value = true;
          }
        })
        .catch((err) => {
          hide();
          if (!err.response || err.response.status !== 401) {
            message.error({
              content: '数据同步失败！进入离线模式',
              key: messageKey,
              duration: 1.5,
            });
          }
          isOffline.value = true;
        });
    };

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
