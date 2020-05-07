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
              <!-- TODO 暂时路由到这个界面 -->
              <v-list-item :to="'/rate/ENGL110069/03#discuss'">
                <v-list-item-content>
                  <v-list-item-title v-text="'啊布吉标题'" />
                  <v-list-item-subtitle v-text="'内容'" />
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
export default {
  data() {
    return {
      history: this.$store.state.profile.history,
    };
  },
};
</script>

<style></style>
