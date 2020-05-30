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
            <v-list-item :key="user.element.id" :to="`/user/${user.profile.id}`">
              <v-list-item-avatar>
                <v-img :src="processAvatar(user.profile.avatar)" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="user.profile.nickName||'Anonymous'" />
                <v-list-item-subtitle v-text="user.profile.bio||'这个人还没有个性签名哦'" />
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
        <!-- <v-list three-line>
          <template v-for="(rate, index) in rates">
            <v-list-item
              :key="rate.lectureId"
              :to="`/lecture/${rate.code}/${rate.idx}`"
            >
              <v-list-item-content>
                <v-list-item-title
                  v-text="`${rate.name} · ${rate.teacher}`"
                />
                <v-list-item-subtitle v-text="rate.content" />
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="rate.time" />
              </v-list-item-action>
            </v-list-item>
            <v-divider v-if="index + 1 < rates.length" :key="`divider-${index}`" />
          </template>
        </v-list> -->
      </v-card>
    </v-tab-item>
    <v-tab href="#tab-3">
      新增评课 {{ Object.keys(newRates).length }}
    </v-tab>
    <v-tab-item value="tab-3">
      <v-card flat tile>
        <v-list two-line>
          <template v-for="(rate, index) in newRates">
            <v-list-item :key="rate.element.id" :to="`/lecture/${rate.lectureInfo.code}/${rate.lectureInfo.idx}`">
              <v-list-item-avatar>
                <v-img :src="processAvatar(rate.profile.avatar)" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="`${rate.lectureInfo.name} · ${rate.lectureInfo.teacher}`" />
                <v-list-item-subtitle v-text="rate.element.content" />
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
import { getUserProfile, getNotifications, getTrends } from '../../services/profile.service';
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
          const profile = this.getHisProfile(element.from_user_id);
          newFollowers.push({ profile, element, time });
        }
      });
      console.log('newFollowers', newFollowers);
      return newFollowers;
    },
    newReplies() {
      const newReplies = [];
      this.profile.notifications.forEach((element) => {
        if (element.type === 'reply') {
          if (this.id2lecture[`${element.notice_about_id}`]) {
            const time = renderTime(element.created_at);
            const lectureInfo = this.id2lecture[`${element.notice_about_id}`];
            let profile = [];
            this.getHisProfile(element.from_user_id).then((data) => {
              profile = data;
            });
            // this.getHisProfile(element.from_user_id).then((data) => {
            //   profile = data;
            // });
            newReplies.push({
              profile,
              lectureInfo,
              element,
              time,
            });
          }
        }
      });
      console.log('newReplies', newReplies);
      return newReplies;
    },
    newRates() {
      const newRates = [];
      this.profile.trends.forEach((element) => {
        if (element.type === 'rates') {
          if (this.id2lecture[`${element.notice_about_id}`]) {
            const time = renderTime(element.created_at);
            const lectureInfo = this.id2lecture[`${element.notice_about_id}`];
            const profile = this.getHisProfile(element.from_user_id);
            newRates.push({
              profile,
              lectureInfo,
              element,
              time,
            });
          }
        }
      });
      console.log('newRates', newRates);
      return newRates;
    },
  },
  created() {
    this.$store.commit('SET_BAR_TITLE', '通知动态');
    initLecture();
    this.fetchData();
  },
  methods: {
    async getHisProfile(userId) {
      let profile = [];
      await getUserProfile(userId)
        .then((data) => {
          console.log(data);
          profile = data;
        })
        .catch((err) => {
          log.info(err);
        });
      return profile;
    },

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
