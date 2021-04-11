<template>
  <div class="overflow-y-hidden bg-white h-full flex flex-col items-stretch p-6">
    <div class="text-gray-800 text-2xl">
      <div class="text-xl">
        {{ courseInfo.codeId || '' }}
      </div>
      <div class="font-bold">
        {{ courseInfo.name || '' }}
      </div>
    </div>
    <div class="flex-grow flex flex-col overflow-y-auto mt-5">
      <div
        class="bg-blue-50 rounded-lg flex justify-between py-3 px-4 flex-initial flex-shrink-0"
      >
        <number-card-item title="学分">
          {{ courseInfo.credit }}
        </number-card-item>
        <number-card-item title="周学时">
          {{ courseInfo.sectionCount }}
        </number-card-item>
        <number-card-item title="人数上限">
          {{ courseInfo.maxStudent }}
        </number-card-item>
      </div>
      <div
        class="mt-6 p-5 bg-gray-100 rounded-lg flex flex-col flex-initial flex-shrink-0 space-y-4"
      >
        <info-card-item
          title="主讲老师"
          :content="courseInfo.teachers"
        />
        <info-card-item
          title="开课院系"
          :content="courseInfo.department"
        />
        <info-card-item
          title="校区"
          :content="courseInfo.campus"
        />
        <info-card-item
          title="考试形式"
          :content="courseInfo.examType"
        />
        <info-card-item
          title="考试时间"
          :content="courseInfo.examTime"
        />
        <info-card-item
          title="是否允许期中退课"
          :content="courseInfo.drop"
        />
        <info-card-item
          title="备注"
          :content="courseInfo.remark"
        />
      </div>
      <div class="mt-6 flex-initial flex-shrink-0">
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
    <div class="mt-6 space-y-6">
      <div class="flex justify-between">
        <f-button
          shape="circle"
          type="primary"
          disabled
        >
          查看课程评价
        </f-button>
        <f-button
          shape="circle"
          type="danger"
          @click="handleClickDeleteButton"
        >
          <f-icon name="delete" />
          删除课程
        </f-button>
      </div>
      <div class="flex justify-end">
        <f-button
          shape="circle"
          @click="handleClickCloseButton"
        >
          <f-icon name="shrink" />
          关闭
        </f-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { RawCourse, RawTimeSlot, CourseDetailInfo } from '../../types';
import { mapDay } from '../../utils';
import { NumberCardItem, InfoCardItem } from './components';

export default defineComponent({
  components: {
    NumberCardItem,
    InfoCardItem,
  },
  emits: ['delete-course'],
  setup(_, ctx) {
    const store = useStore();
    const course = computed<RawCourse>(() => store.state.detailPageCourse);

    const courseInfo = computed<CourseDetailInfo>(() => {
      // 处理为便于展示的形式
      const courseInfoCache: CourseDetailInfo = {
        codeId: course.value.code_id || '',
        name: course.value.name || '',
        credit: course.value.credit || 0,
        sectionCount: course.value.week_hour || 0,
        maxStudent: course.value.max_student || 0,
        department: course.value.department || '',
        campus: course.value.campus || '',
        remark: course.value.remark || '',
        examTime: course.value.exam_time || '',
        examType: course.value.exam_type || '',
        drop: course.value.drop ? '是' : '否',
        timeSlots: [],
        teachers: course.value.teachers || '',
      };
      if (course.value.time_slot) {
        course.value.time_slot.forEach((ts: RawTimeSlot) => {
          const {
            week, day, section, place,
          } = ts;
          const [sectionStart, sectionEnd] = section.split('-').map((i) => parseInt(i, 10));

          if (!courseInfoCache.sectionCount) {
            courseInfoCache.sectionCount += sectionEnd - sectionStart + 1;
          }
          courseInfoCache.timeSlots.push({
            week,
            day: mapDay(day), // 注意此处的对应关系，day 1 对应 周一，而非索引
            section: [sectionStart, sectionEnd], // 注意此处也是对应汉字的节数，而非索引
            place,
          });
        });
      }
      return courseInfoCache;
    });

    const handleClickDeleteButton = () => {
      store.commit('hideDetailDialog');
      ctx.emit('delete-course', course.value.id);
      store.commit('onDeleteDetailPageCourse');
    };

    const handleClickCloseButton = () => {
      store.commit('hideDetailDialog');
    };

    return {
      courseInfo,
      handleClickDeleteButton,
      handleClickCloseButton,
    };
  },
});
</script>
