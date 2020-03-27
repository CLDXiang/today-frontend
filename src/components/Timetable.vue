<template>
  <div class="timetable" @click="testClick">
    <div class="timetable__body">
      <div class="timetable__time">
        <div class="time__title"></div>
        <div
          class="time__cell"
          v-for="(section, index) in sections"
          :key="index"
        >
          <span class="time__clock">{{ section.clock }}</span>
          {{ section.name }}
        </div>
      </div>
      <div class="timetable__day-box">
        <timetable-day
          v-for="(courses, index) in selectedCoursesByDay"
          :title="titles[index]"
          :courses="courses"
          :key="index"
        ></timetable-day>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TimetableDay from './TimetableDay.vue';

export default {
  props: {},
  data() {
    return {
      allCourses: {},
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
       * TODO: 这个后续应该要放到 localStorage 中，甚至可能随用户保存到后端
       * TODO: 后续若引入了学期，在各个涉及到该状态的方法中还需要注意根据学期过滤
       * */
      selectedCoursesIDs: new Set([
        660088,
        657728,
        660122,
        661363,
        657734,
        657769,
        661408,
      ]),
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
  components: {
    TimetableDay,
  },
  methods: {
    /** 测试用，点击增加一门课 */
    testClick() {
      this.addSelectedCourse(661900);
      this.addSelectedCourse(661901);
      this.addSelectedCourse(661799);
    },
    getCoursesFromJSON(filePath = 'lessons_325_2019-2020_spring.json') {
      axios
        .get(filePath)
        .then((response) => {
          // TODO: 最好提前把 JSON 文件处理好，不要在前端预处理
          this.allCourses = {};
          response.data.forEach((course) => {
            if (course && course.id) {
              this.allCourses[course.id] = course;
            }
          });

          // 初始化
          this.initSelectedCoursesByDay();
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
  },
  created() {
    // 读取课程信息
    this.getCoursesFromJSON();
    // 注意，任何需要用到课程信息的初始化方法，请在 this.getCoursesFromJSON() 的 resolve 回调中而非此处调用
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/_timetable';

.timetable {
  height: 100%;
  position: relative;

  display: flex;
  flex-direction: column;

  margin: 10px 0;
}

.timetable__body {
  display: flex;

  overflow-x: auto;
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
  flex: 1 0 $cell-height/2;
  @include flex-center;

  padding: 0 4px;
}

.time__cell {
  position: relative;
  flex: 1 0 $cell-height;
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
  display: flex;

  border: 1px solid #ddd;
  border-radius: 6px;
}
</style>
