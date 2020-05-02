<template>
  <div>
    <v-navigation-drawer v-model="showMenu" app fixed>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>{{ user }}</v-list-item-content>
        </v-list-item>
        <v-list-item @click="toStar">
          <v-list-item-action>
            <v-icon>mdi-book</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>关注课程</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>0</v-list-item-title>
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
            <v-list-item-title>{{ countUserRate }}</v-list-item-title>
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
            <v-list-item-title>{{ countFollowing }}</v-list-item-title>
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
            <v-list-item-title>{{ countFollower }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="doNothing">
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>设置</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="doNothing">
          <v-list-item-action>
            <v-icon>mdi-help</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>帮助</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
import { getUserRate, getFollowing, getFollower } from '../../services/post.service';
import log from '../../utils/log';

export default {
  name: 'TopToolbar',
  data: () => ({
    showMenu: false,
    countUserRate: 0,
    countFollower: 0,
    countFollowing: 0,
  }),
  computed: {
    user() {
      return this.$store.state.user.name;
    },
    barTitle() {
      return this.$store.state.app.barTitle;
    },
    status() {
      return this.$store.getters.userLoggedIn ? '登出' : '登录';
    },
  },
  mounted() {
    if (this.$store.getters.userLoggedIn) {
      getUserRate()
        .then((userRate) => {
          this.countUserRate = Object.keys(userRate).length;
          log.info(userRate);
        })
        .catch((err) => {
          log.info(err);
        });
      getFollower()
        .then((follower) => {
          this.countFollower = Object.keys(follower).length;
          log.info(follower);
        })
        .catch((err) => {
          log.info(err);
        });
      getFollowing()
        .then((following) => {
          this.countFollowing = Object.keys(following).length;
          log.info(following);
        })
        .catch((err) => {
          log.info(err);
        });
    } else {
      this.countUserRate = 0;
      this.countFollower = 0;
      this.countFollowing = 0;
    }
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
      if (this.$store.getters.userLoggedIn) {
        log.info('logout');
        this.$store.commit('LOGOUT');
        this.$router.replace({ name: 'Timetable' });
      } else {
        this.$router.replace({ name: 'Login', query: { redirect: '/profile' } });
      }
    },
    toStar() {
      if (window.location.pathname === '/profile/star') {
        this.showMenu = false;
      } else {
        this.$router.replace({ name: 'StarCourse' });
      }
    },
    toMyRate() {
      if (window.location.pathname === '/profile/rate') {
        this.showMenu = false;
      } else {
        this.$router.replace({ name: 'UserRate' });
      }
    },
    toFollower() {
      if (window.location.pathname === '/profile/follower') {
        this.showMenu = false;
      } else {
        this.$router.replace({ name: 'Follower' });
      }
    },
    toFollowing() {
      if (window.location.pathname === '/profile/following') {
        this.showMenu = false;
      } else {
        this.$router.replace({ name: 'Following' });
      }
    },
  },
};
</script>
