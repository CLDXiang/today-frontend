<template>
  <v-bottom-navigation
    v-model="activePage"
    app
    fixed
    grow
    color="primary"
  >
    <v-btn value="course" @click="courseClick">
      <span>选课</span>
      <v-icon>mdi-domain</v-icon>
    </v-btn>

    <v-btn value="rate" @click="rateClick">
      <span>评课</span>
      <v-icon>mdi-poll</v-icon>
    </v-btn>

    <v-btn value="hole" @click="holeClick">
      <span>树洞</span>
      <v-icon>mdi-arrow-up-bold-box-outline</v-icon>
    </v-btn>

    <v-btn value="status" @click="statusClick">
      <span>{{ status }}</span>
      <v-icon>mdi-call-split</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="js">
import log from '../../utils/log';

export default {
  data: () => ({}),
  computed: {
    activePage: {
      get() {
        const { path } = this.$route;
        if (/\/hole\/?.*$/.test(path)) {
          return 'hole';
        }
        if (
          /\/profile\/?.*$/.test(path) ||
          /\/login\/?.*$/.test(path) ||
          /\/user\/?.*$/.test(path)
        ) {
          return 'status';
        }
        if (/\/explore\/?.*$/.test(path) || /\/lecture\/?.*$/.test(path)) {
          return 'rate';
        }
        return 'course';
      },
      set() {},
    },
    status() {
      return this.$store.getters.userLoggedIn ? '个人中心' : '登录';
    },
    // activePage() {
    //   return this.$router.url
    // },
  },
  methods: {
    courseClick() {
      if (this.activePage !== 'course') {
        this.$router.push('/').then(() => {
          this.$store.state.app.barTitle = '课表';
        });
      }
    },
    statusClick() {
      if (this.activePage !== 'status') {
        this.$router.push({ name: 'UserProfile' }).catch((e) => {
          log.info(e);
        });
      }
    },
    holeClick() {
      this.$router
        .push({ name: 'Hole' })
        .then(() => {
          this.$store.state.app.barTitle = '树洞';
        })
        .catch((e) => {
          log.info(e);
        });
    },

    rateClick() {
      this.$router
        .push('/explore')
        .then(() => {
          this.$store.state.app.barTitle = '课程';
        })
        .catch((e) => {
          log.info(e);
        });
    },
  },
};
</script>
