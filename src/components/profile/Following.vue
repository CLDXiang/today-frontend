<template>
  <v-list two-line>
    <template v-for="(item, index) in profile.following">
      <v-list-item :key="item.id" :to="`/user/${item.id}`">
        <v-list-item-avatar>
          <v-img :src="item.avatar" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.nickName" />
          <v-list-item-subtitle v-text="item.bio" />
        </v-list-item-content>
      </v-list-item>
      <v-divider v-if="index + 1 < profile.following.length" :key="index" />
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
    this.$store.commit('SET_BAR_TITLE', '关注的人');
  },
};
</script>
