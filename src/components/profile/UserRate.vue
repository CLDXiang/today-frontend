<template>
  <v-list two-line>
    <template v-for="(item, index) in items">
      <!-- TODO: 路由的目标不对 -->
      <v-list-item :key="item.lectureId" :to="`/rate/${item.code}/${item.idx}`">
        <v-list-item-content>
          <v-list-item-title v-text="item.name + ' · ' + item.teacher" />
          <v-list-item-subtitle
            class="text--primary"
            v-text="'难度 ' + item.difficulty + ' · 工作量 ' + item.workload + ' · 给分 ' + item.grading"
          />
          <v-list-item-subtitle v-text="item.content" />
        </v-list-item-content>

        <v-list-item-action>
          <v-list-item-action-text v-text="item.time" />
        </v-list-item-action>
      </v-list-item>

      <v-divider v-if="index + 1 < items.length" :key="index" />
    </template>
  </v-list>
</template>

<script>
import { getLectureById, renderTime } from '../../services/profile.service';
import store from '../../store';

export default {
  data: () => ({
    items: [],
  }),
  created() {
    store.commit('SET_BAR_TITLE', '历史评论');
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store.state.profile.userRate.forEach((element) => {
        const time = { time: renderTime(element.createdAt) };
        this.items.push(Object.assign(getLectureById(element.lectureId), element, time));
      });
    },
  },
};
</script>
