<template>
  <v-list two-line>
    <template v-for="(item, index) in items">
      <!-- TODO: add @click="" -->
      <v-list-item :key="item.id">
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
    this.$store.commit('SET_BAR_TITLE', '关注的人');
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store.state.profile.following.forEach((element) => {
        this.items.push(element);
      });
    },
  },
};
</script>
