<template>
  <v-list two-line>
    <template v-for="(user, index) in profile.follower">
      <v-list-item :key="user.id" :to="`/user/${user.id}`">
        <v-list-item-avatar>
          <v-img :src="user.avatar" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="user.nickName||'Anonymous'" />
          <v-list-item-subtitle v-text="user.bio||'这个人还没有个性签名哦'" />
        </v-list-item-content>
      </v-list-item>
      <v-divider v-if="index + 1 < profile.follower.length" :key="index" />
    </template>
  </v-list>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({}),
  computed: {
    ...mapState(['profile']),
  },
  created() {
    this.$store.commit('SET_BAR_TITLE', '我的粉丝');
  },
};
</script>
