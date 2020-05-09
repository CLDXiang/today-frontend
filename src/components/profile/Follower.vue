<template>
  <v-list three-line>
    <template v-for="(item, index) in items">
      <!-- TODO: add @click="" -->
      <v-list-item :key="item.name">
        <v-list-item-avatar>
          <v-img :src="item.userIcon" />
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
import store from '../../store';

export default {
  data: () => ({
    items: [],
  }),
  created() {
    store.commit('SET_BAR_TITLE', '我的粉丝');
    this.fetchData();
  },
  methods: {
    fetchData() {
      const userIcon = {
        // 临时统一头像
        userIcon: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      };
      const bio = {
        // 临时统一个性签名
        bio:
          '太阳光金亮亮，雄鸡唱三唱，花儿醒来了，鸟儿忙梳妆，小喜鹊造新房，小蜜蜂采蜜糖，幸福的生活从哪里来，要靠劳动来创造',
      };

      this.$store.state.profile.follower.forEach((element) => {
        this.items.push(Object.assign(element, userIcon, bio));
      });
    },
  },
};
</script>
