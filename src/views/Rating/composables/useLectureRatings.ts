import {
  ref, Ref, watch,
} from 'vue';
import { rateClient } from '@/apis';
import { CardRatingItem } from '@/components/listCard';

/**
 * 拉取课程点评列表
 * @param lectureId 课程 ID
 */
const useLectureRatings: (
  lectureId: Ref<string>
) => { ratingList: Ref<CardRatingItem[]> } = (
  lectureId,
) => {
  /** 点评列表 */
  const ratingList = ref<CardRatingItem[]>([]);

  /** 拉取点评列表 */
  const fetchRatingList = () => {
    if (lectureId.value) {
      rateClient.getRatingListByLecture({ lectureId: lectureId.value }).then((resp) => {
        ratingList.value = resp.data;
      });
    }
  };

  watch(lectureId, () => {
    // lectureId 改变时重新拉数据
    fetchRatingList();
  });

  // created 时拉数据
  fetchRatingList();

  return {
    /** 点评列表 */
    ratingList,
  };
};

export default useLectureRatings;
