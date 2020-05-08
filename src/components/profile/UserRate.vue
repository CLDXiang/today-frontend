<template>
  <v-container>
    <v-row justify="center">
      <v-col md="10" lg="8">
        <v-card class="mx-auto" outlined>
          <v-list>
            <v-subheader>
              <strong>
                <font size="3">
                  历史评论
                </font>
              </strong>
            </v-subheader>
            <div v-for="item in userRate" :key="item.id">
              <v-divider />
              <!-- TODO: 路由的目标不对 -->
              <v-list-item :to="`/rate/${item.code}/${item.idx}`">
                <v-list-item-content>
                  <v-list-item-title v-text="item.name + ' · ' + item.teacher" />
                  <v-list-item-subtitle v-text="'难度 ' + item.difficulty + ' · 工作量 ' + item.workload + ' · 给分 ' + item.grading" />
                  <v-list-item-subtitle v-text="item.content" />
                  <v-list-item-subtitle v-text="item.upmote + '赞同 · ' + item.reply + '评论 · ' + item.createdAt" />
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getLectureById } from '../../services/profile.service';

export default {
  data() {
    return {
      userRate: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store.state.profile.userRate.forEach((element) => {
        this.userRate.push(Object.assign(getLectureById(element.lectureId), element));
      });
    },
  },
};
</script>

<style></style>
