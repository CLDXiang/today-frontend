<template>
  <div class="content-box">
    <rating-head-bar
      is-back-visible
      @click-back="$router.replace('/rating')"
    >
      <span class="title">课程评价</span>
    </rating-head-bar>
    <div class="info-bar flex-shrink-0">
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
          <!-- FIXME: 实现收藏课程后显示 -->
          <div
            v-if="false"
            class="info-bar__star"
            :style="{
              color: lectureInfo.starred ? '#ef755a' : '#828282',
            }"
          >
            <f-icon
              class="icon-star"
              :name="lectureInfo.starred ? 'heart-fill' : 'heart'"
              :size="24"
              @click="handleClickStar"
            />
            <span>{{ lectureInfo.starCount }}</span>
          </div>
          <!-- FIXME: 实现关注课程后显示 -->
          <div
            v-if="false"
            class="info-bar__watch"
          >
            <a-button
              type="primary"
              shape="round"
              size="small"
              class="info-bar__watch-button"
              :class="{ 'info-bar__watch-button--watched': lectureInfo.watched }"
              @click="handleClickWatch"
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
          @click="handleClickFormButton"
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
      <div class="rating-bar__list">
        <card-reactive-rating
          v-for="rating in ratingList"
          :key="rating.id"
          :rating="rating"
        />
        <div
          v-if="ratingList.length === 0"
          class="rating-bar__empty"
        >
          你来到了一块空地，来<span
            class="clickable link-text"
            @click="handleClickFormButton"
          >第一个点评</span>吧！
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import FiveStars from '@/components/FiveStars.vue';
import { mapScoreToText } from '@/utils/rating';
import { CardReactiveRating } from '@/components/listCard';
import { RatingHeadBar, LectureDetailInfo } from './components';
import { useLectureInfo, useLectureRatings } from './composables';

export default defineComponent({
  components: {
    RatingHeadBar,
    FiveStars,
    LectureDetailInfo,
    CardReactiveRating,
  },
  props: {
    /** 传入的搜索字串 */
    lectureId: { type: String, required: true },
  },
  setup(props) {
    const { lectureId } = toRefs(props);

    // 获取课程信息
    const { lectureInfo } = useLectureInfo(lectureId);

    // 获取点评列表
    const { ratingList } = useLectureRatings(lectureId);

    return {
      /** 课程基本信息 */
      lectureInfo,
      /** 点评列表 */
      ratingList,
    };
  },

  methods: {
    mapScoreToText,
    /** 点击关注按钮 */
    handleClickWatch() {
      // TODO: 接入 API
      this.lectureInfo.watched = !this.lectureInfo.watched;
    },
    /** 点击收藏按钮 */
    handleClickStar() {
      // TODO: 接入 API
      if (this.lectureInfo.starred) {
        this.lectureInfo.starred = false;
        this.lectureInfo.starCount -= 1;
      } else {
        this.lectureInfo.starred = true;
        this.lectureInfo.starCount += 1;
      }
    },
    /** 点击点评按钮 */
    handleClickFormButton() {
      this.$router.push(`/rating/lecture/${this.lectureId}/edit-rating`);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/scss/_clickable';

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
            color: $gray2;
            font-size: 16px;
            line-height: 16px;
          }
        }

        > .lecture-recommended-score {
          margin: 16px 0 0 2px;
          display: flex;

          > span {
            margin-left: 8px;
            font-size: 16px;
            color: $gray3;
          }
        }
      }

      > .info-bar__action {
        display: flex;
        flex-direction: column;

        > .info-bar__star {
          display: flex;
          align-items: center;
          user-select: none;

          > span {
            font-size: 16px;
            line-height: 22px;
            margin-left: 10px;
          }

          > .icon-star {
            cursor: pointer;
          }
        }

        > .info-bar__watch {
          margin-top: 12px;

          > .info-bar__watch-button {
            background-color: #e3f1f3;
            color: $gray2;
            border-color: #e3f1f3;
            padding: 0 8px;
            &.info-bar__watch-button--watched {
              background-color: #e0e0e0;
              border-color: #e0e0e0;
            }
          }
        }
      }
    }

    > .info-bar__rating-outline {
      display: flex;
      justify-content: space-around;
      margin: 16px 4px 0 4px;
      background-color: #9fd3da;
      border-radius: 8px;
      padding: 10px 0;

      > div {
        display: flex;
        flex-direction: column;

        > div:first-child {
          color: $gray2;
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
      background-color: #fff;
      padding: 8px 14px 4px 22px;
      border-radius: 4px;
      position: sticky;
      top: 0;
      z-index: 10;

      display: flex;
      justify-content: space-between;
    }

    > .rating-bar__list {
      > .list-card {
        margin-bottom: 12px;
      }

      > .rating-bar__empty {
        padding: 12px;
        border-radius: 8px;
        background-color: #fff;
        .link-text {
          color: $primary-color;
        }
      }
    }
  }
}
</style>
