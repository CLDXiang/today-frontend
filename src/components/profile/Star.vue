<template>
  <v-container>
    <v-row justify="center">
      <v-col md="10" lg="8">
        <v-card class="mx-auto" outlined>
          <v-list>
            <v-subheader>
              <strong>
                <font size="3">
                  关注课程
                </font>
              </strong>
            </v-subheader>
            <div v-for="item in starLectures" :key="item.id">
              <v-divider />
              <v-list-item :to="`/rate/${item.code}/${item.idx}`">
                <v-list-item-content>
                  <v-list-item-title v-text="item.name" />
                  <v-list-item-subtitle v-text="item.teacher" />
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
      starLectures: [],
    };
  },
  created() {
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
