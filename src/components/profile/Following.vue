<template>
  <v-list two-line>
    <template v-for="(user, index) in profile.following">
      <v-list-item :key="user.id" :to="`/user/${user.id}`">
        <v-list-item-avatar>
          <v-img :src="processAvatar(user.avatar)" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="user.nickName||'Anonymous'" />
          <v-list-item-subtitle v-text="user.bio||'这个人还没有个性签名哦'" />
        </v-list-item-content>
      </v-list-item>
      <v-divider v-if="index + 1 < profile.following.length" :key="index" />
    </template>
  </v-list>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    processedAvatar: '../../assets/default_avatar.png',
  }),
  computed: {
    ...mapState(['profile']),
  },
  created() {
    this.$store.commit('SET_BAR_TITLE', '关注的人');
  },
  methods: {
    processAvatar(originAvatar) {
      if (originAvatar.substring(originAvatar.length - 18) === 'default_avatar.png') {
        // eslint-disable-next-line global-require
        return require('../../assets/default_avatar.png');
      }
      return originAvatar;
    },
  },
};
</script>
