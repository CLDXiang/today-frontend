<template>
  <div class="w-full h-full overflow-y-auto content-box max-w-14xl">
    <rating-head-bar
      is-back-visible
      @click-back="routerBack(`/rating/lecture/${lectureId}`)"
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
      <span class>
        <span class="action-box__right">
          <a-button
            shape="round"
            size="large"
            :loading="isLoading"
            @click="handleClickGetDraft"
          >
            恢复草稿
          </a-button>
          <a-button
            :class="{ 'button-gray': isRateDraftEdited }"
            shape="round"
            size="large"
            :disabled="!isRateDraftEdited"
            :loading="isLoading"
            @click="handleClickSaveDraft"
          >
            保存
          </a-button>
          <a-button
            shape="round"
            type="primary"
            size="large"
            :disabled="!isFormDataAvailable || !isRateEdited"
            :loading="isLoading"
            @click="handleClickSubmit"
          >
            发布
          </a-button>
        </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouterBack } from '@/composables';
import FiveStars from '@/components/FiveStars.vue';
import { rateClient, lectureClient, rateDraftClient } from '@/apis';
import { mapMutations, mapState } from 'vuex';
import { scoreTextTable } from '@/utils/rating';
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
  setup() {
    return {
      /** 路由回退 */
      routerBack: useRouterBack(),
    };
  },
  data() {
    return {
      /** 课程名 */
      lectureName: '',
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
      } as RateForm,
      /** 上一次保存的草稿数据 */
      savedRateDraft: {
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
      } as RateForm,
      /** 上一次发布的评课数据 */
      savedRate: {
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
      } as RateForm,
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
    /** 与上一次保存的草稿相比是否修改过 */
    isRateDraftEdited(): boolean {
      return !(
        this.formData.difficulty === this.savedRateDraft.difficulty
        && this.formData.nice === this.savedRateDraft.nice
        && this.formData.workload === this.savedRateDraft.workload
        && this.formData.recommended === this.savedRateDraft.recommended
        && this.formData.content?.trim() === this.savedRateDraft.content?.trim()
      );
    },
    /** 与上一次发布的评课相比是否修改过 */
    isRateEdited(): boolean {
      return !(
        this.formData.difficulty === this.savedRate.difficulty
        && this.formData.nice === this.savedRate.nice
        && this.formData.workload === this.savedRate.workload
        && this.formData.recommended === this.savedRate.recommended
        && this.formData.content?.trim() === this.savedRate.content?.trim()
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
          formData: { ...this.formData },
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

      /** 拿 storage 的 */
      const localRatingForm: RateForm = this.ratingForms[this.lectureId];

      // 拿线上的
      rateClient
        .getRatingByLectureId({ lectureId: this.lectureId })
        .then(({ data }) => {
          // 以线上拿到的数据为变更参考依据
          this.savedRate = { ...this.formData, ...data };
          this.savedRateDraft = { ...this.formData, ...data };

          // 有 sessionStorage 的就用本地的
          if (localRatingForm) {
            // 有 sessionStorage 的就用本地的
            this.formData = { ...localRatingForm };
          } else {
            // 没有的话用线上的
            this.formData = { ...this.formData, ...data };
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
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
      };
    },
    /** 点击恢复草稿按钮 */
    handleClickGetDraft() {
      this.isLoading = true;
      rateDraftClient
        .getDraft(this.lectureId)
        .then(({ data }) => {
          this.formData = { ...this.formData, ...data };
          this.savedRateDraft = { ...this.formData, ...data };
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    /** 对比字段，如果没有变化返回 undefined，否则返回新的值 */
    editedValue<K extends keyof RateForm>(fieldName: K): RateForm[K] | undefined {
      if (this.formData[fieldName] === this.savedRateDraft[fieldName]) return undefined;
      if (fieldName === 'content' && this.formData.content?.trim() === this.savedRateDraft.content?.trim()) return undefined;
      return this.formData[fieldName];
    },
    /** 点击保存按钮 */
    handleClickSaveDraft() {
      this.isLoading = true;
      rateDraftClient.saveDraft({
        lectureId: this.lectureId,
        difficulty: this.editedValue('difficulty'),
        nice: this.editedValue('nice'),
        workload: this.editedValue('workload'),
        recommended: this.editedValue('recommended'),
        content: this.editedValue('content'),
      }).then(() => {
        this.$message.success('保存草稿成功！');
        this.savedRateDraft = { ...this.formData };
      }).finally(() => {
        this.isLoading = false;
      });
    },
    /** 点击发布按钮 */
    handleClickSubmit() {
      this.isLoading = true;
      rateClient
        .saveRating({ lectureId: this.lectureId, ...this.formData })
        .then(() => {
          this.savedRate = { ...this.formData };
          this.$message.success('发布点评成功！');
          this.routerBack(`/rating/lecture/${this.lectureId}`);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
});
</script>

<style lang="scss" scoped>
.content-box {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: #444;
  font-size: 14px;
  margin: 0 auto;

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
