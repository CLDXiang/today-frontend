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
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-file-input
          id="input"
          v-model="newAvatar"
          :rules="avatarRules"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon=""
          prepend-inner-icon="mdi-camera"
          label="头像"
          show-size
          clearable
          outlined
          rounded
          @change="showAvatar"
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
          :rules="nickNameRules"
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
          :rules="bioRules"
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
import { mapState } from 'vuex';
import { editProfile, uploadAvatar } from '../../services/profile.service';
import defaultAvatar from '../../assets/default_avatar.png';
import log from '../../utils/log';

export default {
  data: () => ({
    avatar: '',
    bio: '',
    nickName: '',
    newAvatar: [],
    avatarRules: [(value) => !value || value.size < 200000 || '请使用不超过 200KB 的图片'],
    nickNameRules: [(value) => !value || value.length <= 30 || '请确保昵称不超过30字'],
    bioRules: [(value) => !value || value.length <= 128 || '请确保个性签名不超过128字'],
  }),
  computed: {
    ...mapState(['user']),
  },
  created() {
    this.$store.commit('SET_BAR_TITLE', '用户设置');
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.avatar = this.user.avatar;
      this.bio = this.user.bio;
      this.nickName = this.user.nickName;
    },
    clickAvatar() {
      this.$el.querySelector('#input').click();
    },
    showAvatar() {
      if (this.newAvatar === undefined) {
        this.avatar = this.user.avatar;
      } else {
        const reader = new FileReader();
        reader.onload = (data) => {
          const res = data.target || data.srcElement;
          this.avatar = res.result;
        };
        reader.readAsDataURL(this.newAvatar);
      }
    },
    changeProfile() {
      let result = true;
      if (this.bio !== this.user.bio || this.nickName !== this.user.nickName) {
        const UpdateUserDto = { nickName: this.nickName, bio: this.bio };
        editProfile(UpdateUserDto)
          .then((resp) => {
            this.$store.commit('SET_USER_PROFILE', resp);
          })
          .catch((err) => {
            log.info(err);
            result = false;
            // this.$message.error('发生了错误');
          });
      }
      if (this.avatar !== this.user.avatar) {
        const avatarDto = new FormData();
        avatarDto.append('file', this.newAvatar);
        uploadAvatar(avatarDto)
          .then((resp) => {
            this.$store.commit('SET_USER_PROFILE', resp);
          })
          .catch((err) => {
            log.info(err);
            result = false;
            // this.$message.error('请选择一张不超过200K的图片');
          });
      }
      if (result) {
        this.$message.success('信息已更新，跳转个人主页……');
        setTimeout(() => {
          this.$router.push({ name: 'UserProfile' });
        }, 1000);
      } else {
        this.$message.error('更新失败');
      }
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
