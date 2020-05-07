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
            <div v-for="item in userRate" :key="item.rateId">
              <v-divider />
              <!-- TODO 暂时路由到这个界面 -->
              <v-list-item :to="'/rate/ENGL110069/03#discuss'">
                <v-list-item-content>
                  <v-list-item-title v-text="item.className + ' · ' + item.instructorName" />
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
export default {
  data() {
    return {
      userRate: this.$store.state.profile.userRate,
    };
  },
};
</script>

<style></style>
