<template>
  <v-list two-line>
    <template v-for="(item, index) in items">
      <v-list-item :key="item.nickName" :to="`/user/${item.id}`">
        <v-list-item-avatar>
          <v-img :src="item.avatar" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.name" />
          <v-list-item-subtitle v-text="item.bio" />
        </v-list-item-content>
      </v-list-item>
      <v-divider v-if="index + 1 < items.length" :key="index" />
    </template>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    items: [],
  }),
  created() {
    this.$store.commit('SET_BAR_TITLE', '我的粉丝');
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store.state.profile.follower.forEach((element) => {
        this.items.push(element);
      });
    },
  },
};
</script>
