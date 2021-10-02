import {
  computed, onMounted, Ref, ref,
} from 'vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { selectClient } from '@/apis';
import { semesterArray } from '@/utils/config';
import { areSetsSame, mapDay } from './utils';

import {
  AllCourses,
  SearchIndexItem,
  SearchIndexItemTimeSlot,
  Sections,
  SelectedCourse,
} from './types';

/** Vuex */
export const useVuex = () => {
  const store = useStore();

  return {
    store,
    /** 当前用户是否已登录 */
    isUserLoggedIn: computed<boolean>(() => store.getters.userLoggedIn),
    /** 课程详情卡片是否显示 */
    isDetailDialogVisible: computed<boolean>(() => store.state.isDetailDialogVisible),
    /** 隐藏课程详情卡片对话框 */
    hideDetailDialog: () => store.commit('hideDetailDialog'),
  };
};

/** 学期 */
export const useSemester = () => {
  const store = useStore();
  /** 当前选择学期 */
  const semester = ref('2020-2021学年2学期');
  /** 当前学期在学期数组的索引值 */
  const semesterIndex = computed<number>(() =>
    semesterArray.findIndex((sem) => sem.key === semester.value));
  /** 展示的学期名 */
  const semesterName = computed(() => semesterArray[semesterIndex.value].name);

  onMounted(() => {
    // 从 Vuex 中读取用户上一次选取的学期来初始化
    semester.value = store.state.semester;
  });

  return {
    semester,
    semesterIndex,
    semesterName,
  };
};

/** 选课 */
export const useCourseSelection = (semester: Ref<string>, isOffline: Ref<boolean>) => {
  const store = useStore();
  const isUserLoggedIn = computed<boolean>(() => store.getters.userLoggedIn);
  /** 写入已选课程缓存 */
  const setSelectedCourses = (payload: {
    semester: string;
    selectedCoursesIds: number[];
    selectedSectionsByDay: Sections[];
  }) => store.commit('setSelectedCourses', payload);

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

  const replaceSelectedCourses = (courseIds: Set<number>) => {
    selectedCoursesIds.value = new Set(courseIds);
    selectedSectionsByDay.value = [{}, {}, {}, {}, {}, {}, {}];

    // 重新加入每一门课
    initSelectedSectionsByDay();
  };

  return {
    allCourses,
    selectedCoursesIds,
    selectedSectionsByDay,
    initSelectedSectionsByDay,
    isOffline,
    isLoadingCourses,
    isSelectedCourseListVisible,
    selectedCourses,
    addSelectedCourse,
    removeSelectedCourse,
    replaceSelectedCourses,
  };
};

/** 搜索索引 */
export const useSearchIndex = (allCourses: Ref<AllCourses>) => {
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

  return {
    /** 是否显示搜索对话框 */
    isSearchDialogVisible: ref(false),
    initSearchIndex,
    searchIndex,
  };
};

/** 云同步 */
export const useCloudSync = (
  semester: Ref<string>,
  selectedCoursesIds: Ref<Set<number>>,
  replaceSelectedCourses: (courseIds: Set<number>) => void,
  isOffline: Ref<boolean>,
) => {
  const store = useStore();
  const isUserLoggedIn = computed<boolean>(() => store.getters.userLoggedIn);
  /** 服务端同步数据 */
  const selectedCoursesIdsFromDatabase = ref(new Set<number>());
  /** 冲突解决对话框是否显示 */
  const isConflictDialogVisible = ref(false);
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

  return {
    fetchSelectedCourses,
    selectedCoursesIdsFromDatabase,
    isConflictDialogVisible,
    onConflictResolved,
  };
};
