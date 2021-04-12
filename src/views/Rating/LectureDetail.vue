<template>
  <div class="w-full h-full overflow-y-auto content-box max-w-14xl">
    <rating-head-bar
      is-back-visible
      @click-back="routerBack('/rating')"
    >
      <span class="title">课程评价</span>
    </rating-head-bar>
    <div class="flex-shrink-0 info-bar">
      <div
        v-if="loading"
        class="h-16"
      >
        <f-skeleton :width="['300px', '144px']" />
      </div>
      <div
        v-else
        class="info-bar__head"
      >
        <div class="info-bar__head-left">
          <div class="lecture-title">
            <span class="mr-2 text-2xl text-black">
              {{ lectureInfo.name }}
            </span>
            <span class="text-base text-gray-600">{{ lectureInfo.taughtBy.join(' ') }}</span>
          </div>
          <div class="lecture-recommended-score">
            <five-stars
              :score="lectureInfo.recommended"
              :size="18"
              :spacing="3"
            />
            <span class="text-gray-500">
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
            <f-button
              type="primary"
              shape="circle"
              size="small"
              class="info-bar__watch-button text-gray-600"
              :class="{ 'info-bar__watch-button--watched': lectureInfo.watched }"
              @click="handleClickWatch"
            >
              <template
                v-if="!lectureInfo.watched"
                #icon
              >
                <f-icon
                  class="mr-1"
                  name="plus"
                  :size="10"
                />
              </template>
              {{ lectureInfo.watched ? '已关注' : '关注' }}
            </f-button>
          </div>
        </div>
      </div>
      <div
        v-if="loading"
        class="info-bar__rating-outline h-14 animate-pulse"
      />
      <div
        v-else
        class="info-bar__rating-outline"
      >
        <div>
          <div class="text-gray-600">
            难易程度
          </div>
          <div>{{ mapScoreToText('difficulty', lectureInfo.difficulty) }}</div>
        </div>
        <div>
          <div class="text-gray-600">
            给分好坏
          </div>
          <div>{{ mapScoreToText('nice', lectureInfo.nice) }}</div>
        </div>
        <div>
          <div class="text-gray-600">
            工作量
          </div>
          <div>{{ mapScoreToText('workload', lectureInfo.workload) }}</div>
        </div>
      </div>
      <lecture-detail-info
        :lecture-info="lectureInfo"
        :loading="loading"
      />
    </div>
    <div class="rating-bar">
      <div class="rating-bar__header">
        <span>课程点评</span>
        <f-button
          type="primary"
          size="small"
          shape="round"
          @click="handleEditRating"
        >
          <template #icon>
            <f-icon
              class="mr-1"
              name="edit"
              :size="14"
            />
          </template>
          {{ lectureInfo.rated ? '编辑点评' : '我要点评' }}
        </f-button>
      </div>
      <div class="rating-bar__list">
        <div
          v-if="loading"
          class="p-4 pb-2 mb-3 bg-white rounded-lg h-44"
        >
          <f-skeleton
            avatar
            :width="['180px', '120px']"
          />
          <div class="mt-4">
            <f-skeleton
              :rows="3"
              width="50%"
            />
          </div>
        </div>
        <card-reactive-rating
          v-for="rating in ratingList"
          :key="rating.id"
          :rating="rating"
          :show-delete="isCurrentUser(rating.creator.id)"
          :show-edit="isCurrentUser(rating.creator.id)"
          @click-delete="deleteShow"
          @click-edit="handleEditRating"
        />
        <div
          v-if="!loading && ratingList.length === 0"
          class="rating-bar__empty"
        >
          你来到了一块空地，来<span
            class="f-clickable text-primary"
            @click="handleEditRating"
          >第一个点评</span>吧！
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Modal } from 'ant-design-vue';
import { useStore } from 'vuex';
import { rateClient } from '@/apis';
import { useRouterBack } from '@/composables';
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
    const { lectureInfo, loading } = useLectureInfo(lectureId);

    // 获取点评列表
    const { ratingList } = useLectureRatings(lectureId);

    return {
      /** 课程基本信息 */
      lectureInfo,
      /** 点评列表 */
      ratingList,
      /** 正在获取数据 */
      loading,
      /** 路由回退 */
      routerBack: useRouterBack(),
    };
  },
  methods: {
    isCurrentUser(creatorId: string) {
      const store = useStore();
      if (creatorId === store.state.user.id) {
        return true;
      }
      return false;
    },
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
    handleEditRating() {
      this.$router.push(`/rating/lecture/${this.lectureId}/edit-rating`);
    },
    deleteShow() {
      Modal.confirm({
        title: '确认删除',
        okType: 'danger',
        okText: '确认',
        cancelText: '取消',
        content: '确定要删除点评吗？（不可恢复）',
        onOk: () => {
          rateClient.deleteRating({ lectureId: this.lectureId })
            .then((resp) => {
              this.$message.success('删除点评成功');
              this.ratingList = resp.data;
            });
        },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.content-box {
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: #444;
  font-size: 14px;
  margin: 0 auto;

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

        > .lecture-recommended-score {
          margin: 16px 0 0 2px;
          display: flex;

          > span {
            margin-left: 8px;
            font-size: 16px;
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
      }
    }
  }
}
</style>
