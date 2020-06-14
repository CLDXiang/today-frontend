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
          v-model="email"
          :rules="emailRules"
          label="邮箱"
          required
          suffix="@fudan.edu.cn"
        />
      </div>

      <div class="email-bar">
        <v-text-field
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
    nameRules: [(v) => !!v || '名称不能为空', (v) => v.length <= 10 || '名称过长'],
    email: '',
    emailRules: [(v) => !!v || '邮箱不能为空', (v) => /^\d{11}$/.test(v) || '请输入11位学号'],
    code: '',
    password: '',
    passwordShow: false,
    passwordRules: [(v) => !!v || '密码不能为空'],
    alertType: 'success',
    alertShown: false,
    alertContent: '',

    cooldownCnt: 0,
    state: 'init',
  }),
  computed: {
    realEmail() {
      return `${this.email}@fudan.edu.cn`;
    },
  },
  methods: {
    register() {
      register(this.name, this.realEmail, this.code, this.password)
        .then(() => {
          this.$message.success('注册成功');
          setTimeout(() => {
            this.$router.push('login');
          }, 500);
        })
        .catch((e) => {
          const code = e.response.status;
          if (code === 400) this.$message.warn('格式错误');
          else if (code === 409) {
            this.$message.error(e.response.data.message);
          }
        });
    },
    requestCode() {
      if (this.state === 'init' || this.state === 'resend') {
        const email = this.realEmail.trim();
        if (!/^\d{11}@fudan\.edu\.cn$/.test(email)) {
          this.$message.error('邮箱格式错误');
          return;
        }
        this.state = 'requesting';
        requestCode(email)
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
            if (code === 400) this.$message.error(e.response.data.message);
            else log.info('Warning: unexpected code');
          });
      } else if (this.state === 'cooldown' || this.state === 'requesting') {
        log.info('cooldown-ing or requesting');
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
