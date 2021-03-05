<template>
  <main>
    <span
      :class="
        'h-full w-full overflow-y-auto max-w-14xl' +
          'fixed top-4 left-4 cursor-pointer hover:opacity-80'
      "
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
      <p>有反馈或建议，或者想要关注我们的项目进展？快快扫码加群：</p>
      <img
        class="w-60 mx-auto"
        src="img/wxpr.jpg"
        alt="QR"
      >
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
