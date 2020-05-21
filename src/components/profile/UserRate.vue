<template>
  <v-list three-line>
    <template v-for="(rate, index) in rates">
      <!-- TODO: 路由的目标不对 -->
      <v-list-item :key="rate.lectureId" :to="`/lecture/${rate.code}/${rate.idx}`">
        <v-list-item-content>
          <v-list-item-title v-text="`${rate.name} · ${rate.teacher}`" />
          <!-- <v-list-item-subtitle
            class="text--primary"
            v-text="'难度 ' + item.difficulty + ' · 工作量 ' + item.workload + ' · 给分 ' + item.grading"
          /> -->
          <v-list-item-subtitle v-text="rate.content" />
        </v-list-item-content>

        <v-list-item-action>
          <v-list-item-action-text v-text="rate.time" />
        </v-list-item-action>
      </v-list-item>

      <v-divider v-if="index + 1 < rates.length" :key="index" />
    </template>
  </v-list>
</template>

<script>
import getLectureById from '../../utils/lecture';
import renderTime from '../../utils/time';

export default {
  data: () => ({
    rates: [],
  }),
  created() {
    this.$store.commit('SET_BAR_TITLE', '历史评论');
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store.state.profile.userRate.forEach((element) => {
        const time = { time: renderTime(element.createdAt) };
        this.rates.push({ ...getLectureById(element.lectureId), ...element, ...time });
      });
    },
  },
};
</script>
