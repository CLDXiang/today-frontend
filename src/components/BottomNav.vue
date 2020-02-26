<template>
  <v-bottom-navigation app fixed grow v-model="activePage" color="primary">
    <v-btn value="course" @click="courseClick">
      <span>选课</span>
      <v-icon>mdi-domain</v-icon>
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
import log from '../utils/log.js';
export default {
    data: () => {
        return {
        }
    },
    mounted() {
    },
    computed: {
      activePage() {
        return 'course';
      }
    },
    methods: {
      courseClick() {
        if (this.activePage != 'course') {
          this.$router.push('/').then(() => {
            this.$store.state.app.barTitle = '课表';
          });
        }
      },
      statusClick() {
        if (this.$store.getters.userLoggedIn) {
          log.info('jump to profile');
          this.$router.push('profile');
        } else {
          this.$router.push('login');
        }
      },
      holeClick() {
        this.$router.push('hole').then(() => {
          this.$store.state.app.barTitle = '树洞';
        }).catch(e => {
          log.info(e);
        });
      }
    },
    computed: {
      status() {
        return this.$store.getters.userLoggedIn ? "个人中心" : "未登录";
      },
      // activePage() {
      //   return this.$router.url
      // },
    },
}
</script>