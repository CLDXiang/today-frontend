<template>
  <div class="content-box">
    <rating-head-bar
      is-back-visible
      @click-back="$router.replace(`/rating/lecture/${lectureId}`)"
    >
      <span class="title">撰写点评</span>
    </rating-head-bar>
    <div class="lecture-title">
      <span>{{ lectureName }}</span>
    </div>
    <div class="star-box">
      <div class="star-box__item">
        <span>难易程度</span>
        <five-stars
          v-model="formData.difficulty"
          clickable
          :hint="scoreTextTable.difficulty"
          :size="26"
          :spacing="6"
        />
      </div>
      <div class="star-box__item">
        <span>给分好坏</span>
        <five-stars
          v-model="formData.nice"
          clickable
          :hint="scoreTextTable.nice"
          :size="26"
          :spacing="6"
        />
      </div>
      <div class="star-box__item">
        <span>工作量</span>
        <five-stars
          v-model="formData.workload"
          clickable
          :hint="scoreTextTable.workload"
          :size="26"
          :spacing="6"
        />
      </div>
      <div class="star-box__item">
        <span>综合推荐指数</span>
        <five-stars
          v-model="formData.recommended"
          clickable
          :hint="scoreTextTable.recommended"
          :size="26"
          :spacing="6"
        />
      </div>
    </div>
    <div class="textarea-box">
      <textarea
        v-model="formData.content"
        placeholder="请输入具体点评内容"
        maxlength="5000"
      />
    </div>
    <div class="action-box">
      <span class="action-box__left">
        <a-button
          class="button-gray"
          shape="round"
          size="large"
          @click="handleClickReset"
        >
          清空
        </a-button>
      </span>
      <span class="action-box__right">
        <a-button
          v-if="isDraft"
          :class="{ 'button-gray': isFormDataAvailable }"
          shape="round"
          size="large"
          :disabled="!isFormDataAvailable"
          :loading="isLoading"
          @click="handleClickSaveDraft"
        >
          保存
        </a-button>
        <a-button
          shape="round"
          type="primary"
          size="large"
          :disabled="!isFormDataAvailable"
          :loading="isLoading"
          @click="handleClickSubmit"
        >
          提交点评
        </a-button>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FiveStars from '@/components/FiveStars.vue';
import { rateClient, lectureClient } from '@/apis';
import { mapMutations, mapState } from 'vuex';
import { scoreTextTable } from '@/utils/rating';
import dayjs from 'dayjs';
import { RateForm } from './types';
import { RatingHeadBar } from './components';

export default defineComponent({
  components: {
    RatingHeadBar,
    FiveStars,
  },
  props: {
    /** 课程 Id */
    lectureId: { type: String, required: true },
  },
  data() {
    return {
      /** 课程名 */
      lectureName: '',
      /** 当前用户对该课程的点评 Id */
      ratingId: '',
      /** 表单数据 */
      formData: {
        /** 难易程度 */
        difficulty: 0,
        /** 给分好坏 */
        nice: 0,
        /** 工作量 */
        workload: 0,
        /** 综合推荐指数 */
        recommended: 0,
        /** 评价内容 */
        content: '',
        /** 更新时间 */
        updatedAt: dayjs(0),
      } as RateForm,
      /** 是否为草稿 */
      isDraft: false,
      /** 星星文案 */
      scoreTextTable,
      /** 是否正在加载 */
      isLoading: true,
    };
  },
  computed: {
    ...mapState(['user', 'ratingForms']),
    /** 表单内容是否都有有效值 */
    isFormDataAvailable(): boolean {
      return !!(
        this.formData.difficulty
        && this.formData.nice
        && this.formData.workload
        && this.formData.recommended
        && this.formData.content?.trim()
      );
    },
  },
  watch: {
    formData: {
      handler() {
        if (this.isLoading) {
          return;
        }
        // 这样频繁存储可能会有性能问题
        // 本打算用 beforeUnmount 处理，但是在路由强跳时似乎无法触发
        this.setRatingForm({
          lectureId: this.lectureId,
          formData: { ...this.formData, updatedAt: dayjs() },
        });
      },
      deep: true,
    },
  },
  created() {
    // 拉取课程信息
    // TODO: field 只需要 name、ratingId
    lectureClient.getLectureDetail({ lectureId: this.lectureId }).then(({ data: lectureInfo }) => {
      this.lectureName = lectureInfo.name;
      this.ratingId = lectureInfo.ratingId || '';
      /** 拿 storage 的 */
      const localRatingForm: RateForm = this.ratingForms[this.lectureId];

      this.formData = localRatingForm || this.formData;

      // 拉取点评信息
      if (this.ratingId) {
      // 若有 ratingId，则直接拉点评数据
      // TODO: 根据后端 API 逻辑修改
        rateClient
          .getRatingById({ ratingId: this.ratingId })
          .then(({ data }) => {
            if (data.difficulty && data.nice && data.workload && data.recommended && data.content) {
            // 如果有非草稿有效内容，则使用有效内容
              const {
                difficulty, nice, workload, recommended, content, updatedAt,
              } = data;

              if (!this.formData.updatedAt || (updatedAt && updatedAt > this.formData.updatedAt)) {
              // 如果拉下来的内容更新，替换本地的
                this.formData = {
                  difficulty,
                  nice,
                  workload,
                  recommended,
                  content,
                  updatedAt,
                };
              }
            } else if (
              data.draft && (
                !this.formData.updatedAt
            || (data.draft.updatedAt && data.draft.updatedAt > this.formData.updatedAt))
            ) {
            // 使用草稿内容
              this.formData = data.draft;
              this.isDraft = true;
            }
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
      // 没有点评 Id，创建新的
        this.isDraft = true;
        this.isLoading = false;
      }
    });
  },
  methods: {
    ...mapMutations(['setRatingForm']),
    /** 检查表单字段有效性 */
    checkFormData() {
      const {
        difficulty, nice, workload, recommended, content,
      } = this.formData;
      if (!difficulty) {
        this.$message.warn('还没有选择难易程度哦');
        return false;
      }
      if (!nice) {
        this.$message.warn('还没有选择给分好坏哦');
        return false;
      }
      if (!workload) {
        this.$message.warn('还没有选择工作量哦');
        return false;
      }
      if (!recommended) {
        this.$message.warn('还没有选择综合推荐指数哦');
        return false;
      }
      if (!content || !content.trim()) {
        this.$message.warn('还没有填写具体点评内容哦');
        return false;
      }
      return true;
    },
    /** 点击清空按钮 */
    handleClickReset() {
      this.formData = {
        difficulty: 0,
        nice: 0,
        workload: 0,
        recommended: 0,
        content: '',
        updatedAt: dayjs(0),
      };
    },
    /** 点击保存按钮 */
    handleClickSaveDraft() {
      if (!this.isDraft) {
        // 正常情况下应该不会触发这里
        this.$message.warn('已经发布过点评啦，请直接提交修改');
      }
      if (!this.checkFormData()) {
        // 有字段没有填，正常情况下应该不会触发这里
        return;
      }
      this.isLoading = true;
      this.formData.updatedAt = dayjs();
      if (!this.ratingId) {
        // 没有点评 Id，新建草稿
        rateClient.createDraft({ lectureId: this.lectureId, ...this.formData }).then(() => {
          this.$message.success('保存草稿成功！');
        }).finally(() => {
          this.isLoading = false;
        });
      } else {
        // 有点评 Id，编辑草稿
        rateClient.editDraft({ ratingId: this.ratingId, ...this.formData }).then(() => {
          this.$message.success('编辑草稿成功！');
        }).finally(() => {
          this.isLoading = false;
        });
      }
    },
    /** 点击提交按钮 */
    handleClickSubmit() {
      if (!this.checkFormData()) {
        // 有字段没有填，正常情况下应该不会触发这里
        return;
      }
      this.isLoading = true;
      this.formData.updatedAt = dayjs();
      if (!this.ratingId) {
        // 没有点评 Id，新建点评
        rateClient.createRating({ lectureId: this.lectureId, ...this.formData }).then(() => {
          this.$message.success('提交点评成功！');
          // TODO: 更新详情页数据
          // TODO: 验证一下 back 后究竟是否会保留原来的 state，如果是重新 mount 就不需要从这里更新数据了，下同
          this.$router.back();
        }).finally(() => {
          this.isLoading = false;
        });
      } else {
        // 有点评 Id，编辑点评
        rateClient.editRating({ ratingId: this.ratingId, ...this.formData }).then(() => {
          this.$message.success('编辑点评成功！');
          // TODO: 更新详情页数据
          this.$router.back();
        }).finally(() => {
          this.isLoading = false;
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.content-box {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: #444;
  font-size: 14px;
  margin: 0 auto;
  max-width: 640px;
  overflow-y: auto;

  .title {
    flex: 1;
    margin-right: 24px;
    font-size: 18px;
    color: #333;
  }

  > .lecture-title {
    display: flex;
    padding: 29px 0 27px 26px;

    > span {
      font-weight: bold;
      color: $gray2;
      font-size: 22px;
      line-height: 24px;
      margin-right: 8px;
    }
  }

  > .star-box {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 0 26px;

    > .star-box__item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      > span:first-child {
        font-size: 18px;
        color: $gray2;
      }
    }
  }

  > .textarea-box {
    padding: 0 28px 32px;
    flex: 1;
    > textarea {
      resize: none;
      width: 100%;
      height: 100%;
      min-height: 32px;
      font-size: 18px;
      line-height: 19px;
      vertical-align: bottom;
      transition: all 0.3s, height 0s;
      background: #e3f1f3;
      border: 1px solid #ffffff;
      box-sizing: border-box;
      border-radius: 8px;
      padding: 20px 23px;
      color: $gray2;
    }
  }

  > .action-box {
    display: flex;
    justify-content: space-between;
    padding: 0 28px 64px;

    > .action-box__right > button {
      margin-left: 13px;
    }

    .button-gray {
      background-color: #f2f2f2;
      border-color: #f2f2f2;
      color: $gray2;
    }
  }
}
</style>
