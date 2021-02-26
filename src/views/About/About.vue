<template>
  <main>
    <span
      class="fixed top-4 left-4 cursor-pointer hover:opacity-80"
      @click="$router.replace('/user')"
    >
      <f-icon
        name="back"
        :width="12"
        :height="24"
      />
    </span>
    <!-- <about-section title="关于我们">
    </about-section> -->
    <about-section title="联系我们">
      <p>
        有反馈或建议，或者想要关注我们的项目进展？我们的催更微信群链接将在开学后正式推广时放出，敬请期待
        💖
      </p>
    </about-section>
    <about-section title="更新日志">
      <update-log
        version="v1.1.0"
        :date="dayjs('202102242230').fromNow()"
      >
        <h3>新功能</h3>
        <ul>
          <li>上线评课模块基本功能</li>
        </ul>
        <h3>BUG 修复</h3>
        <ul>
          <li>修复若干已知 BUG</li>
        </ul>
      </update-log>
    </about-section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import dayjs from 'dayjs';
import { AboutSection, UpdateLog } from './components';

export default defineComponent({
  components: {
    AboutSection,
    UpdateLog,
  },
  props: {
    /** 标题 */
    title: { type: String, default: '' },
  },
  setup() {
    return {
      dayjs,
    };
  },
});
</script>

<style lang="postcss" scoped>
h3 {
  @apply text-left font-semibold mt-1;
}

ul > li {
  @apply text-left;
}

ul > li::before {
  content: '- ';
}
</style>
