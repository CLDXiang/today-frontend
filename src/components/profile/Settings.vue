<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col 
        cols="12"
        sm="8"
        md="6"
        lg="4"
        class="text-center"
      >
        <v-avatar size="150" @click="uploadAvatar">
          <img :src="avatar" alt="avatar">
        </v-avatar>
        <input type="file" accept="image/*" class="hiddenInput" @change="handleAvatar">
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-text-field
          v-model="nickName"
          label="昵称"
          hint="整个bling的名字~"
          placeholder=""
          clearable
          outlined
          rounded
          counter="30"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-textarea
          v-model="bio"
          label="个性签名"
          hint="介绍一波自己"
          outlined
          rounded
          no-resize
          auto-grow
          counter="128"
        />
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="snackbarTimeout"
    >
      {{ snackbarText }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-row justify="center">
      <div class="my-2">
        <v-btn large color="primary" @click="changeProfile" @keyup.enter="changeProfile">
          保存更改
        </v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { editProfile, uploadAvatar } from '../../services/profile.service';
import log from '../../utils/log';

export default {
  data: () => ({
    avatar: '',
    nickName: '',
    bio: '',
    snackbar: '',
    snackbarColor: '',
    snackbarText: '',
    snackbarTimeout: 2000,
  }),
  created() {
    this.$store.commit('SET_BAR_TITLE', '用户设置');
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.avatar = this.$store.state.user.avatar;
      this.bio = this.$store.state.user.bio;
      this.nickName = this.$store.state.user.nickName;
    },
    showSnackbar(type, content) {
      this.snackbarColor = type;
      this.snackbarText = content;
      this.snackbar = true;
    },
    changeProfile() {
      const UpdateUserDto = { nickName: this.nickName, bio: this.bio };
      editProfile(UpdateUserDto)
        .then((resp) => {
          this.$store.commit('SET_USER_PROFILE', resp);
          this.showSnackbar('success', '更新完成');
        })
        .catch((err) => {
          log.info(err);
          this.showSnackbar('error', '发生了错误');
        });
    },
    uploadAvatar() {
      this.$el.querySelector('.hiddenInput').click();
    },
    // 将头像显示
    handleAvatar(e) {
      const $target = e.target || e.srcElement;
      const file = $target.files[0];
      const dto = new FormData();
      dto.append('file', file);
      const reader = new FileReader();
      reader.onload = (data) => {
        const res = data.target || data.srcElement;
        this.avatar = res.result;
      };
      reader.readAsDataURL(file);
      uploadAvatar(dto)
        .then((resp) => {
          this.$store.commit('SET_USER_PROFILE', resp);
          this.showSnackbar('success', '更换头像成功');
        })
        .catch((err) => {
          log.info(err);
          this.showSnackbar('error', '请选择一张不超过200K的图片');
          this.avatar = this.$store.state.user.avatar;
        });
    },
  },
};
</script>

<style>
.hiddenInput {
  display: none;
}
</style>