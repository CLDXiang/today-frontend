<template>
  <div class="container">
    <div class="mark">
      <h3>欢迎参与评课！</h3>
      <p>您正在对<span class="inline-highlight">{{ teachers }}</span>的<span class="inline-highlight">{{ courseName }}</span>课程进行评价，首先，请选择您想评价的学期</p>

      <div style="display: flex;">
        <v-select v-model="selects.semester.value" style="width: 5rem;" :items="selects.semester.choices" />
      </div>

      <p>您觉得本课程的工作量和难易程度如何？</p>

      <div style="display: flex; align-items: center;">
        <span style="margin: 0 1rem;">工作量</span><v-select v-model="selects.workload.value" style="width: 6rem;" :items="selects.workload.choices" />
      </div>
      <div style="display: flex; align-items: center;">
        <span style="margin: 0 1rem;">难易度</span><v-select v-model="selects.difficulty.value" style="width: 6rem;" :items="selects.difficulty.choices" />
      </div>
      
      <h3>您对此课程的体验如何？</h3>
      <p>您可在此畅所欲言，并为学弟学妹们提供一些详实有效的信息</p>
      <div>
        <v-textarea v-model="comment" rows="5" />
        <span />
      </div>

      <h3>您在此课程上所得成绩如何？</h3>
      <p>此信息将会以完全匿名的方式参与统计，可以选择跳过此步骤</p>
      <div style="display: flex;">
        <v-select v-model="selects.score.value" style="width: 5rem;" :items="selects.score.choices" />
      </div>

      <h3>{{ rangeRates[0].title }}</h3>
      <div style="display: flex;">
        <v-select v-model="rangeRates[0].choiceValue" style="width: 7rem;" :items="rangeRates[0].choices" />
      </div>

      <h3>感谢您的参与！</h3>
      <p>
        <!-- TODO -->
        在<span class="inline-highlight">100</span>个课程中<br>
        已有<span class="inline-highlight">25</span>位学生进行了有效评测
      </p>

      <div>
        <v-btn color="primary" @click="handleSubmit">
          提交评论
        </v-btn>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      teachers: ' TA ',
      courseName: ' 算法设计与分析 ',
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
        score: {
          value: '请选择',
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
    };
  },
  methods: {
    handleSubmit() {
      // console.log('submit');
      // console.log(this.$route.params.code, this.$route.params.index);
    },
  },
};
</script>


<style lang="scss" scoped>
@import '../../scss/config.scss';

// margin, font-size, line-height for hx, p, div
@mixin mark {
  $spacing: $large-spacing/2;
  $line-height: 1.4em;

  h3,
  p {
    color: rgba(black, $active-opacity);
    line-height: $line-height;
  }

  //Spacing
  > h3,
  > p {
    margin: 0 $medium-spacing calc(#{$spacing} - #{($line-height - 1em) / 2}) $medium-spacing;
  }
  & > div {
    margin: 0 $medium-spacing $spacing $medium-spacing;
  }

  //Section spacing
  > h3 {
    margin-top: $spacing;
  }
  & > *:first-child {
    margin-top: calc(#{$spacing} - #{($line-height - 1em) / 2});
  }
  & > *:last-child {
    margin-bottom: $large-spacing/2;
  }

  p {
    font-size: 1em;
  }

  h3 {
    font-size: 1.9em;
  }
}

.container {
  display: flex;
  justify-content: center;
  padding: 0;
}

.mark {
  max-width: 0.618 * $main-width;
  @include mark;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
}
</style>
