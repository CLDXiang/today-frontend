<template>
  <v-container>
    <v-row justify="center">
      <v-col md="10" lg="8">
        <v-card class="mx-auto" outlined>
          <v-list>
            <v-subheader>
              <strong>
                <font size="3">
                  最近浏览
                </font>
              </strong>
            </v-subheader>
            <div v-for="item in history" :key="item.history_about_id">
              <v-divider />
              <v-list-item :to="`/rate/${item.code}/${item.idx}`">
                <v-list-item-content>
                  <v-list-item-title v-text="item.name" />
                  <v-list-item-subtitle v-text="item.teacher" />
                  <v-list-item-subtitle v-text="item.created_at" />
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
      history: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store.state.profile.history.forEach((element) => {
        this.history.push(Object.assign(getLectureById(element.history_about_id), element));
      });
    },
  },
};
</script>

<style></style>
