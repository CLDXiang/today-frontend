<template>
  <div class="time-diff">
    {{ timeDiff }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

export default defineComponent({
  props: {
    timeCreated: { type: Dayjs, default: '' },
  },
  computed: {
    /** 多久之前创建的 */
    minuteDiff() {
      const res = dayjs().diff(this.timeCreated, 'minute');
      return res;
    },
    timeDiff() {
      const now = dayjs();
      const minuteDiff = now.diff(this.timeCreated, 'minute');
      const hourDiff = now.diff(this.timeCreated, 'hour');
      const monthDiff = now.diff(this.timeCreated, 'month');
      const yearDiff = now.diff(this.timeCreated, 'year');
      if (minuteDiff < 60) {
        return `${minuteDiff} 分钟前`;
      } if (hourDiff < 24) {
        return `${hourDiff} 小时前`;
      } if (monthDiff < 12) {
        return `${monthDiff} 天前`;
      }
      return `${yearDiff} 年前`;
    },
  },

});
</script>

<style lang="scss" scoped>
.time-diff {
  display: inline;
}
</style>
