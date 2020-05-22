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
        <v-avatar size="150" @click="clickAvatar">
          <img :src="processAvatar(avatar)" alt="avatar">
        </v-avatar>
        <v-file-input
          v-show="false"
          id="input"
          v-model="newAvatar"
          accept="image/png, image/jpeg, image/bmp"
          @change="changeAvatar"
        />
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
    <v-row justify="center">
      <div class="my-2">
        <v-btn large color="primary" @click="changeProfile">
          保存更改
        </v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { editProfile, uploadAvatar } from '../../services/profile.service';
import defaultAvatar from '../../assets/default_avatar.png';
import log from '../../utils/log';

export default {
  data: () => ({
    avatar: '',
    nickName: '',
    bio: '',
    newAvatar: [],
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
    changeProfile() {
      const UpdateUserDto = { nickName: this.nickName, bio: this.bio };
      editProfile(UpdateUserDto)
        .then((resp) => {
          this.$store.commit('SET_USER_PROFILE', resp);
          this.$message.success('更新完成');
        })
        .catch((err) => {
          log.info(err);
          this.$message.error('发生了错误');
        });
    },
    clickAvatar() {
      this.$el.querySelector('#input').click();
    },
    changeAvatar() {
      const reader = new FileReader();
      reader.onload = (data) => {
        const res = data.target || data.srcElement;
        this.avatar = res.result;
      };
      reader.readAsDataURL(this.newAvatar);
      const dto = new FormData();
      dto.append('file', this.newAvatar);
      uploadAvatar(dto)
        .then((resp) => {
          this.$store.commit('SET_USER_PROFILE', resp);
          this.$message.success('更新头像成功');
        })
        .catch((err) => {
          log.info(err);
          this.$message.error('请选择一张不超过200K的图片');
          this.avatar = this.$store.state.user.avatar;
        });
    },
    processAvatar(originAvatar) {
      // FIXME: 后端改掉对应默认图像路由后，这里只留下那一个路由的匹配串
      if (originAvatar.includes('/default_avatar.png') || originAvatar.includes('/default.png')) {
        return defaultAvatar;
      }
      return originAvatar;
    },
  },
};
</script>
