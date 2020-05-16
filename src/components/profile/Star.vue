<template>
  <v-list two-line>
    <div v-for="(item, index) in starLectures" :key="item.id">
      <v-list-item :to="`/rate/${item.code}/${item.idx}`">
        <v-list-item-content>
          <v-list-item-title v-text="item.name" />
          <v-list-item-subtitle v-text="item.teacher" />
        </v-list-item-content>
      </v-list-item>
      <v-divider v-if="index + 1 < starLectures.length" :key="index" />
    </div>
  </v-list>
</template>

<script>
import getLectureById from '../../utils/lecture';

export default {
  data() {
    return {
      starLectures: [],
    };
  },
  created() {
    this.$store.commit('SET_BAR_TITLE', '关注课程');
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store.state.profile.userStar.forEach((element) => {
        this.starLectures.push(getLectureById(element.lecture_id));
      });
    },
  },
};
</script>

<style></style>
