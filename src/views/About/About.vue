<template>
  <main class="relative w-full h-full overflow-y-auto max-w-14xl">
    <span
      class="absolute cursor-pointer top-4 left-4 hover:opacity-80"
      @click="routerBack('/user')"
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
        class="mx-auto w-60"
        src="img/wxpr.jpg"
        alt="QR"
      >
    </about-section>
    <about-section title="更新日志">
      <f-skeleton
        v-if="loading"
        :rows="4"
      />
      <change-log
        v-for="log in changeLogs"
        :key="log.date"
        :change-log="log"
      />
    </about-section>
  </main>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, ref } from 'vue';
import { message } from 'ant-design-vue';
import { useRouterBack } from '@/composables';
import { useStore } from 'vuex';
import { AboutSection, ChangeLog } from './components';
import { ChangeLogType } from './type';

export default defineComponent({
  components: {
    AboutSection,
    ChangeLog,
  },
  setup() {
    const loading = ref(true);
    const changeLogs = ref<ChangeLogType[]>([]);
    const store = useStore();

    axios.get<ChangeLogType[]>('changeLog.json')
      .then(({ data }) => {
        // 最新排最前
        const sortedData = data.sort((a, b) => (a.date < b.date ? 1 : -1));
        changeLogs.value = sortedData;
        store.commit('setLastSawChangeLogDate', sortedData[0].date);
      })
      .catch((err) => {
        message.error('获取更新日志失败', 1.5);
        throw err;
      }).finally(() => {
        loading.value = false;
      });

    return {
      loading,
      changeLogs,
      /** 路由回退 */
      routerBack: useRouterBack(),
    };
  },
});
</script>
