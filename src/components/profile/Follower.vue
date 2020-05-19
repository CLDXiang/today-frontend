<template>
  <v-list two-line>
    <template v-for="(item, index) in profile.follower">
      <v-list-item :key="item.nickName" :to="`/user/${item.id}`">
        <v-list-item-avatar>
          <v-img :src="item.avatar" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.name" />
          <v-list-item-subtitle v-text="item.bio" />
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
