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
import { mapGetters, mapState } from 'vuex';
import { initLecture } from '../../services/lecture';
import renderTime from '../../utils/time';

export default {
  data() {
    return {
      history: [],
    };
  },
  computed: {
    ...mapGetters(['id2lecture']),
    ...mapState(['profile']),
  },
  async created() {
    this.$store.commit('SET_BAR_TITLE', '最近浏览');
    await initLecture();
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.profile.history.forEach((element) => {
        const time = { time: renderTime(element.created_at) };
        this.history.push({ ...this.id2lecture[`${element.history_about_id}`], ...time });
      });
    },
  },
};
</script>
