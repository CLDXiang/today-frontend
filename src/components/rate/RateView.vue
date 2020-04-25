<template>
  <div class="landscape-container">
    <div class="mark">
      <h3>欢迎参与评课！</h3>
      <p>您正在对<span class="inline-highlight">「{{ lecture.teacher }}」</span>的<span class="inline-highlight">「{{ lecture.name }}」</span>课程进行评价，首先，请选择您想评价的学期</p>

      <div style="display: flex;">
        <v-select v-model="selects.semester.value" solo style="width: 5rem;" :items="selects.semester.choices" />
      </div>

      <p>您觉得本课程的工作量和难易程度如何？</p>

      <div style="display: flex; align-items: center;">
        <span style="margin: 0 1rem;">工作量</span><v-select v-model="selects.workload.value" solo style="width: 6rem;" :items="selects.workload.choices" />
      </div>
      <div style="display: flex; align-items: center;">
        <span style="margin: 0 1rem;">难易度</span><v-select v-model="selects.difficulty.value" solo style="width: 6rem;" :items="selects.difficulty.choices" />
      </div>
            
      <h3>您对此课程的体验如何？</h3>
      <p>您可在此畅所欲言，并为学弟学妹们提供一些详实有效的信息</p>
      <div class="rate-input">
        <v-textarea v-model="comment" rows="5" />
      </div>

      <h3>您在此课程上所得成绩如何？</h3>
      <p>此信息将会以完全匿名的方式参与统计，可以选择跳过此步骤</p>
      <div style="display: flex;">
        <v-select v-model="selects.grading.value" solo style="width: 5rem;" :items="selects.grading.choices" />
      </div>

      <h3>{{ rangeRates[0].title }}</h3>
      <div style="display: flex;">
        <v-select v-model="rangeRates[0].choiceValue" solo style="width: 7rem;" :items="rangeRates[0].choices" />
      </div>

      <h3>感谢您的参与！</h3>
      <p>
        在<span class="inline-highlight">100</span>个课程中<br>
        已有<span class="inline-highlight">25</span>位学生进行了有效评测
      </p>

      <div>
        <v-btn color="primary" @click="submit">
          提交评论
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import log from '../../utils/log';

// API
import { getLectureByCodeAndIdx } from '../../services/lecture';
import { postRate } from '../../services/rate';

export default {
  components: {},
  data() {
    return {
      lecture: {},
      comment: '',
      selects: {
        semester: {
          value: '2020',
          choices: ['2019', '2020'],
        },
        workload: {
          value: '摸鱼',
          choices: ['随便浪', '摸鱼', '适度肝', '头皮发麻'],
        },
        difficulty: {
          value: '普通',
          choices: ['简单', '普通', '困难', '噩梦'],
        },
        grading: {
          value: '跳过',
          choices: ['跳过', 'A', 'A-', 'B+', 'B', 'B-'],
        },
      },
      rangeRates: [
        {
          title: '您觉得本课程是否值得推荐？',
          choices: ['不推荐', '一般', '推荐', '比较推荐', '强烈推荐'],
          choiceValue: '一般',
          value: 1,
        },
      ],
      snapScrollIndex: 0,
    };
  },
  created() {
    this.lecture = getLectureByCodeAndIdx(this.$route.params.code, this.$route.params.idx);
    log.info(this.lecture);
  },
  methods: {
    submit() {
      postRate(
        this.lecture.id,
        this.selects.workload.choices.indexOf(this.selects.workload.value),
        this.selects.difficulty.choices.indexOf(this.selects.difficulty.value),
        this.selects.grading.choices.indexOf(this.selects.grading.value),
        this.comment,
        this.selects.semester.value,
        this.rangeRates[0].value,
      )
        .then((resp) => {
          log.info(resp);
          if (resp.status === 201) {
            this.$toast.success('提交成功！');
            this.$router.go(-1);
          } else {
            this.$toast.success('提交失败！');
          }
        })
        .catch((err) => {
          const code = err.response.status;
          if (code === 409) {
            this.$toast.warn('您已经评价过此课程！');
            this.$router.push(`/lecture/${this.$route.params.code}/${this.$route.params.idx}`);
          } else if (code === 400) {
            this.$toast.error('您似乎填写格式有误？');
          } else if (code === 401) {
            this.$toast.warn('请您先登录');
            this.$router.push(`/login?redirect=${this.$route.path}`);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/utils.scss';
@import '../../scss/mark.scss';

.mark {
  @include mark;
  display: flex;
  flex-direction: column;
}
.inline-highlight {
  padding: 0 0.5rem;
}
.landscape-container {
  $use-portrait: true;
  padding: 3rem;
  display: flex;
  justify-content: center;
  @if $use-portrait {
    @include portrait {
      padding: 0;
    }
  }
  > div {
    max-width: 0.6 * $main-width;
  }
}
</style>


