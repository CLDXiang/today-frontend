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
          <div
            v-for="course in selectedCoursesOnlyInLocal"
            :key="course.codeId"
            class="course-card"
          >
            <div
              :class="[
                `color-${
                  (course.codeId &&
                    parseInt(
                      course.codeId.slice(course.codeId.length - 6, course.codeId.length - 3),
                      10,
                    ) % 96) ||
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
          <a-button
            shape="round"
            @click="handleChooseLocal"
          >
            使用本地课表
          </a-button>
        </div>
      </div>
      <div>
        <div class="column-title">
          云端新增课程
        </div>
        <div class="card-box">
          <div
            v-for="course in selectedCoursesOnlyInDataBase"
            :key="course.codeId"
            class="course-card"
          >
            <div
              :class="[
                `color-${
                  (course.codeId &&
                    parseInt(
                      course.codeId.slice(course.codeId.length - 6, course.codeId.length - 3),
                      10,
                    ) % 96) ||
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
          <a-button
            shape="round"
            depressed
            @click="handleChooseDatabase"
          >
            使用云端课表
          </a-button>
        </div>
      </div>
    </div>
    <div class="bottom-action">
      <a-button
        shaple="round"
        type="primary"
        @click="handleChooseBoth"
      >
        合并
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { AllCourses } from '../types';

interface SelectedCourseInfo {
  codeId: string;
  name: string;
}

export default defineComponent({
  props: {
    selectedCoursesIds: { type: Set as PropType<Set<number>>, required: true },
    selectedCoursesIdsFromDatabase: { type: Set as PropType<Set<number>>, required: true },
    courses: { type: Object as PropType<AllCourses>, required: true },
  },
  emits: ['conflict-resolved'],
  computed: {
    selectedCoursesOnlyInLocal(): SelectedCourseInfo[] {
      return [...this.selectedCoursesIds]
        .filter((x) => !this.selectedCoursesIdsFromDatabase.has(x))
        .map((courseId) => ({
          codeId: this.courses[courseId].code_id,
          name: this.courses[courseId].name,
        }));
    },
    selectedCoursesOnlyInDataBase(): SelectedCourseInfo[] {
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
      this.$emit('conflict-resolved', combinedSelectedCoursesIds, true, true);
    },
    handleChooseDatabase() {
      this.$emit('conflict-resolved', this.selectedCoursesIdsFromDatabase, true, false);
    },
    handleChooseLocal() {
      this.$emit('conflict-resolved', this.selectedCoursesIds, false, true);
    },
  },
});
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
    color: $gray2;

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
        color: $gray2;
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
              color: $gray2;
              margin-bottom: 10px;
            }

            > div:last-child {
              font-size: 12px;
              line-height: 12px;
              color: $gray3;
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
