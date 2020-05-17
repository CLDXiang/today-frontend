<template>
  <v-list two-line>
    <template v-for="(item, index) in history">
      <v-list-item :key="item.lectureId" :to="`/rate/${item.code}/${item.idx}`">
        <v-list-item-content>
          <v-list-item-title v-text="item.code+'.'+item.idx+' '+item.name" />
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
import getLectureById from '../../utils/lecture';
import renderTime from '../../utils/time';

export default {
  data() {
    return {
      history: [],
    };
  },
  created() {
    this.$store.commit('SET_BAR_TITLE', '最近浏览');
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
