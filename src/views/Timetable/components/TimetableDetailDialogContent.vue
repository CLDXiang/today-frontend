<template>
  <div class="content-box">
    <div class="course-title">
      <div>{{ courseInfo.codeId || '' }}</div>
      <div>{{ courseInfo.name || '' }}</div>
    </div>
    <div class="course-info">
      <div class="info-card-num">
        <span>
          <div>学分</div>
          <div>{{ courseInfo.credit }}</div>
        </span>
        <span>
          <div>周学时</div>
          <div>{{ courseInfo.sectionCount }}</div>
        </span>
        <span>
          <div>人数上限</div>
          <div>{{ courseInfo.maxStudent }}</div>
        </span>
      </div>
      <div class="info-card-text">
        <div v-if="courseInfo.teachers">
          <div>主讲老师</div>
          <div>{{ courseInfo.teachers }}</div>
        </div>
        <div v-if="courseInfo.department">
          <div>开课院系</div>
          <div>{{ courseInfo.department }}</div>
        </div>
        <div v-if="courseInfo.campus">
          <div>校区</div>
          <div>{{ courseInfo.campus }}</div>
        </div>
        <div v-if="courseInfo.examType">
          <div>考试形式</div>
          <div>{{ courseInfo.examType }}</div>
        </div>
        <div v-if="courseInfo.examTime">
          <div>考试时间</div>
          <div>{{ courseInfo.examTime }}</div>
        </div>
        <div v-if="courseInfo.drop">
          <div>是否允许期中退课</div>
          <div>{{ courseInfo.drop }}</div>
        </div>
        <div v-if="courseInfo.remark">
          <div>备注</div>
          <div>{{ courseInfo.remark }}</div>
        </div>
      </div>
      <div class="info-card-ts">
        <table>
          <thead>
            <tr>
              <th>时间</th>
              <th>地点</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="ts in courseInfo.timeSlots"
              :key="ts.week + ts.day + ts.section"
            >
              <td>
                {{ `${ts.week} 周，每周周${ts.day}第 ${ts.section} 节` }}
              </td>
              <td>{{ ts.place }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="btn-group">
      <div class="btn-line">
        <a-button
          shape="round"
          type="primary"
          disabled
        >
          查看课程评价
        </a-button>
        <a-button
          shape="round"
          type="danger"
          @click="handleClickDeleteButton"
        >
          <f-icon name="delete" />
          删除课程
        </a-button>
      </div>
      <div class="btn-line">
        <a-button
          shape="round"
          @click="handleClickCloseButton"
        >
          <f-icon name="shrink" />

          关闭
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { mapMutations, useStore } from 'vuex';
import { RawCourse, RawTimeSlot, CourseDetailInfo } from '../types';

export default defineComponent({
  emits: ['delete-course'],
  setup() {
    const store = useStore();
    const course = computed<RawCourse>(() => store.state.detailPageCourse);
    return {
      course,
    };
  },
  computed: {
    courseInfo(): CourseDetailInfo {
      // 处理为便于展示的形式
      const courseInfo: CourseDetailInfo = {
        codeId: this.course.code_id || '',
        name: this.course.name || '',
        credit: this.course.credit || 0,
        sectionCount: this.course.week_hour || 0,
        maxStudent: this.course.max_student || 0,
        department: this.course.department || '',
        campus: this.course.campus || '',
        remark: this.course.remark || '',
        examTime: this.course.exam_time || '',
        examType: this.course.exam_type || '',
        drop: this.course.drop ? '是' : '否',
        timeSlots: [],
        teachers: this.course.teachers || '',
      };
      if (this.course.time_slot) {
        this.course.time_slot.forEach((ts: RawTimeSlot) => {
          const {
            week, day, section, place,
          } = ts;
          const [sectionStart, sectionEnd] = section.split('-').map((i) => parseInt(i, 10));

          if (!courseInfo.sectionCount) {
            courseInfo.sectionCount += sectionEnd - sectionStart + 1;
          }
          courseInfo.timeSlots.push({
            week,
            day: this.mapDay(day), // 注意此处的对应关系，day 1 对应 周一，而非索引
            section: [sectionStart, sectionEnd], // 注意此处也是对应汉字的节数，而非索引
            place,
          });
        });
      }
      return courseInfo;
    },
  },
  methods: {
    ...mapMutations(['hideDetailDialog', 'onDeleteDetailPageCourse']),
    mapDay(day: number) {
      return ['一', '二', '三', '四', '五', '六', '日'][day - 1];
    },
    handleClickDeleteButton() {
      this.hideDetailDialog();
      this.$emit('delete-course', this.course.id);
      this.onDeleteDetailPageCourse();
    },
    handleClickCloseButton() {
      this.hideDetailDialog();
    },
  },
});
</script>

<style lang="scss" scoped>
.content-box {
  overflow-y: hidden;
  background-color: #fff;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 26px;
  font-family: Heiti SC;

  > .course-title {
    color: #333;
    font-size: 24px;
    line-height: 24px;

    > div:first-child {
      font-family: Roboto;
      margin-bottom: 4px;
    }

    > div:last-child {
      font-weight: bold;
    }
  }

  > .course-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    margin-top: 24px;

    > div {
      flex: 0 0 auto;
    }

    > .info-card-num {
      background-color: #e3f1f3;
      border-radius: 8px;

      display: flex;
      justify-content: space-between;
      padding: 12px 16px;

      > span {
        display: flex;
        flex-direction: column;
        align-items: center;

        > div:first-child {
          font-weight: bold;
          margin-bottom: 4px;
          font-size: 18px;
          line-height: 18px;
          margin-bottom: 8px;
          color: #333;
        }

        > div:last-child {
          font-size: 14px;
          line-height: 14px;
          color: $gray2;
        }
      }
    }

    > .info-card-text {
      margin-top: 24px;
      padding: 20px;
      background-color: #f2f2f2;
      border-radius: 8px;

      display: flex;
      flex-direction: column;

      > div {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        flex: 1 0 auto;

        > div:first-child {
          font-weight: bold;
          margin-bottom: 4px;
          font-size: 16px;
          line-height: 18px;
          margin-bottom: 8px;
          color: #333;
        }

        > div:last-child {
          font-size: 14px;
          line-height: 14px;
          color: $gray3;
        }
      }

      > div:first-child {
        margin-top: 0;
      }
    }

    > .info-card-ts {
      margin-top: 24px;
    }
  }

  .btn-group {
    margin-top: 24px;

    > .btn-line:first-child {
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
    }

    > .btn-line:last-child {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
