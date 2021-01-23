import { lectureClient } from '@/apis';
import { LectureDetail } from '@/apis/lecture/dto';
import { ref, Ref, watch } from 'vue';

/**
 * 拉取课程详情信息
 * @param lectureId 课程 ID
 */
const useLectureInfo: (lectureId: Ref<string>) => { lectureInfo: Ref<LectureDetail> } = (
  lectureId,
) => {
  /** 课程基本信息 */
  const lectureInfo = ref<LectureDetail>({
    id: '',
    code: '',
    taughtBy: [],
    name: '',
    category: '',
    rateCount: 0,
    starCount: 0,
    recommended: 0,
    starred: false,
    detailInfo: {
      credit: 0,
      department: '',
      campus: '',
      language: '',
      remark: '',
      examType: '',
      examTime: '',
      withdrawable: '',
      r3limit: '',
      timeSlot: JSON.parse('{}'),
      maxStudent: 0,
    },
    limit: 0,
    difficulty: 0,
    nice: 0,
    workload: 0,
    rated: false,
    watched: false,
    ratingId: undefined,
  });

  /** 拉取课程信息 */
  const fetchLectureInfo = () => {
    if (lectureId.value) {
      lectureClient.getLectureDetail({ lectureId: lectureId.value }).then((resp) => {
        lectureInfo.value = resp.data;
      });
    }
  };

  watch(lectureId, () => {
    // lectureId 改变时重新拉数据
    fetchLectureInfo();
  });

  // created 时拉数据
  fetchLectureInfo();

  return {
    /** 课程信息 */
    lectureInfo,
  };
};

export default useLectureInfo;
