<template>
  <div
    class="content-box"
  >
    <rating-head-bar is-back-visible>
      <span class="title">课程评价</span>
    </rating-head-bar>
    <div class="info-bar">
      <div class="info-bar__head">
        <div class="info-bar__head-left">
          <div class="lecture-title">
            <span>{{ lectureInfo.name }}</span><span>{{ lectureInfo.taughtBy.join(' ') }}</span>
          </div>
          <div class="lecture-recommended-score">
            <five-stars
              :score="lectureInfo.recommended"
              :size="18"
              :spacing="3"
            />
            <span>
              {{ lectureInfo.recommended.toFixed(1) }}
            </span>
          </div>
        </div>
        <div class="info-bar__action">
          <div
            class="info-bar__star"
            :style="{
              color: lectureInfo.starred ? '#ef755a' : '#828282'
            }"
          >
            <f-icon
              :name="lectureInfo.starred ? 'heart-fill': 'heart'"
              :size="24"
            />
            <span>{{ lectureInfo.starCount }}</span>
          </div>
          <div class="info-bar__watch">
            <a-button
              type="primary"
              shape="round"
              size="small"
              :style="{
                backgroundColor: '#e3f1f3',
                color: '#4f4f4f',
                borderColor: '#e3f1f3',
                padding: '0 8px',
              }"
            >
              <template
                v-if="!lectureInfo.watched"
                #icon
              >
                <f-icon
                  name="plus"
                  :size="10"
                />
              </template>
              {{ lectureInfo.watched ? '已关注' : '关注' }}
            </a-button>
          </div>
        </div>
      </div>
      <div class="info-bar__rating-outline">
        <div>
          <div>难易程度</div>
          <div>{{ mapScoreToText('difficulty', lectureInfo.difficulty) }}</div>
        </div>
        <div>
          <div>给分好坏</div>
          <div>{{ mapScoreToText('nice', lectureInfo.nice) }}</div>
        </div>
        <div>
          <div>工作量</div>
          <div>{{ mapScoreToText('workload', lectureInfo.workload) }}</div>
        </div>
      </div>
      <lecture-detail-info :lecture-info="lectureInfo" />
    </div>
    <div class="rating-bar">
      <div class="rating-bar__header">
        <span>课程点评</span>
        <a-button
          type="primary"
          size="small"
          :style="{
            backgroundColor: '#6a99e3',
            color: '#fff',
            borderColor: '#6a99e3',
            padding: '0 8px',
            borderRadius: '6px',
          }"
        >
          <template #icon>
            <f-icon
              name="edit"
              :size="14"
            />
          </template>
          {{ lectureInfo.rated ? '编辑点评' : '我要点评' }}
        </a-button>
      </div>
      <div class="rating-bar__list" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  toRefs,
  watch,
} from 'vue';
import { lectureClient } from '@/apis';
import { LectureItem } from '@/apis/types';
import FiveStars from '@/components/FiveStars.vue';
import { mapScoreToText } from '@/utils/rating';
import { RatingHeadBar, LectureDetailInfo } from './components';

export default defineComponent({
  components: {
    RatingHeadBar,
    FiveStars,
    LectureDetailInfo,
  },
  props: {
    /** 传入的搜索字串 */
    lectureId: { type: String, required: true },
  },
  setup(props) {
    const { lectureId } = toRefs(props);

    /** 课程基本信息 */
    const lectureInfo = ref<LectureItem>({
      id: lectureId.value,
      code: '',
      taughtBy: [],
      name: '',
      credit: 0,
      department: '',
      campus: '',
      language: '',
      remark: '',
      examType: '',
      examTime: '',
      withdrawable: '',
      r3limit: '',
      rateCount: 0,
      starCount: 0,
      starred: false,
      watched: false,
      rated: false,
      difficulty: 0,
      nice: 0,
      workload: 0,
      recommended: 0,
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

    // 首次进入该页面拉数据
    fetchLectureInfo();

    return {
      /** 课程基本信息 */
      lectureInfo,
    };
  },

  methods: {
    mapScoreToText,
  },
});
</script>

<style lang="scss" scoped>
.content-box {
  background-color: #f2f2f2;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: #444;
  font-size: 14px;
  margin: 0 auto;
  max-width: 2560px;
  overflow-y: auto;

  > .head-bar {
    background-color: #fff;
  }

  .title {
    flex: 1;
    margin-right: 24px;
    font-size: 18px;
    color: #333;
  }

  > .info-bar {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 15px 15px 5px 15px;
    margin-bottom: 12px;

    > .info-bar__head {
      display: flex;
      justify-content: space-between;

      > .info-bar__head-left {
        display: flex;
        flex-direction: column;

        > .lecture-title {
          > span:first-child {
            color: #000;
            font-size: 24px;
            line-height: 24px;
            margin-right: 8px;
          }

          > span:last-child {
            color: #4f4f4f;
            font-size: 16px;
            line-height: 16px;
          }
        }

        > .lecture-recommended-score {
          margin-top: 16px;
          display: flex;

          > span {
            margin-left: 8px;
            font-size: 16px;
            color: #828282;
          }
        }
      }

      > .info-bar__action {
        display: flex;
        flex-direction: column;

        > .info-bar__star {
          display: flex;
          align-items: center;

          > span {
            font-size: 16px;
            line-height: 22px;
            margin-left: 10px;
          }
        }

        > .info-bar__watch {
          margin-top: 12px;
        }
      }
    }

    > .info-bar__rating-outline {
      display: flex;
      justify-content: space-around;
      margin-top: 16px;
      background-color: #9fd3da;
      border-radius: 8px;
      padding: 10px 0;

      > div {
        display: flex;
        flex-direction: column;

        > div:first-child {
          color: #4f4f4f;
          font-size: 14px;
          line-height: 14px;
        }

        > div:last-child {
          margin-top: 10px;
          color: #333;
          font-size: 18px;
          line-height: 18px;
          font-weight: 700;
        }
      }
    }
  }

  > .rating-bar {
    flex: 1 0 auto;
    width: 100%;

    > .rating-bar__header {
      padding: 8px 14px 4px 22px;
      border-radius: 4px;
      background: #fff;
      position: sticky;
      top: 0;

      display: flex;
      justify-content: space-between;
    }

    > .rating-bar__list {}
  }
}
</style>
