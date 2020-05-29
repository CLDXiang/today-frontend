<template>
  <v-list two-line>
    <div v-for="(lecture, index) in starLectures" :key="lecture.id">
      <v-list-item :to="`/lecture/${lecture.code}/${lecture.idx}`">
        <v-list-item-content>
          <v-list-item-title v-text="`${lecture.code}.${lecture.idx} ${lecture.name}`" />
          <v-list-item-subtitle v-text="lecture.teacher" />
        </v-list-item-content>
      </v-list-item>
      <v-divider v-if="index + 1 < starLectures.length" :key="index" />
    </div>
  </v-list>
</template>

<script>
import { initLecture } from '../../services/lecture';

export default {
  data() {
    return {};
  },
  computed: {
    starLectures() {
      const starLectures = [];
      this.$store.state.profile.userStar.forEach((element) => {
        if (this.$store.getters.id2lecture[`${element.lecture_id}`]) {
          starLectures.push(this.$store.getters.id2lecture[`${element.lecture_id}`]);
        }
      });
      return starLectures;
    },
  },
  created() {
    this.$store.commit('SET_BAR_TITLE', '关注课程');
    initLecture();
  },
};
</script>

<style></style>
