<template>
  <div>
    <v-navigation-drawer v-model="showMenu" app fixed>
      <v-list dense>
        <div v-if="!userLoggedIn">
          <v-list-item>
            <v-list-item-content>
              未登录
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-else>
          <v-list-item two-line @click="toProfile">
            <v-list-item-avatar>
              <img :src="processAvatar(user.avatar)">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ user.nickName||'Anonymous' }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.bio||'这个人还没有个性签名哦' }}</v-list-item-subtitle>
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
              <v-list-item-title>我的评课</v-list-item-title>
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

      <v-autocomplete
        v-model="searchSelect"
        :loading="loading"
        :items="searchItems"
        :search-input.sync="searchInput"
        flat
        dense
        hide-no-data
        hide-details
        label="Looking for some courses or user?"
        solo-inverted
      />
      <!-- <v-app-bar-nav-icon @click.stop="toggleStatus"></v-app-bar-nav-icon> -->
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import debounce from 'lodash/debounce';
import log from '../../utils/log';
import defaultAvatar from '../../assets/default_avatar.png';
import { initLecture, filterLecturesByType, filterLectures } from '../../services/lecture';
import { searchUser } from '../../services/search.service';

export default {
  name: 'TopToolbar',
  data: () => ({
    showMenu: false,
    loading: false,
    searchSelect: null,
    searchInput: '',
    searchItems: [],
  }),
  watch: {
    searchInput(val) {
      this.loading = true;
      this.dUpdateSearchResult(val);
    },
    searchSelect(val) {
      this.$router.push(val);
    },
  },
  async created() {
    this.dUpdateSearchResult = debounce(this.updateSearchResult, 500);
    await initLecture();
    this.dUpdateSearchResult('');
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters([
      'userLoggedIn',
      'countUserRate',
      'countUserStar',
      'countFollower',
      'countFollowing',
      'countHistory',
    ]),
    barTitle() {
      return this.$store.state.app.barTitle;
    },
    status() {
      return this.userLoggedIn ? '登出' : '登录';
    },
  },
  methods: {
    async updateSearchResult(val) {
      const result = [{ header: '课程' }];
      filterLectures(val).forEach((data) => {
        result.push({
          text: `${data.name}(${data.teacher})`,
          value: `/lecture/${data.code}/${data.idx}`,
        });
      });
      result.push({ header: '用户' });
      const data = await searchUser(val);
      data.forEach(d => {
        result.push({
          text: `${d.name}(${d.nickName})`,
          value: `/user/${d.id}`,
        });
      })
      console.log(data);

      if (result.length > 2) {
        this.searchItems = result;
      }
      this.loading = false;
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    doNothing() {},
    back() {
      // this.$router.push('login');
      this.$router.back();
    },
    processAvatar(originAvatar) {
      // FIXME: 后端改掉对应默认图像路由后，这里只留下那一个路由的匹配串
      if (originAvatar.includes('/default_avatar.png') || originAvatar.includes('/default.png')) {
        return defaultAvatar;
      }
      return originAvatar;
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
    toSettings() {
      if (this.$route.path === '/profile/settings') {
        this.showMenu = false;
      } else {
        this.$router.push({ name: 'Settings' });
      }
    },
    toProfile() {
      if (this.$route.path === '/profile/' || this.$route.path === '/profile') {
        this.showMenu = false;
      } else {
        this.$router.push({ name: 'UserProfile' });
      }
    },
  },
};
</script>
