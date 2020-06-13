<template>
  <div class="register-container">
    <div class="mark">
      <h2>欢迎加入Today!</h2>
      <div>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          :counter="10"
          label="昵称"
          required
        />
      </div>
      <div class="email-bar">
        <v-text-field
          v-if="state === 'init'"
          v-model="email"
          :rules="emailRules"
          label="邮箱"
          required
        />
        <v-text-field
          v-else
          v-model="code"
          label="验证码"
          required
        />

        <v-divider class="email-divider" vertical />
        <v-btn
          class="email-btn"
          color="primary"
          depressed
          :disabled="cooldownCnt !== 0"
          :loading="state === 'requesting'"
          @click="requestCode"
        >
          {{ state === 'init' || state === 'requesting'? '获取验证码'
            : state === 'cooldown' ? `${cooldownCnt}s` : '重新发送' }}
        </v-btn>
      </div>
      <div>
        <v-text-field
          v-model="password"
          label="密码"
          :rules="passwordRules"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordShow ? 'text' : 'password'"
          required
          @click:append="passwordShow = !passwordShow"
        />
      </div>
      <div>
        <v-btn color="primary" @click="register">
          注册
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { register, requestCode } from '../../services/auth.service';
import log from '../../utils/log';

export default {
  data: () => ({
    name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    code: '',
    password: '',
    passwordShow: false,
    passwordRules: [(v) => !!v || 'password is required'],
    alertType: 'success',
    alertShown: false,
    alertContent: '',

    cooldownCnt: 0,
    state: 'init',
  }),
  methods: {
    register() {
      register(this.name, this.email, this.code, this.password).then((resp) => {
        if (resp.data.result === 'success') {
          this.$message.success('注册成功，跳转登录页面……');
          setTimeout(() => {
            this.$router.push('login');
          }, 1000);
        }
        if (resp.data.result === 'failed') {
          this.result = 'already_exist';
          this.$message.warn('注册失败，该邮箱已经被使用，请直接登录或者更改注册邮箱');
        }
      });
    },
    requestCode() {
      if (this.state === 'init') {
        this.state = 'requesting';

        requestCode(this.name, this.email)
          .then(() => {
            this.state = 'cooldown';
            const vm = this;
            vm.cooldownCnt = 5; // FIXME
            setTimeout(function countdown() {
              vm.cooldownCnt -= 1;
              if (vm.cooldownCnt === 0) vm.state = 'resend';
              else if (vm.state === 'cooldown') setTimeout(countdown, 1000);
            }, 1000);
          })
          .catch((e) => {
            this.state = 'init';
            const code = e.response.status;
            if (code === 400) this.$message.error('用户名或邮箱格式错误');
            else if (code === 409) this.$message.error('该邮箱已被注册');
          });
      } else if (this.state === 'cooldown' || this.state === 'requesting') {
        log.info('cooldown-ing or requesting');
      } else if (this.state === 'resend') {
        this.state = 'init';
      } else {
        log.info('Unexpected state');
      }
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

.email-bar {
  display: flex;
  align-items: center;
  > .email-divider {
    margin: 1em 1em;
  }
}
</style>
