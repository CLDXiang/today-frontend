<template>
  <v-bottom-navigation
    :value="activePage"
    class="bottom-nav"
    app
    grow
    color="primary"
  >
    <v-btn value="timetable" @click="handleClick('timetable')">
      <span>课表</span>
      <!-- <v-icon>mdi-table</v-icon> -->
      <icon-timetable />
    </v-btn>

    <v-btn value="rating" @click="handleClick('rating')">
      <span>评课</span>
      <!-- <v-icon>mdi-chart-box-outline</v-icon> -->
      <icon-rating />
    </v-btn>

    <!-- <v-btn value="notification" @click="handleClick('notification')"> -->
    <!-- <span>消息</span> -->
    <!-- <v-icon>mdi-email-outline</v-icon> -->
    <!-- <icon-notification /> -->
    <!-- </v-btn> -->

    <v-btn value="status" @click="handleClick('status')">
      <span>{{ status }}</span>
      <!-- <v-icon>mdi-emoticon-happy-outline</v-icon> -->
      <icon-my />
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="js">
import { IconMy, IconRating, IconTimetable } from '../icons';
import log from '../../utils/log';

export default {
  components: { IconMy, IconRating, IconTimetable },
  computed: {
    activePage() {
      const { path } = this.$route;
      if (/\/rating\/?.*$/.test(path)) {
        return 'rating';
      }
      if (/\/notification\/?.*$/.test(path)) {
        return 'notification';
      }
      if (
        /\/me\/?.*$/.test(path) ||
        /\/login\/?.*$/.test(path) ||
        /\/register\/?.*$/.test(path) ||
        /\/forgot-password\/?.*$/.test(path)
      ) {
        return 'status';
      }
      return 'timetable';
    },
    status() {
      return this.$store.getters.userLoggedIn ? '我的' : '登录';
    },
  },
  methods: {
    handleClick(v) {
      if (this.activePage === v) return;
      if (v === 'timetable') {
        this.$router.push({ name: 'Timetable' }).catch((e) => {
          log.info(e);
        });
      } else if (v === 'rating') {
        this.$router.push({ name: 'Rating' }).catch((e) => {
          log.info(e);
        });
      } else if (v === 'notification') {
        this.$router.push({ name: 'Notification' }).catch((e) => {
          log.info(e);
        });
      } else if (v === 'status') {
        this.$router.push({ name: this.$store.getters.userLoggedIn ? 'Me' : 'Login' }).catch((e) => {
          log.info(e);
        });
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.bottom-nav > .v-btn {
  height: 100% !important;

  .v-btn__content > span:first-child {
    padding-top: 4px;
  }
}
</style>