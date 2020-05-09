<template>
  <v-list two-line>
    <template v-for="(item, index) in history">
      <v-list-item :key="item.lectureId" :to="`/rate/${item.code}/${item.idx}`">
        <v-list-item-content>
          <v-list-item-title v-text="item.name" />
          <v-list-item-subtitle v-text="item.teacher" />
        </v-list-item-content>

        <v-list-item-action>
          <v-list-item-action-text v-text="item.time" />
        </v-list-item-action>
      </v-list-item>

      <v-divider v-if="index + 1 < history.length" :key="index" />
    </template>
  </v-list>
</template>

<script>
import { getLectureById, renderTime } from '../../services/profile.service';
import store from '../../store';

export default {
  data() {
    return {
      history: [],
    };
  },
  created() {
    store.commit('SET_BAR_TITLE', '最近浏览');
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store.state.profile.history.forEach((element) => {
        const time = { time: renderTime(element.created_at) };
        this.history.push(Object.assign(getLectureById(element.history_about_id), time));
      });
    },
  },
};
</script>
