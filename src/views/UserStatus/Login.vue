<template>
  <div class="content-box">
    <div class="title">
      登录
    </div>
    <div class="input-box">
      <v-text-field
        v-model="name"
        label="用户名"
        autofocus
        clearable
        outlined
        required
        hint="与学校系统无关，请使用本站注册的账号~"
        :rules="[
          (v) => !!v || '用户名不能为空',
        ]"
      />
      <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text': 'password'"
        label="密码"
        clearable
        outlined
        required
        hint="https 加密传输，后台不会存储明文密码"
        :rules="[
          (v) => !!v || '密码不能为空',
        ]"
        @click:append="showPassword = !showPassword"
      />
    </div>
    <div class="button-box">
      <v-btn
        block
        color="primary"
        large
        rounded
        depressed
        @click="login"
      >
        登录
      </v-btn>
      <v-btn
        block
        color="primary"
        large
        rounded
        depressed
        outlined
        to="/register"
      >
        注册
      </v-btn>
    </div>
    <v-btn style="margin-top: 12px" text color="primary" to="/forgot-password">
      忘记密码？
    </v-btn>
  </div>
</template>

<script>
import log from '../../utils/log';
import { login } from '../../services/auth.service';
import {
  getUserProfile,
  getUserStar,
  getUserRate,
  getFollowing,
  getFollower,
  getHistory,
} from '../../services/profile.service';
import { getNotifications, getTrends } from '../../services/notice.service';

export default {
  data: () => ({
    name: '',
    password: '',
    showPassword: false,
  }),
  methods: {
    getProfile() {
      getUserProfile()
        .then((profile) => {
          this.$store.commit('SET_USER_PROFILE', profile);
        })
        .catch((err) => {
          log.info(err);
        });
      getNotifications()
        .then((notifications) => {
          this.$store.commit('SET_NOTIFICATIONS', notifications);
        })
        .catch((err) => {
          log.info(err);
        });
      getTrends()
        .then((trends) => {
          this.$store.commit('SET_TRENDS', trends);
        })
        .catch((err) => {
          log.info(err);
        });
      getUserStar()
        .then((userStar) => {
          this.$store.commit('SET_USER_STAR', userStar);
        })
        .catch((err) => {
          log.info(err);
        });
      getUserRate()
        .then((userRate) => {
          this.$store.commit('SET_USER_RATE', userRate);
        })
        .catch((err) => {
          log.info(err);
        });
      getFollowing()
        .then((following) => {
          this.$store.commit('SET_FOLLOWING', following);
        })
        .catch((err) => {
          log.info(err);
        });
      getFollower()
        .then((follower) => {
          this.$store.commit('SET_FOLLOWER', follower);
        })
        .catch((err) => {
          log.info(err);
        });
      getHistory()
        .then((history) => {
          this.$store.commit('SET_HISTORY', history);
        })
        .catch((err) => {
          log.info(err);
        });
    },
    login() {
      login(this.name, this.password)
        .then(() => {
          this.$message.success('登录成功');
          const { redirect } = this.$router.currentRoute.query;
          this.getProfile(); // 用户登录像后端请求profile的内容，并装入Vuex
          if (redirect) {
            this.$router.push(redirect);
          } else {
            this.$router.push('/timetable');
          }
        })
        .catch((e) => {
          log.info(e);
          this.$message.warn('登录失败');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.content-box {
  height: 100%;
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  > .title {
    color: #333;
    font-size: 24px;
    padding: 4px 0 32px 0;
  }

  > .input-box {
    .v-input {
      width: 80vw;
      max-width: 340px;
    }
  }

  > .button-box {
    width: 80vw;
    max-width: 340px;

    > .v-btn {
      margin-top: 16px;

      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>


