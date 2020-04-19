<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        md="10"
        lg="8"
      >
        <v-card
          class="mx-auto"
          outlined
        >
          <v-list>
            <v-subheader>已关注课程</v-subheader>
            <template
              v-for="(item, index) in starCourses"
            >
              <v-divider
                v-if="index == 0"
                :key="'divider1-' + item.name"
              />
              <v-list-item
                :key="item.name"
                :to="'/rate'"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.name" />
                  <v-list-item-subtitle v-text="item.intro" />
                </v-list-item-content>
              </v-list-item>
              <v-divider
                :key="'divider2-' + item.name"
              />
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
      starCourses: [
        {
          name: 'Introduction to Algorithm',
          fav: 13,
          score: 9.9,
          rateCount: '99+',
          tags: [
            { id: 1, name: 'Naive' },
            { id: 2, name: 'Medium Workload' },
          ],
          intro:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
          name: 'Introduction to Algorithm2',
          fav: 13,
          score: 9.9,
          rateCount: '99+',
          tags: [
            { id: 1, name: 'Naive' },
            { id: 2, name: 'Medium Workload' },
          ],
          intro:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
      ],
    };
  },
};
</script>

<style></style>
