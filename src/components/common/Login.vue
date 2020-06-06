<template>
  <div class="register-container">
    <div class="mark">
      <h2>欢迎回来！</h2>
      <div>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          :counter="10"
          label="昵称"
          required
        />
      </div>

      <div class="pwd-bar">
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text': 'password'"
          :rules="passwordRules"
          label="密码"
          required
          @click:append="showPassword = !showPassword"
        />
        <router-link class="forgot-link" to="/forgot-password">
          忘记密码？
        </router-link>
      </div>

      <div class="action-bar">
        <v-btn color="primary" @click="$router.push('/register')">
          注册
        </v-btn>
        <v-btn color="primary" @click="login">
          登录
        </v-btn>
      </div>
    </div>
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

export default {
  data: () => ({
    name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'password is required',
      //   (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    showPassword: false,
  }),
  created() {
    log.info(this.$router.currentRoute);
  },
  methods: {
    getProfile() {
      getUserProfile()
        .then((profile) => {
          this.$store.commit('SET_USER_PROFILE', profile);
          log.info(profile);
        })
        .catch((err) => {
          log.info(err);
        });
      getUserStar()
        .then((userStar) => {
          this.$store.commit('SET_USER_STAR', userStar);
          log.info(userStar);
        })
        .catch((err) => {
          log.info(err);
        });
      getUserRate()
        .then((userRate) => {
          this.$store.commit('SET_USER_RATE', userRate);
          log.info(userRate);
        })
        .catch((err) => {
          log.info(err);
        });
      getFollowing()
        .then((following) => {
          this.$store.commit('SET_FOLLOWING', following);
          log.info(following);
        })
        .catch((err) => {
          log.info(err);
        });
      getFollower()
        .then((follower) => {
          this.$store.commit('SET_FOLLOWER', follower);
          log.info(follower);
        })
        .catch((err) => {
          log.info(err);
        });
      getHistory()
        .then((history) => {
          this.$store.commit('SET_HISTORY', history);
          log.info(history);
        })
        .catch((err) => {
          log.info(err);
        });
    },
    login() {
      log.info(this.$router.url);
      login(this.name, this.password)
        .then((resp) => {
          log.info(resp);
          this.$message.success('登录成功');
          const { redirect } = this.$router.currentRoute.query;
          log.info('redirecting', redirect);
          this.getProfile(); // 用户登录像后端请求profile的内容，并装入Vuex
          if (redirect) {
            log.info('redirected!');
            this.$router.push(redirect);
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
@import '../../scss/utils.scss';
@import '../../scss/mark.scss';

.register-container {
  display: flex;
  justify-content: center;
  padding-top: 1rem;
}

.mark {
  display: flex;
  flex-direction: column;
  max-width: $main-width/2;
  width: 100%;
  @include mark;
}

.pwd-bar {
  display: flex;
  flex-direction: column;
  > .forgot-link {
    align-self: flex-end;
    text-decoration: none;
    color: rgba(0, 0, 0, $inactive-opacity);
  }
}

.action-bar {
  > * {
    margin-right: 1rem;
  }
}

.email-bar {
  display: flex;
  align-items: center;
  > .email-divider {
    margin: 1em 1em;
  }
}
</style>

