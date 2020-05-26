<template>
  <v-list two-line>
    <template v-for="(lecture, index) in history">
      <v-list-item :key="lecture.lectureId" :to="`/lecture/${lecture.code}/${lecture.idx}`">
        <v-list-item-content>
          <v-list-item-title v-text="`${lecture.code}.${lecture.idx} ${lecture.name}`" />
          <v-list-item-subtitle v-text="lecture.teacher" />
        </v-list-item-content>

        <v-list-item-action>
          <v-list-item-action-text v-text="lecture.time" />
        </v-list-item-action>
      </v-list-item>

      <v-divider v-if="index + 1 < history.length" :key="index" />
    </template>
  </v-list>
</template>

<script>
import { initLecture, getLectureById } from '../../services/lecture';
import renderTime from '../../utils/time';

export default {
  data() {
    return {
      history: [],
    };
  },
  async created() {
    this.$store.commit('SET_BAR_TITLE', '最近浏览');
    await initLecture();
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store.state.profile.history.forEach((element) => {
        const time = { time: renderTime(element.created_at) };
        this.history.push({ ...getLectureById(element.history_about_id), ...time });
      });
    },
  },
};
</script>
