<template>
  <div class="content-box">
    <div class="title">
      课表云同步
    </div>
    <div class="sub-title">
      本地数据与服务器不一致，需要进行同步
    </div>
    <div class="column-box">
      <div>
        <div class="column-title">
          本地新增课程
        </div>
        <div class="card-box">
          <div v-for="course in selectedCoursesOnlyInLocal" :key="course.codeId" class="course-card">
            <div
              :class="[
                `color-${
                  (course.codeId &&
                    parseInt(course.codeId.slice(course.codeId.length - 6, course.codeId.length - 3), 10) % 96) ||
                  0
                }`,
              ]"
            />
            <div>
              <div>{{ course.name }}</div>
              <div>{{ course.codeId }}</div>
            </div>
          </div>
        </div>
        <div class="btn-box">
          <v-btn rounded depressed @click="handleChooseLocal">
            使用本地课表
          </v-btn>
        </div>
      </div>
      <div>
        <div class="column-title">
          云端新增课程
        </div>
        <div class="card-box">
          <div v-for="course in selectedCoursesOnlyInDataBase" :key="course.codeId">
            <div>{{ course.name }}</div>
            <div>{{ course.codeId }}</div>
          </div>
        </div>
        <div class="btn-box">
          <v-btn rounded depressed @click="handleChooseDatabase">
            使用云端课表
          </v-btn>
        </div>
      </div>
    </div>
    <div class="bottom-action">
      <v-btn rounded depressed color="primary" @click="handleChooseBoth">
        合并
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedCoursesIds: Set,
    selectedCoursesIdsFromDatabase: Set,
    courses: Object,
  },
  computed: {
    selectedCoursesOnlyInLocal() {
      return [...this.selectedCoursesIds]
        .filter((x) => !this.selectedCoursesIdsFromDatabase.has(x))
        .map((courseId) => ({
          codeId: this.courses[courseId].code_id,
          name: this.courses[courseId].name,
        }));
    },
    selectedCoursesOnlyInDataBase() {
      return [...this.selectedCoursesIdsFromDatabase]
        .filter((x) => !this.selectedCoursesIds.has(x))
        .map((courseId) => ({
          codeId: this.courses[courseId].code_id,
          name: this.courses[courseId].name,
        }));
    },
  },
  methods: {
    handleChooseBoth() {
      const combinedSelectedCoursesIds = new Set([
        ...this.selectedCoursesIds,
        ...this.selectedCoursesIdsFromDatabase,
      ]);
      this.$emit('conflictResolved', combinedSelectedCoursesIds, true, true);
    },
    handleChooseDatabase() {
      this.$emit('conflictResolved', this.selectedCoursesIdsFromDatabase, true, false);
    },
    handleChooseLocal() {
      this.$emit('conflictResolved', this.selectedCoursesIds, false, true);
    },
    // getTeacherText(course) {
    //   console.log(course);
    //   const teachers = new Set();
    //   course.time_slot.forEach((ts) => {
    //     ts.teacher.forEach((teacher) => {
    //       if (teacher.trim() !== '') {
    //         teachers.add(teacher);
    //       }
    //     });
    //   });
    //   return [...teachers].join(', ');
    // },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/_timetable';

.content-box {
  min-height: 80vh;
  background-color: #fff;
  padding: 24px 14px;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  > .title {
    flex: 0 0;
    align-self: center;
    font-size: 20px;
    line-height: 20px;
    color: #333;

    margin-bottom: 16px;
  }

  > .sub-title {
    flex: 0 0;
    align-self: center;
    font-size: 14px;
    line-height: 14px;
    color: #4f4f4f;

    margin-bottom: 24px;
  }

  > .column-box {
    height: 0;
    flex: 1;
    display: flex;
    justify-content: space-between;

    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin: 0 2px;

      > .column-title {
        align-self: center;
        color: #4f4f4f;
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 6px;
      }

      > .card-box {
        flex: 1;
        background-color: #f2f2f2;
        border-radius: 8px;
        margin-bottom: 6px;
        padding: 2px 10px 10px 10px;

        overflow-y: auto;

        > .course-card {
          margin-top: 8px;
          display: flex;

          > div:first-child {
            border-radius: 8px 0 0 8px;
            flex-basis: 16px;
          }

          > div:last-child {
            background-color: #fff;

            flex: 1;
            border-radius: 0 8px 8px 0;
            padding: 12px 6px;

            > div:first-child {
              font-size: 14px;
              line-height: 14px;
              color: #4f4f4f;
              margin-bottom: 10px;
            }

            > div:last-child {
              font-size: 12px;
              line-height: 12px;
              color: #828282;
            }
          }
        }
      }

      > .btn-box {
        align-self: center;
      }
    }
  }

  > .bottom-action {
    flex: 0 0;
    display: flex;
    justify-content: flex-end;
    margin: 16px 22px;
  }
}
</style>
