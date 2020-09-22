<template>
  <div class="content-box">
    <div class="course-title">
      <div>{{ courseInfo.codeId || '' }}</div>
      <div>{{ courseInfo.name || '' }}</div>
    </div>
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
      <v-simple-table
        dense
        disable-sort
        disable-pagination
        disable-filtering
        hide-default-footer
      >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                时间
              </th><th class="text-left">
                地点
              </th><th class="text-left">
                教师
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ts in courseInfo.timeSlots" :key="ts.week+ts.day+ts.section">
              <td>
                {{
                  `${ts.week} 周，每周周${ts.day}第 ${
                    ts.section
                  } 节`
                }}
              </td><td>{{ ts.place }}</td><td>{{ ts.teachers }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <div class="btn-group">
      <div class="btn-line">
        <v-btn rounded depressed color="primary" disabled>
          查看课程评价（开发中）
        </v-btn>
        <v-btn rounded depressed color="error" @click="handleClickDeleteButton">
          <v-icon>mdi-delete-forever-outline</v-icon>删除课程
        </v-btn>
      </div>
      <div class="btn-line">
        <v-btn rounded depressed @click="handleClickCloseButton">
          <v-icon>mdi-arrow-collapse</v-icon>关闭
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    course: Object,
  },
  data() {
    return {};
  },
  computed: {
    courseInfo() {
      // 处理为便于展示的形式
      const { course, mapDay } = this;
      const courseInfo = {
        codeId: course.code_id || '',
        name: course.name || '',
        credit: course.credit || 0,
        sectionCount: 0,
        maxStudent: course.max_student || 0,
        department: course.department || '',
        campus: course.campus || '',
        remark: course.remark || '',
        examTime: course.exam_time || '',
        examType: course.exam_type || '',
        drop: course.drop || '',
        timeSlots: [],
        teachers: '',
      };
      const teachersSet = new Set();
      course.time_slot.forEach((ts) => {
        ts.teacher.forEach((teacher) => {
          if (teacher.trim() !== '') {
            teachersSet.add(teacher);
          }
        });
        const { week, day, section, place } = ts;
        const [sectionStart, sectionEnd] = section.split('-').map((i) => parseInt(i, 10));

        courseInfo.sectionCount += sectionEnd - sectionStart + 1;
        courseInfo.timeSlots.push({
          week,
          day: mapDay(day), // 注意此处的对应关系，day 1 对应 周一，而非索引
          section: [sectionStart, sectionEnd], // 注意此处也是对应汉字的节数，而非索引
          place,
          teachers:
            (ts.teacher &&
              ts.teacher
                .map((t) => t.trim())
                .filter((t) => !!t)
                .join(', ')) ||
            '',
        });
      });
      courseInfo.teachers = [...teachersSet].join(', ');
      return courseInfo;
    },
  },
  methods: {
    mapDay(day) {
      return ['一', '二', '三', '四', '五', '六', '日'][day - 1];
    },
    handleClickDeleteButton() {
      this.$store.commit('hideDetailDialog');
      this.$emit('deleteCourse');
      this.$store.commit('onDeleteDetailPageCourse');
    },
    handleClickCloseButton() {
      this.$store.commit('hideDetailDialog');
    },
  },
};
</script>

<style lang="scss" scoped>
.content-box {
  background-color: #fff;

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

  > .info-card-num {
    margin-top: 24px;
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
        color: #4f4f4f;
      }
    }
  }

  > .info-card-text {
    height: 0;
    flex: 1;
    overflow-y: auto;
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
        color: #828282;
      }
    }

    > div:first-child {
      margin-top: 0;
    }
  }

  > .info-card-ts {
    max-height: 240px;
    overflow: auto;
    margin-top: 24px;
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
