<template>
  <div class="timetable fluid my-3 pa-0 px-md-3">
    <v-dialog
      :fullscreen="isMobileMode"
      scrollable
      :transition="isMobileMode ? 'dialog-bottom-transition' : 'scale-transition'"
      :value="isDetailDialogVisible"
      :max-width="isMobileMode ? '' : '368px'"
      @click:outside="hideDetailDialog"
    >
      <timetable-detail-dialog-content :course="detailPageCourse" :class="classDetailPage" @deleteCourse="removeSelectedCourse(detailPageCourse.id)" />
    </v-dialog>
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
          v-for="(courses, index) in selectedCoursesByDay"
          :key="index"
          :title="titles[index]"
          :courses="courses"
        />
      </div>
      <!-- <timetable-detail-bar
        v-show="!isMobileMode"
        :course="detailPageCourse"
        :class="classDetailPage"
        @deleteCourse="removeSelectedCourse(detailPageCourse.id)"
        @restoreCourse="addSelectedCourse(detailPageCourse.id)"
      /> -->
    </div>
    <div class="timetable__search-bar-box">
      <timetable-search-bar
        :search-index="searchIndex"
        @addcourse="addSelectedCourse"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import TimetableDay from './TimetableDay.vue';
import TimetableSearchBar from './TimetableSearchBar.vue';
import TimetableDetailDialogContent from './TimetableDetailDialogContent.vue';
// import TimetableDetailBar from './TimetableDetailBar.vue';

export default {
  components: {
    TimetableDay,
    TimetableSearchBar,
    TimetableDetailDialogContent,
    // TimetableDetailBar,
  },
  props: {},
  data() {
    return {
      allCourses: {},
      /** 搜索索引
       * key 为 `${ course.code_id } ${ course.name } ${ course.teachers.join(', ') }`
       * value 为 course.id
       */
      searchIndex: {},
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
      /** 关于 selectedCoursesIDs 的设计
       * 一开始我的想法是将不同课程的所有信息按不同 Day 来存储，但是考虑到多课时的课程的互动可能需要一次操作多个课时，
       * 最终还是将所有已选课程数据放到同一个 data 项中
       * TODO: 这个后续应该要放到 localStorage 中，甚至可能随用户保存到后端，最好连带课程数据一起保存以加快首次渲染
       * TODO: 后续若引入了学期，在各个涉及到该状态的方法中还需要注意根据学期过滤
       * */
      selectedCoursesIDs: new Set([660088, 657728, 660122, 661363, 657734, 657769, 661408]),
      /** 关于 selectedCoursesByDay 的设计
       * 为何不使用依赖 selectedCoursesIDs 的计算/侦听属性？主要是考虑到增删时的性能问题，
       * 如果使用计算/侦听属性，每次修改 selectedCoursesIDs 时就需要重新处理所有已选择的课程，
       * 所以我认为如此设计会更好：初始化时根据 selectedCoursesIDs 的初始值计算一次，
       * 此后每次增删仅仅针对增删的那一门课程来操作 selectedCoursesByDay
       * TODO: 按需过滤字段
       * */
      selectedCoursesByDay: [{}, {}, {}, {}, {}, {}, {}],
    };
  },
  computed: {
    ...mapState(['detailPageCourse', 'isDetailDialogVisible']),
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
  created() {
    // 读取课程信息
    this.getCoursesFromJSON();
    // 注意，任何需要用到课程信息的初始化方法，请在 this.getCoursesFromJSON() 的 resolve 回调中而非此处调用
  },
  methods: {
    getCoursesFromJSON(filePath = 'lessons_325_2019-2020_spring.json') {
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
          this.initSelectedCoursesByDay();
          this.initSearchIndex();
        })
        .catch((err) => {
          throw err;
        });
    },
    initSelectedCoursesByDay() {
      const selectedCoursesByDay = [...this.selectedCoursesByDay];
      this.selectedCoursesIDs.forEach((courseID) => {
        const course = this.allCourses[courseID];

        // 对每个时间段，将该课程信息加入对应天
        course.time_slot.forEach((ts) => {
          const courses = { ...selectedCoursesByDay[ts.day - 1] };
          courses[courseID] = {
            ...course,
            currentSlot: ts,
          };
          selectedCoursesByDay[ts.day - 1] = courses;
        });
      });
      this.selectedCoursesByDay = selectedCoursesByDay;
    },
    initSearchIndex() {
      const searchIndex = {};
      Object.entries(this.allCourses).forEach(([courseID, course]) => {
        // TODO: 提前处理好 JSON
        const teachers = new Set();
        course.time_slot.forEach((ts) => {
          ts.teacher.forEach((teacher) => {
            teachers.add(teacher);
          });
        });

        // TODO: 索引方式需要优化
        searchIndex[`${course.code_id} ${course.name} ${[...teachers].join(', ')}`] = parseInt(
          courseID,
          10,
        );
      });
      this.searchIndex = searchIndex;
    },
    addSelectedCourse(courseID) {
      if (this.selectedCoursesIDs.has(courseID)) {
        return;
      }
      this.selectedCoursesIDs.add(courseID);

      const selectedCoursesByDay = [...this.selectedCoursesByDay];
      const course = this.allCourses[courseID];

      // 对每个时间段，将该课程信息加入对应天
      course.time_slot.forEach((ts) => {
        const courses = { ...selectedCoursesByDay[ts.day - 1] };
        courses[courseID] = {
          ...course,
          currentSlot: ts,
        };
        selectedCoursesByDay[ts.day - 1] = courses;
      });
      this.selectedCoursesByDay = selectedCoursesByDay;
    },
    removeSelectedCourse(courseID) {
      if (!this.selectedCoursesIDs.has(courseID)) {
        return;
      }
      this.selectedCoursesIDs.delete(courseID);

      const selectedCoursesByDay = [...this.selectedCoursesByDay];
      const course = this.allCourses[courseID];

      // 对每个时间段，将该对应天的课程信息删除
      course.time_slot.forEach((ts) => {
        const courses = { ...selectedCoursesByDay[ts.day - 1] };
        delete courses[courseID];
        selectedCoursesByDay[ts.day - 1] = courses;
      });
      this.selectedCoursesByDay = selectedCoursesByDay;
    },
    hideDetailDialog() {
      this.$store.commit('hideDetailDialog');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/_timetable';

.timetable {
  position: relative;

  display: flex;
  flex-direction: column;
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

  border: 1px solid #ddd;
  border-radius: 6px;
}

.timetable__search-bar-box {
  height: 17rem;
  margin: 10px;
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
</style>
