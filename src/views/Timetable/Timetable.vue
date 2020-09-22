<template>
  <div class="timetable fluid mb-0 my-1 pa-0 px-md-3">
    <v-dialog
      :fullscreen="isMobileMode"
      :transition="
        isMobileMode ? 'dialog-bottom-transition' : 'scale-transition'
      "
      :value="isDetailDialogVisible"
      :max-width="isMobileMode ? '' : '368px'"
      scrollable
      @click:outside="hideDetailDialog"
    >
      <timetable-detail-dialog-content
        :course="detailPageCourse"
        :class="classDetailPage"
        @deleteCourse="removeSelectedCourse(detailPageCourse.id)"
      />
    </v-dialog>
    <v-dialog
      :fullscreen="isMobileMode"
      :transition="
        isMobileMode ? 'dialog-bottom-transition' : 'scale-transition'
      "
      :value="isConflictDialogVisible"
      :max-width="isMobileMode ? '' : '368px'"
      scrollable
      persistent
    >
      <timetable-conflict-dialog-content
        :selected-courses-ids="selectedCoursesIds"
        :selected-courses-ids-from-database="selectedCoursesIdsFromDatabase"
        :courses="allCourses"
        @conflictResolved="onConflictResolved"
      />
    </v-dialog>
    <v-dialog
      :value="isMobileMode && isSearchDialogVisible"
      fullscreen
      scrollable
      transition="dialog-bottom-transition"
    >
      <timetable-search-dialog-content
        v-if="isMobileMode"
        :search-index="searchIndex"
        :is-loading-courses="isLoadingCourses"
        @addcourse="addSelectedCourse"
        @hideSearchDialog="hideSearchDialog"
      />
    </v-dialog>
    <timetable-head-bar @click-cloud="fetchSelectedCourses" />
    <div class="timetable__body">
      <div class="timetable__day-box">
        <div class="timetable__time">
          <div class="time__title" />
          <div
            v-for="(section, index) in sections"
            :key="index"
            class="time__cell"
          >
            <span class="time__clock">{{ section.clock }}</span>
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
      <div v-if="!isMobileMode" class="timetable__search-bar-box">
        <timetable-search-bar
          :search-index="searchIndex"
          :is-loading-courses="isLoadingCourses"
          @addcourse="addSelectedCourse"
        />
      </div>


      <v-btn
        v-if="isMobileMode"
        class="floating_button"
        color="primary"
        dark
        small
        fixed
        bottom
        right
        fab
        @click="showSearchDialog"
      >
        <v-badge
          v-if="selectedCoursesIds.size === 0"
          color="red"
          dot
        >
          <icon-search /> 
        </v-badge>
        <!-- <v-icon>search</v-icon> -->
        <icon-search v-else /> 
      </v-btn>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters, mapMutations } from 'vuex';
import { IconSearch } from '../../components/icons';
import {
  getSelectedCourses as getSelectedCoursesService,
  addSelectedCourse as addSelectedCourseService,
  removeSelectedCourse as removeSelectedCourseService,
  replaceSelectedCourses as replaceSelectedCoursesService,
} from '../../services/timetable.service';
import {
  TimetableDay,
  TimetableSearchBar,
  TimetableDetailDialogContent,
  TimetableConflictDialogContent,
  TimetableSearchDialogContent,
  TimetableHeadBar,
} from './components';

export default {
  components: {
    TimetableDay,
    TimetableSearchBar,
    TimetableDetailDialogContent,
    TimetableConflictDialogContent,
    TimetableSearchDialogContent,
    TimetableHeadBar,
    IconSearch,
  },
  props: {},
  data() {
    return {
      semester: '2020-2021学年1学期',
      isLoadingCourses: false,
      allCourses: {},
      /** 搜索索引
       * key 为 `${ course.code_id } ${ course.name } ${ course.teachers.join(', ') }`
       * value 为 course.id
       */
      searchIndex: [],
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
      selectedCoursesIds: new Set(),
      selectedCoursesIdsFromDatabase: new Set(),
      /** 关于 selectedSectionsByDay 的设计
       * 为何不使用依赖 selectedCoursesIds 的计算/侦听属性？主要是考虑到增删时的性能问题，
       * 如果使用计算/侦听属性，每次修改 selectedCoursesIds 时就需要重新处理所有已选择的课程，
       * 所以我认为如此设计会更好：初始化时根据 selectedCoursesIds 的初始值计算一次，
       * 此后每次增删仅仅针对增删的那一门课程来操作 selectedSectionsByDay
       * TODO: 按需过滤字段
       * */
      selectedSectionsByDay: [{}, {}, {}, {}, {}, {}, {}],
      // /**
      //  * 在与后端交互失败后进入离线模式，在下一次进入页面时再尝试修正
      //  */
      isOffline: false,
      isConflictDialogVisible: false,

      isSearchDialogVisible: false,
      isSelectedCourseListVisible: false,
    };
  },
  computed: {
    ...mapState(['detailPageCourse', 'isDetailDialogVisible', 'hasFetchedSelectedCourses']),
    ...mapGetters({ isUserLoggedIn: 'userLoggedIn' }),
    classDetailPage() {
      // if (!this.detailPageCourse.id) return [];
      // const classList = [
      //   `color-${(this.detailPageCourse.code &&
      //     parseInt(this.detailPageCourse.code.slice(this.detailPageCourse.code.length - 3), 10) %
      //       96) ||
      //     0}`,
      // ];
      // return classList;
      return [];
    },
    isMobileMode() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return true;
        case 'md':
        case 'lg':
        case 'xl':
        default:
          return false;
      }
    },
  },
  mounted() {
    this.selectedSectionsByDay = this.$store.state.selectedSectionsByDay;
    this.selectedCoursesIds = new Set(this.$store.state.selectedCoursesIds[this.semester]);
    // 读取课程信息
    this.getCoursesFromJSON();
    // 注意，任何需要用到课程信息的初始化方法，请在 this.getCoursesFromJSON() 的 resolve 回调中而非此处调用
  },
  methods: {
    ...mapMutations(['setHasFetchedSelectedCourses']),
    areSetsSame(set1, set2) {
      if (set1.size !== set2.size) return false;
      const intersect = [...set1].filter((item) => set2.has(item));
      return intersect.length === set1.size;
    },
    onConflictResolved(selectedCoursesIds, changeLocal, changeRemote) {
      // 得到用户选择保留的 Id 列表
      if (changeLocal) {
        this.replaceSelectedCourses(selectedCoursesIds);
      }
      if (changeRemote) {
        this.$message.loading('正在向服务器同步数据...');
        replaceSelectedCoursesService(this.semester, [...selectedCoursesIds])
          .then(() => {
            // TODO: 根据后端响应进行处理
            this.$message.loaded();
            this.$message.success('数据同步成功!');
          })
          .catch(() => {
            this.$message.loaded();
            this.$message.error('数据同步失败！进入离线模式');
            this.isOffline = true;
          });
      }
      this.hideConflictDialog();
    },
    getCoursesFromJSON(filePath = 'lessons_344_2020-2021_fall.json') {
      this.isLoadingCourses = true;
      axios
        .get(filePath)
        .then((response) => {
          /** TODO: 最好提前把 JSON 文件处理好，不要在前端预处理
           * 1. 将 teachers 从 time_slots 拉出来整合一下
           * */

          const allCourses = {};
          response.data.forEach((course) => {
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
          }
        })
        .catch((err) => {
          this.$message.error('拉取课程数据失败，请尝试刷新页面');
          throw err;
        });
    },
    fetchSelectedCourses() {
      this.isOffline = false; // 触发拉数据，重新上线
      if (!this.isUserLoggedIn) {
        this.$message.warn('需要登录才能进行云同步');
        return;
      }
      this.$message.loading('正在与服务器同步数据');
      getSelectedCoursesService(this.semester)
        .then((res) => {
          this.setHasFetchedSelectedCourses();
          this.$message.loaded();
          if (!Array.isArray(res)) {
            this.$message.error('数据同步失败！进入离线模式');
            this.isOffline = true;
          }
          this.selectedCoursesIdsFromDatabase = new Set(res);
          if (this.areSetsSame(this.selectedCoursesIdsFromDatabase, this.selectedCoursesIds)) {
            this.$message.success('数据同步成功！');
          } else {
            // 冲突解决
            this.isConflictDialogVisible = true;
          }
        })
        .catch((err) => {
          this.$message.error('数据同步失败！进入离线模式');
          this.isOffline = true;
          throw err;
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
      this.$store.commit('setSelectedCourses', {
        semester: this.semester,
        selectedCoursesIds: this.selectedCoursesIds,
        selectedSectionsByDay,
      });
    },
    initSearchIndex() {
      const searchIndex = [];
      // TODO: searchIndex 的构建应当提前做好并放到 JSON 中
      Object.entries(this.allCourses).forEach(([courseId, course]) => {
        const teachers = new Set();
        const timeSlots = [];
        course.time_slot.forEach((ts) => {
          ts.teacher.forEach((teacher) => {
            if (teacher.trim() !== '') {
              teachers.add(teacher);
            }
          });
          const { week, day, section, place } = ts;
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

        // 搜索索引字符串
        // const index = `${name}|${[...teachers].join(',')}|${department}${timeSlots.reduce(
        //   (s, ts) =>
        //     `${s}|${ts.week}周|周${ts.dayText}|星期${ts.dayText}|第${ts.section.join('-')}节|${
        //       ts.place
        //     }`,
        //   '',
        // )}|${course.code_id}`;

        // const index = `${timeSlots.reduce(
        //   (s, ts) => `${s}|${ts.week}周|周${ts.day}|星期${ts.day}|第${ts.section}节|${ts.place}`,
        //   '',
        // )}`;

        // 这里提前处理便于直接显示用，如果未来需要单独使用其中的字段可以注释掉，然后在其他地方处理
        const teachersText = [...teachers].join(', ');
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
          teachers: [...teachers],
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
    addSelectedCourse(courseId) {
      // if (this.selectedCoursesIds.has(courseId)) {
      //   return;
      // }
      // 若用户已登录，向后端发送请求
      if (this.isUserLoggedIn && !this.isOffline && !this.selectedCoursesIds.has(courseId)) {
        addSelectedCourseService(courseId)
          .then(() => {
            // TODO: 后端应该返回有效响应
          })
          .catch((err) => {
            this.$message.error('数据同步失败！进入离线模式');
            this.isOffline = true;
            throw err;
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

      this.$store.commit('setSelectedCourses', {
        semester: this.semester,
        selectedCoursesIds: this.selectedCoursesIds,
        selectedSectionsByDay,
      });
      this.$message.success('已将课程加入课表');
    },
    removeSelectedCourse(courseId) {
      // if (!this.selectedCoursesIds.has(courseId)) {
      //   return;
      // }
      // 若用户已登录，向后端发送请求
      if (this.isUserLoggedIn && !this.isOffline && this.selectedCoursesIds.has(courseId)) {
        removeSelectedCourseService(courseId)
          .then(() => {
            // TODO: 后端应该返回有效响应
          })
          .catch((err) => {
            this.$message.error('数据同步失败！进入离线模式');
            this.isOffline = true;
            throw err;
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
      this.$store.commit('setSelectedCourses', {
        semester: this.semester,
        selectedCoursesIds: this.selectedCoursesIds,
        selectedSectionsByDay,
      });
      this.$message.success('已将课程移出课表');
    },
    replaceSelectedCourses(courseIds) {
      this.selectedCoursesIds = new Set(courseIds);
      this.selectedSectionsByDay = [{}, {}, {}, {}, {}, {}, {}];

      // 重新加入每一门课
      this.initSelectedSectionsByDay();
    },
    hideDetailDialog() {
      this.$store.commit('hideDetailDialog');
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
    mapDay(day) {
      return ['一', '二', '三', '四', '五', '六', '日'][day - 1];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/_timetable';

.timetable {
  position: relative;

  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;

  max-width: 2560px;
}

.timetable__body {
  display: flex;
  align-items: flex-start;
}

.timetable__time {
  position: sticky;
  left: 0;
  z-index: 2;

  padding-right: 4px;

  flex: 0 0 auto;

  display: flex;
  flex-direction: column;
}

.time__title {
  flex: 0 0 $cell-height/2;
  @include flex-center;

  padding: 0 4px;
}

.time__cell {
  position: relative;
  flex: 0 0 $cell-height;
  @include flex-center;
  width: $cell-width / 2;

  padding: 0 4px;
  background: rgba(255, 255, 255, 0.5);

  color: #69707a;
  font-weight: 600;
}

.time__clock {
  position: absolute;
  top: 0;

  color: #aaa;
  font-weight: 400;
  font-size: 12px;
}

.timetable__day-box {
  overflow-x: auto;
  display: flex;
  flex: 618;

  border: 1px solid #ddd;
  border-radius: 6px;
}

.timetable__search-bar-box {
  flex: 382;
  // height: 17rem;
  height: $search-bar-height;
  margin: 0 10px;
  display: flex;
}

.timetable__search-bar-footer {
  display: flex;
  justify-content: flex-end;

  > button {
    border-radius: 6px;
    margin: 0 5px;
    padding: 0 10px;
    background-color: #fff;

    color: #69707a;
    font-size: 14px;
  }
}

.floating_button {
  bottom: 76px;
  right: 20px;
  width: 48px;
  height: 48px;
}
</style>
