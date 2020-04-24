<template>
  <v-container>
    <v-row justify="center">
      <v-col md="10" lg="8">
        <v-card class="mx-auto" outlined>
          <v-list>
            <v-subheader>
              <strong>
                <font size="5">
                  历史评论
                </font>
              </strong>
            </v-subheader>
            <template v-for="item in userRates">
              <v-divider :key="'divider1-' + item.name" />
              <!-- TODO 暂时路由到这个界面 -->
              <v-list-item :key="item.name" :to="'/rate/ENGL110069/03#discuss'">
                <v-list-item-content>
                  <v-list-item-title v-text="item.className + ' · ' + item.instructorName" />
                  <v-list-item-subtitle v-text="'难度 ' + item.difficulty + ' · 工作量 ' + item.workload + ' · 给分 ' + item.grading" />
                  <v-list-item-subtitle v-text="item.content" />
                  <v-list-item-subtitle v-text="item.upmote + '赞同 · ' + item.reply + '评论 · ' + item.createdAt" />
                </v-list-item-content>
              </v-list-item>
            </template>
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
      userRates: [
        {
          className: 'Introduction to Algorithm',
          instructorName: 'Instructor1',
          createdAt: '2020-04-19 16:20:48',
          difficulty: 2,
          workload: 2,
          grading: 2,
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          upmote: 13,
          reply: 4,
        },
        {
          className: 'Introduction to Algorithm',
          instructorName: 'Instructor2',
          createdAt: '2020-04-11 08:56:17',
          difficulty: 2,
          workload: 2,
          grading: 2,
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          upmote: 7,
          reply: 5,
        },
      ],
    };
  },
};
</script>

<style></style>
