<template>
  <div class="text-gray-600 text-sm py-2 border-b border-gray-300">
    <div>{{ formattedDate }}</div>
    <div>
      <change-log-section
        title="新功能"
        :items="changeLog.feature"
      />
      <change-log-section
        title="BUG 修复"
        :items="changeLog.bugFix"
      />
      <change-log-section
        title="功能优化"
        :items="changeLog.optimization"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import dayjs from 'dayjs';
import { ChangeLogType } from '../type';
import ChangeLogSection from './ChangeLogSection.vue';

export default defineComponent({
  components: { ChangeLogSection },
  props: {
    changeLog: { type: Object as PropType<ChangeLogType>, required: true },
  },
  setup(props) {
    const formattedDate = computed(() => dayjs(props.changeLog.date).format('YYYY-MM-DD'));

    return {
      formattedDate,
    };
  },
});
</script>
