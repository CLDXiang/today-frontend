<template>
  <v-container>
    <v-row justify="center">
      <v-col md="10" lg="8">
        <v-card class="mx-auto" outlined>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                {{ user }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-row dense>
              <template v-for="(item, index) in cols">
                <v-col :key="'col-' + index">
                  <v-list-item two-line :to="item.to" class="px-1">
                    <v-list-item-content>
                      <v-list-item-title align="center" v-text="item.name" />
                      <v-list-item-subtitle
                        align="center"
                        class="mt-2"
                        v-text="item.count"
                      />
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-divider
                  v-if="index < cols.length - 1"
                  :key="'divider-' + index"
                  vertical
                />
              </template>
            </v-row>
          </v-list-item>
          <v-card-actions>
            <v-row justify="center">
              <v-col md="4" lg="5">
                <v-btn color="primary" large block @click="logout">
                  退出登录
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      cols: [
        {
          name: '关注课程',
          count: '',
          to: { name: 'StarCourse' },
        },
        {
          name: '我的评论',
          count: '',
          to: { name: 'UserRate' },
        },
        {
          name: '粉丝',
          count: '',
          to: { name: 'Follower' },
        },
        {
          name: '关注用户',
          count: '',
          to: { name: 'Following' },
        },
        {
          name: '浏览历史',
          count: '',
          to: { name: 'History' },
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'countUserRate',
      'countUserStar',
      'countFollower',
      'countFollowing',
      'countHistory',
    ]),
    user() {
      return this.$store.state.user.name;
    },
  },
  created() {
    this.$store.commit('SET_BAR_TITLE', '个人中心');
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.cols[0].count = this.countUserRate;
      this.cols[1].count = this.countUserStar;
      this.cols[2].count = this.countFollower;
      this.cols[3].count = this.countFollowing;
      this.cols[4].count = this.countHistory;
    },
    logout() {
      this.$store.commit('LOGOUT');
      this.$router.replace({ name: 'Login', query: { redirect: '/profile' } });
    },
  },
};
</script>

<style></style>
