<template>
  <div class="content-box">
    <div class="title">
      注册
    </div>
    <div class="input-box">
      <v-text-field
        v-model="email"
        label="学邮"
        autofocus
        clearable
        outlined
        required
        hint="仅用于验证"
        suffix="@fudan.edu.cn"
        :rules="[(v) => !!v || '学邮不能为空', (v) => /^\d{11}$/.test(v) || '请输入11位学号']"
      />
      <div class="email-validate-box">
        <v-text-field
          v-model="code"
          label="验证码"
          outlined
          required
        />
        <v-btn
          color="primary"
          :disabled="cooldownCnt !== 0"
          :loading="state === 'requesting'"
          @click="requestCode"
        >
          {{ state === 'init' || state === 'requesting'? '发送验证码'
            : state === 'cooldown' ? `${cooldownCnt}s` : '重新发送' }}
        </v-btn>
      </div>
      <div>
        <v-text-field
          v-model="name"
          :rules="[
            (v) => !!v || '用户名不能为空',
            (v) => v.length <= 10 || '用户名不能长于 10 个字符',
            (v) => /^[0-9A-Za-z]+$/.test(v) || '用户名只由字母和数字组成'
          ]"
          :counter="10"
          label="用户名"
          outlined
          required
        />
      </div>
      <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text': 'password'"
        label="密码"
        clearable
        outlined
        required
        :rules="[
          (v) => !!v || '密码不能为空',
        ]"
        @click:append="showPassword = !showPassword"
      />
      <v-text-field
        v-model="confirmPassword"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text': 'password'"
        label="确认密码"
        clearable
        outlined
        required
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
        @click="register"
      >
        注册
      </v-btn>
    </div>
    <v-btn
      style="margin-top: 12px"
      text
      color="primary"
      to="/login"
    >
      已有账号？前往登录
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { register, requestCode } from '@/apis/auth';
import log from '@/utils/log';

export default {
  data: () => ({
    name: '',
    email: '',
    code: '',
    password: '',
    showPassword: false,
    confirmPassword: '',
    alertType: 'success',
    alertShown: false,
    alertContent: '',

    cooldownCnt: 0,
    state: 'init',
  }),
  computed: {
    ...mapGetters(['userLoggedIn']),
    realEmail() {
      return `${this.email}@fudan.edu.cn`;
    },
  },
  mounted() {
    // 若用户已登录，跳转至个人首页
    if (this.userLoggedIn) {
      this.$router.push('/me');
    }
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        this.$message.warn('两次输入密码不一致');
        return;
      }
      if (this.name === '') {
        this.$message.warn('名称不能为空哦');
        return;
      }
      if (!/^\d{11}@fudan\.edu\.cn$/.test(this.realEmail)) {
        this.$message.warn('请输入11位学号邮箱');
        return;
      }
      if (!/^\d{6}$/.test(this.code)) {
        this.$message.warn('请输入6位验证码');
        return;
      }
      if (this.password === '') {
        this.$message.warn('密码不能为空哦');
        return;
      }
      register(this.name, this.realEmail, this.code, this.password)
        .then((resp) => {
          if (resp.result === 'success') {
            this.$message.success('注册成功');
            setTimeout(() => {
              this.$router.push({ name: 'Login' });
            }, 500);
          } else if (resp.result === 'failed') {
            this.$message.warn('用户名已被注册');
          } else log.error('Error: Unexpected resp result');
        })
        .catch((e) => {
          const code = e.response.status;
          if (code === 400) this.$message.warn('姓名或邮箱格式错误');
          else if (code === 404) this.$message.error(e.response.data.message);
          else if (code === 409) this.$message.error(e.response.data.message);
          else log.error('Error: Unexpected reponse', e.response);
        });
    },
    requestCode() {
      if (this.state === 'init' || this.state === 'resend') {
        if (!/^\d{11}@fudan\.edu\.cn$/.test(this.realEmail)) {
          this.$message.error('请输入11位学号邮箱');
          return;
        }
        this.state = 'requesting';
        requestCode(this.realEmail)
          .then(() => {
            this.state = 'cooldown';
            const countdown = () => {
              this.cooldownCnt -= 1;
              if (this.cooldownCnt === 0) this.state = 'resend';
              else if (this.state === 'cooldown') setTimeout(countdown, 1000);
            };
            setTimeout(countdown(), 1000);
          })
          .catch((e) => {
            this.state = 'init';
            const code = e.response.status;
            if (code === 400) this.$message.error(e.response.data.message);
            else if (code === 409) this.$message.error('该邮箱已被注册');
            else log.error('Error: unexpected code');
          });
      } else if (this.state === 'cooldown' || this.state === 'requesting') {
        log.error('Warning: cooldown-ing or requesting');
      } else {
        log.error('Error: Unexpected state');
      }
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
    > .v-input {
      width: 80vw;
      max-width: 340px;
    }

    > .email-validate-box {
      display: flex;

      > .v-input {
        max-width: 226px;
        margin-right: 12px;
      }

      > .v-btn {
        margin-top: 10px;
        width: 92px;
      }
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
