<template>
  <div>
    <v-navigation-drawer v-model="showMenu" app fixed>
      <v-list dense>
        <div v-show="!userLoggedIn">
          <v-list-item>
            <v-list-item-content>
              未登录
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-show="userLoggedIn">
          <v-list-item two-line @click="toProfile">
            <v-list-item-avatar>
              <img :src="user.avatar">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ user.nickName }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.bio }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-show="userLoggedIn">
          <v-list-item @click="toStar">
            <v-list-item-action>
              <v-icon>mdi-book</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>关注课程</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>
                {{ countUserStar }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="toMyRate">
            <v-list-item-action>
              <v-icon>mdi-comment-processing</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>我的课评</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>
                {{ countUserRate }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="toFollowing">
            <v-list-item-action>
              <v-icon>mdi-eye</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>关注的人</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>
                {{ countFollowing }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="toFollower">
            <v-list-item-action>
              <v-icon>mdi-human-greeting</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>我的粉丝</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>
                {{ countFollower }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="toHistory">
            <v-list-item-action>
              <v-icon>mdi-history</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>浏览历史</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>
                {{ countHistory }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="toNotification">
            <v-list-item-action>
              <v-icon>mdi-bell</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>通知动态</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>
                {{ countNotification }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="toSettings">
            <v-list-item-action>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>设置</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ status }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app fixed dark color="primary">
      <v-app-bar-nav-icon @click.stop="toggleMenu" />
      <v-toolbar-title>{{ barTitle }}</v-toolbar-title>
      <v-spacer />
      <!-- <v-icon @click.stop="back">mdi-face</v-icon> -->
      <v-btn @click.stop="back">
        返回
      </v-btn>
      <!-- <v-app-bar-nav-icon @click.stop="toggleStatus"></v-app-bar-nav-icon> -->
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import log from '../../utils/log';

export default {
  name: 'TopToolbar',
  data: () => ({
    showMenu: false,
  }),
  computed: {
    ...mapState(['user']),
    ...mapGetters([
      'userLoggedIn',
      'countUserRate',
      'countUserStar',
      'countFollower',
      'countFollowing',
      'countHistory',
      'countNotification',
    ]),
    barTitle() {
      return this.$store.state.app.barTitle;
    },
    status() {
      return this.userLoggedIn ? '登出' : '登录';
    },
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    doNothing() {},
    back() {
      // this.$router.push('login');
      this.$router.back();
    },
    logout() {
      if (this.userLoggedIn) {
        log.info('logout');
        this.$store.commit('LOGOUT');
        this.$router.replace({ name: 'Timetable' });
      } else {
        this.$router.replace({ name: 'Login', query: { redirect: '/profile' } });
      }
    },
    toStar() {
      if (this.$route.path === '/profile/star') {
        this.showMenu = false;
      } else {
        this.$router.push({ name: 'StarCourse' });
      }
    },
    toMyRate() {
      if (this.$route.path === '/profile/rate') {
        this.showMenu = false;
      } else {
        this.$router.push({ name: 'UserRate' });
      }
    },
    toFollower() {
      if (this.$route.path === '/profile/follower') {
        this.showMenu = false;
      } else {
        this.$router.push({ name: 'Follower' });
      }
    },
    toFollowing() {
      if (this.$route.path === '/profile/following') {
        this.showMenu = false;
      } else {
        this.$router.push({ name: 'Following' });
      }
    },
    toHistory() {
      if (this.$route.path === '/profile/history') {
        this.showMenu = false;
      } else {
        this.$router.push({ name: 'History' });
      }
    },
    toNotification() {
      if (this.$route.path === '/profile/notification') {
        this.showMenu = false;
      } else {
        this.$router.push({ name: 'Notification' });
      }
    },
    toSettings() {
      if (this.$route.path === '/profile/settings') {
        this.showMenu = false;
      } else {
        this.$router.push({ name: 'Settings' });
      }
    },
    toProfile() {
      if (this.$route.path === '/profile') {
        this.showMenu = false;
      } else {
        this.$router.push({ name: 'UserProfile' });
      }
    },
  },
};
</script>
