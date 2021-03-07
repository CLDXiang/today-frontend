<template>
  <div class="h-full w-full overflow-y-auto max-w-14xl relative flex flex-col pt-4 mx-auto">
    <a-drawer
      height="90%"
      placement="bottom"
      :closable="false"
      :visible="isDetailDialogVisible"
      @close="hideDetailDialog"
    >
      <timetable-detail-dialog-content
        :course="detailPageCourse"
        @delete-course="removeSelectedCourse(detailPageCourse.id)"
      />
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
      @close="hideSearchDialog"
    >
      <timetable-search-bar
        :search-index="searchIndex"
        :is-loading-courses="isLoadingCourses"
        @addcourse="addSelectedCourse"
        @hide-search-dialog="hideSearchDialog"
      />
    </a-drawer>
    <a-drawer
      height="90%"
      placement="right"
      :closable="false"
      :visible="isSelectedCourseListVisible"
      @close="hideSelectedCourseList"
    >
      <timetable-selected-course-list
        :courses="selectedCourses"
        @click-cloud="fetchSelectedCourses"
        @click-back="hideSelectedCourseList"
        @delete-course="(courseId) => removeSelectedCourse(courseId)"
        @show-detail="handleShowDetail"
      />
    </a-drawer>
    <timetable-head-bar
      :semester="semesterName"
      :hide-left="semesterIndex === 0"
      :hide-right="semesterIndex === semesterArray.length - 1"
      @click-menu-button="showSelectedCourseList"
      @click-left="moveSemester(-1)"
      @click-right="moveSemester(1)"
    />
    <div class="flex items-start">
      <div class="overflow-x-auto flex flex-grow border border-gray-300 rounded-md">
        <div class="sticky left-0 z-20 pr-1 flex-initial flex-shrink-0 flex flex-col">
          <div class="flex-grow-0 flex-shrink-0 h-8 flex justify-center items-center py-0 px-1" />
          <div
            v-for="(section, index) in sections"
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
          :title="titles[index]"
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
          @hide-search-dialog="hideSearchDialog"
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
        @click="showSearchDialog"
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
import { defineComponent, ref } from 'vue';
import { mapState, mapGetters, mapMutations } from 'vuex';
import { selectClient, userClient } from '@/apis';
import log from '@/utils/log';
import { semesterArray } from '@/utils/config';
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
    /** 是否显示已选课程列表抽屉 */
    const isSelectedCourseListVisible = ref<boolean>(false);

    /** 显示已选课程列表抽屉 */
    const showSelectedCourseList = () => {
      isSelectedCourseListVisible.value = true;
    };

    /** 隐藏已选课程列表抽屉 */
    const hideSelectedCourseList = () => {
      isSelectedCourseListVisible.value = false;
    };

    return {
      /** 是否显示已选课程列表抽屉 */
      isSelectedCourseListVisible,
      /** 显示已选课程列表抽屉 */
      showSelectedCourseList,
      /** 隐藏已选课程列表抽屉 */
      hideSelectedCourseList,
    };
  },
  data() {
    return {
      semester: '2020-2021学年2学期',
      semesterIndex: 0,
      semesterJsonName: '',
      semesterArray,
      isLoadingCourses: false,
      /** 课程数据 */
      allCourses: {} as AllCourses,
      /** 搜索索引 */
      searchIndex: [] as SearchIndexItem[],
      titles: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      sections: [
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
      ],
      /** 关于 selectedCoursesIds 的设计
       * 一开始我的想法是将不同课程的所有信息按不同 Day 来存储，但是考虑到多课时的课程的互动可能需要一次操作多个课时，
       * 最终还是将所有已选课程数据放到同一个 data 项中
       * TODO: 后续若引入了学期，在各个涉及到该状态的方法中还需要注意根据学期过滤
       * 这个变量仅保存当前学期的内容，其他的都放到 vuex 中
       * */
      selectedCoursesIds: new Set<number>(),
      selectedCoursesIdsFromDatabase: new Set<number>(),
      /** 关于 selectedSectionsByDay 的设计
       * 为何不使用依赖 selectedCoursesIds 的计算/侦听属性？主要是考虑到增删时的性能问题，
       * 如果使用计算/侦听属性，每次修改 selectedCoursesIds 时就需要重新处理所有已选择的课程，
       * 所以我认为如此设计会更好：初始化时根据 selectedCoursesIds 的初始值计算一次，
       * 此后每次增删仅仅针对增删的那一门课程来操作 selectedSectionsByDay
       * TODO: 按需过滤字段
       * */
      selectedSectionsByDay: [{}, {}, {}, {}, {}, {}, {}] as Sections[],
      // /**
      //  * 在与后端交互失败后进入离线模式，在下一次进入页面时再尝试修正
      //  */
      isOffline: false,
      isConflictDialogVisible: false,

      isSearchDialogVisible: false,
    };
  },
  computed: {
    ...mapState([
      'detailPageCourse',
      'isDetailDialogVisible',
      'hasFetchedSelectedCourses',
    ]),
    ...mapState({
      selectedSectionsByDayVuex: 'selectedSectionsByDay',
      selectedCoursesIdsVuex: 'selectedCoursesIds',
      semesterVuex: 'semester',
    }),
    ...mapGetters({ isUserLoggedIn: 'userLoggedIn' }),
    /** 已选课程列表数据 */
    selectedCourses(): SelectedCourse[] {
      if (this.isLoadingCourses) {
        // 还没加载好 JSON
        return [];
      }
      return [...this.selectedCoursesIds].map((lessonId) => {
        const {
          id, name, teachers, code,
        } = this.allCourses[lessonId];
        return {
          id,
          name,
          teachers: teachers.split(','),
          code,
        };
      });
    },
    /** 展示的学期名 */
    semesterName(): string {
      return semesterArray[this.semesterIndex].name;
    },
  },
  mounted() {
    this.semester = this.semesterVuex;
    this.semesterIndex = semesterArray.findIndex((semester) => semester.key === this.semester);
    this.semesterJsonName = semesterArray[this.semesterIndex].jsonFileName;
    this.selectedSectionsByDay = this.selectedSectionsByDayVuex;
    this.selectedCoursesIds = new Set(this.selectedCoursesIdsVuex[this.semester]);
    // 读取课程信息
    this.getCoursesFromJSON(this.semesterJsonName);
    // 注意，任何需要用到课程信息的初始化方法，请在 this.getCoursesFromJSON() 的 resolve 回调中而非此处调用
  },
  methods: {
    ...mapMutations([
      'setHasFetchedSelectedCourses',
      'setUserProfile',
      'setSelectedCourses',
      'hideDetailDialog',
      'changeDetailPageContent',
      'showDetailDialog',
      'setSemester',
    ]),
    moveSemester(step: -1 | 1) {
      if (step === -1 && this.semesterIndex === 0) {
        this.$message.warn('已经是最后一个学期啦', 0.5);
        return;
      }
      if (step === 1 && this.semesterIndex === semesterArray.length - 1) {
        this.$message.warn('已经是最新学期啦', 0.5);
        return;
      }
      this.semesterIndex += step;
      this.semester = semesterArray[this.semesterIndex].key;
      this.selectedCoursesIds = new Set(this.selectedCoursesIdsVuex[this.semester]);
      this.selectedSectionsByDay = [{}, {}, {}, {}, {}, {}, {}];
      this.getCoursesFromJSON(semesterArray[this.semesterIndex].jsonFileName);
      this.fetchSelectedCourses(true);

      this.setSemester(this.semester);
    },
    areSetsSame(set1: Set<number>, set2: Set<number>) {
      if (set1.size !== set2.size) return false;
      const intersect = [...set1].filter((item) => set2.has(item));
      return intersect.length === set1.size;
    },
    onConflictResolved(
      selectedCoursesIds: Set<number>,
      changeLocal: boolean,
      changeRemote: boolean,
    ) {
      const messageKey = 'conflict-resolved';
      // 得到用户选择保留的 Id 列表
      if (changeLocal) {
        this.replaceSelectedCourses(selectedCoursesIds);
      }
      if (changeRemote) {
        const hide = this.$message.loading({
          content: '正在向服务器同步数据...',
          key: messageKey,
          duration: 0,
        });
        selectClient
          .replaceSelectedLessons([...selectedCoursesIds], this.semester)
          .then(() => {
            // TODO: 根据后端响应进行处理
            hide();
            this.$message.success({ content: '数据同步成功!', key: messageKey });
          })
          .catch((e) => {
            hide();
            if (e.response.status !== 401) {
              this.$message.error({ content: '数据同步失败！进入离线模式', key: messageKey });
            }
            this.isOffline = true;
          });
      }
      this.hideConflictDialog();
    },
    getCoursesFromJSON(filePathOrigin: string) {
      const filePath = `lessons/${filePathOrigin}`;
      this.isLoadingCourses = true;
      axios
        .get(filePath)
        .then((response) => {
          const allCourses = {} as AllCourses;
          response.data.forEach((course: RawCourse) => {
            if (course && course.id) {
              allCourses[course.id] = course;
            }
          });
          this.allCourses = allCourses;

          // 初始化
          this.initSelectedSectionsByDay();
          this.initSearchIndex();
          this.isLoadingCourses = false;

          // 若用户已登录，从后端同步所选课程 Id 列表
          if (this.isUserLoggedIn && !this.hasFetchedSelectedCourses) {
            this.fetchSelectedCourses();
            // 顺便更新用户信息
            userClient
              .getUserInfo({})
              .then((profile) => {
                this.setUserProfile(profile);
              })
              .catch((err) => {
                log.error(err);
              });
          }
        })
        .catch((err) => {
          this.$message.error('拉取课程数据失败，请尝试刷新页面', 1.5);
          throw err;
        });
    },
    /** 同步数据
     * @param isPassive - 非用户主动触发
     */
    fetchSelectedCourses(isPassive?: boolean) {
      const messageKey = 'fetch-selected-courses';
      this.isOffline = false; // 触发拉数据，重新上线
      if (!this.isUserLoggedIn) {
        if (!isPassive) {
          this.$message.warn('需要登录才能进行云同步');
        }
        return;
      }
      const hide = this.$message.loading({
        content: '正在与服务器同步数据',
        key: messageKey,
        duration: 0,
      });
      selectClient
        .getSelectedLessonIds(this.semester)
        .then((res: number[]) => {
          this.setHasFetchedSelectedCourses();
          hide();
          if (!Array.isArray(res)) {
            this.$message.error({ content: '数据同步失败！进入离线模式', key: messageKey });
            this.isOffline = true;
          }
          this.selectedCoursesIdsFromDatabase = new Set(res);
          if (this.areSetsSame(this.selectedCoursesIdsFromDatabase, this.selectedCoursesIds)) {
            this.$message.success({ content: '数据同步成功！', key: messageKey });
          } else if (this.selectedCoursesIds.size === 0) {
            // 如果本地没有数据，则默认拉取服务器数据
            this.onConflictResolved(this.selectedCoursesIdsFromDatabase, true, false);
            this.$message.success({ content: '数据同步成功！', key: messageKey });
          } else {
            // 冲突解决
            this.isConflictDialogVisible = true;
          }
        })
        .catch((err) => {
          hide();
          if (!err.response || err.response.status !== 401) {
            this.$message.error({ content: '数据同步失败！进入离线模式', key: messageKey });
          }
          this.isOffline = true;
        });
    },
    initSelectedSectionsByDay() {
      const selectedSectionsByDay = [...this.selectedSectionsByDay];
      this.selectedCoursesIds.forEach((courseId) => {
        const course = this.allCourses[courseId];

        // 对每个时间段，将该课程信息加入对应天
        course.time_slot.forEach((ts, i) => {
          const sections = { ...selectedSectionsByDay[ts.day - 1] };
          sections[`${courseId}-${i}`] = {
            ...course,
            currentSlot: ts,
          };
          selectedSectionsByDay[ts.day - 1] = sections;
        });
      });
      this.selectedSectionsByDay = selectedSectionsByDay;
      this.setSelectedCourses({
        semester: this.semester,
        selectedCoursesIds: this.selectedCoursesIds,
        selectedSectionsByDay,
      });
    },
    initSearchIndex() {
      const searchIndex = [] as SearchIndexItem[];
      // TODO: searchIndex 的构建应当提前做好并放到 JSON 中
      Object.entries(this.allCourses).forEach(([courseId, course]) => {
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
            dayText: this.mapDay(day),
          });
        });

        const { name, department } = course;

        // 这里提前处理便于直接显示用，如果未来需要单独使用其中的字段可以注释掉，然后在其他地方处理
        const teachersText = course.teachers || '';
        // TODO: 考虑如何把 week 整进来
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

        searchIndex.push({
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
      this.searchIndex = searchIndex;
    },
    addSelectedCourse(courseId: number) {
      // if (this.selectedCoursesIds.has(courseId)) {
      //   return;
      // }
      // 若用户已登录，向后端发送请求
      if (this.isUserLoggedIn && !this.isOffline && !this.selectedCoursesIds.has(courseId)) {
        selectClient
          .addSelectedLesson(courseId, this.semester)
          .then(() => {
            // TODO: 后端应该返回有效响应
          })
          .catch((err) => {
            if (!err.response || err.response.status !== 401) {
              this.$message.error('数据同步失败！进入离线模式');
            }
            this.isOffline = true;
          });
      }

      const selectedSectionsByDay = [...this.selectedSectionsByDay];
      const course = this.allCourses[courseId];

      // 对每个时间段，将该课程信息加入对应天
      course.time_slot.forEach((ts, i) => {
        const sections = { ...selectedSectionsByDay[ts.day - 1] };
        sections[`${courseId}-${i}`] = {
          ...course,
          currentSlot: ts,
        };
        selectedSectionsByDay[ts.day - 1] = sections;
      });
      this.selectedSectionsByDay = selectedSectionsByDay;
      this.selectedCoursesIds.add(courseId);

      this.setSelectedCourses({
        semester: this.semester,
        selectedCoursesIds: this.selectedCoursesIds,
        selectedSectionsByDay,
      });
      this.$message.success('已将课程加入课表');
    },
    removeSelectedCourse(courseId: number) {
      // if (!this.selectedCoursesIds.has(courseId)) {
      //   return;
      // }
      // 若用户已登录，向后端发送请求
      if (this.isUserLoggedIn && !this.isOffline && this.selectedCoursesIds.has(courseId)) {
        selectClient
          .removeSelectedLesson(courseId, this.semester)
          .then(() => {
            // TODO: 后端应该返回有效响应
          })
          .catch((err) => {
            if (!err.response || err.response.status !== 401) {
              this.$message.error('数据同步失败！进入离线模式');
            }
            this.isOffline = true;
          });
      }

      const selectedSectionsByDay = [...this.selectedSectionsByDay];
      const course = this.allCourses[courseId];

      // 对每个时间段，将该对应天的课程信息删除
      course.time_slot.forEach((ts, i) => {
        const sections = { ...selectedSectionsByDay[ts.day - 1] };

        delete sections[`${courseId}-${i}`];
        selectedSectionsByDay[ts.day - 1] = sections;
      });
      this.selectedSectionsByDay = selectedSectionsByDay;
      this.selectedCoursesIds.delete(courseId);
      this.setSelectedCourses({
        semester: this.semester,
        selectedCoursesIds: this.selectedCoursesIds,
        selectedSectionsByDay,
      });
      this.$message.success('已将课程移出课表');
    },
    replaceSelectedCourses(courseIds: Set<number>) {
      this.selectedCoursesIds = new Set(courseIds);
      this.selectedSectionsByDay = [{}, {}, {}, {}, {}, {}, {}];

      // 重新加入每一门课
      this.initSelectedSectionsByDay();
    },
    hideConflictDialog() {
      this.isConflictDialogVisible = false;
    },
    showSearchDialog() {
      this.isSearchDialogVisible = true;
    },
    hideSearchDialog() {
      this.isSearchDialogVisible = false;
    },
    mapDay(day: number) {
      return ['一', '二', '三', '四', '五', '六', '日'][day - 1];
    },
    /** 根据 lesson id 显示详情页 */
    handleShowDetail(courseId: number) {
      this.hideSelectedCourseList();
      this.changeDetailPageContent(this.allCourses[courseId]);
      this.showDetailDialog();
    },
  },
});
</script>
