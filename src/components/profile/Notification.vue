<template>
  <v-tabs center-active grow show-arrows>
    <v-tabs-slider />
    <v-tab href="#tab-1">
      新增关注 {{ Object.keys(newFollowers).length }}
    </v-tab>
    <v-tab-item value="tab-1">
      <v-card flat tile>
        <v-list two-line>
          <template v-for="(user, index) in newFollowers">
            <v-list-item :key="user.id" :to="`/user/${user.userProfile.id}`">
              <v-list-item-avatar>
                <v-img :src="processAvatar(user.userProfile.avatar)" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="user.userProfile.nickName||'Anonymous'" />
                <v-list-item-subtitle v-text="user.userProfile.bio||'这个人还没有个性签名哦'" />
              </v-list-item-content>
              <v-list-item-action-text v-text="user.time" />
            </v-list-item>
            <v-divider v-if="index + 1 < newFollowers.length" :key="`divider-${index}`" />
          </template>
        </v-list>
      </v-card>
    </v-tab-item>
    <v-tab href="#tab-2">
      新增回复 {{ Object.keys(newReplies).length }}
    </v-tab>
    <v-tab-item value="tab-2">
      <v-card flat tile>
        <v-list two-line>
          <template v-for="(reply, index) in newReplies">
            <v-list-item :key="reply.id" :to="`/lecture/${reply.lectureInfo.code}/${reply.lectureInfo.idx}`">
              <v-list-item-avatar>
                <v-img :src="processAvatar(reply.userProfile.avatar)" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="reply.userProfile.nickName||'Anonymous'" />
                <v-list-item-subtitle v-text="`回复了您对《${reply.lectureInfo.name}》的评价`" />
              </v-list-item-content>
              <v-list-item-action-text v-text="reply.time" />
            </v-list-item>
            <v-divider v-if="index + 1 < newFollowers.length" :key="`divider-${index}`" />
          </template>
        </v-list>
      </v-card>
    </v-tab-item>
    <v-tab href="#tab-3">
      新增评课 {{ Object.keys(newRates).length }}
    </v-tab>
    <v-tab-item value="tab-3">
      <v-card flat tile>
        <v-list two-line>
          <template v-for="(rate, index) in newRates">
            <v-list-item :key="rate.id" :to="`/lecture/${rate.lectureInfo.code}/${rate.lectureInfo.idx}`">
              <v-list-item-avatar>
                <v-img :src="processAvatar(rate.userProfile.avatar)" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="`${rate.userProfile.nickName} 最近评论了《${rate.lectureInfo.name}》`" />
                <v-list-item-subtitle v-text="rate.content" />
              </v-list-item-content>
              <v-list-item-action-text v-text="rate.time" />
            </v-list-item>
            <v-divider v-if="index + 1 < newRates.length" :key="`divider-${index}`" />
          </template>
        </v-list>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getNotifications, getTrends } from '../../services/profile.service';
import renderTime from '../../utils/time';
// import { processAvatar } from '../../utils/avatar';
import defaultAvatar from '../../assets/default_avatar.png';
import { initLecture } from '../../services/lecture';
import log from '../../utils/log';

export default {
  data: () => ({}),
  computed: {
    ...mapState(['profile']),
    ...mapGetters(['id2lecture']),

    newFollowers() {
      const newFollowers = [];
      this.profile.notifications.forEach((element) => {
        if (element.type === 'follow') {
          const time = renderTime(element.created_at);
          newFollowers.push({ ...element, time });
        }
      });
      return newFollowers;
    },
    newReplies() {
      const newReplies = [];
      this.profile.notifications.forEach((element) => {
        if (element.type === 'reply') {
          if (this.id2lecture[`${element.notice_about_id}`]) {
            const time = renderTime(element.created_at);
            const lectureInfo = this.id2lecture[`${element.notice_about_id}`];
            newReplies.push({
              lectureInfo,
              ...element,
              time,
            });
          }
        }
      });
      return newReplies;
    },
    newRates() {
      const newRates = [];
      this.profile.trends.forEach((element) => {
        if (element.type === 'rates') {
          if (this.id2lecture[`${element.notice_about_id}`]) {
            const time = renderTime(element.created_at);
            const lectureInfo = this.id2lecture[`${element.notice_about_id}`];
            newRates.push({
              lectureInfo,
              ...element,
              time,
            });
          }
        }
      });
      return newRates;
    },
  },
  created() {
    this.$store.commit('SET_BAR_TITLE', '通知动态');
    initLecture();
    this.fetchData();
  },
  methods: {
    fetchData() {
      getNotifications()
        .then((notifications) => {
          this.$store.commit('SET_NOTIFICATIONS', notifications);
        })
        .catch((err) => {
          log.info(err);
        });
      getTrends()
        .then((trends) => {
          this.$store.commit('SET_TRENDS', trends);
        })
        .catch((err) => {
          log.info(err);
        });
    },

    processAvatar(originAvatar) {
      if (originAvatar && originAvatar.includes('/default_avatar.png')) {
        return defaultAvatar;
      }
      return originAvatar;
    },
  },
};
</script>
