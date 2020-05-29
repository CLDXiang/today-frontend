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
    return {
      starLectures: [],
    };
  },
  async created() {
    this.$store.commit('SET_BAR_TITLE', '关注课程');
    await initLecture();
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store.state.profile.userStar.forEach((element) => {
        this.starLectures.push(this.$store.getters.id2lecture[`${element.lecture_id}`]);
      });
    },
  },
};
</script>

<style></style>
