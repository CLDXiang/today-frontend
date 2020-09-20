<template>
  <div>
    <v-list-item three-line>
      <v-list-item-avatar size="80" color="grey">
        <img :src="processAvatar(user.avatar)" alt="avatar">
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ user.nickName||'Anonymous' }}
        </v-list-item-title>
        <v-list-item-subtitle> 登录名：{{ user.name }} </v-list-item-subtitle>
        <v-list-item-subtitle> 个性签名：{{ user.bio||'这个人还没有个性签名哦' }} </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-tabs center-active grow show-arrows>
      <v-tabs-slider />
      <v-tab href="#tab-1">
        关注课程 {{ countUserStar }}
      </v-tab>
      <v-tab-item value="tab-1">
        <v-card flat tile>
          <v-list two-line>
            <div v-for="(lecture, index) in stars" :key="lecture.id">
              <v-list-item :to="`/lecture/${lecture.code}/${lecture.idx}`">
                <v-list-item-content>
                  <v-list-item-title v-text="`${lecture.code}.${lecture.idx} ${lecture.name}`" />
                  <v-list-item-subtitle v-text="lecture.teacher" />
                </v-list-item-content>
              </v-list-item>
              <v-divider v-if="index + 1 < stars.length" :key="`divider-${index}`" />
            </div>
          </v-list>
        </v-card>
      </v-tab-item>
      <v-tab href="#tab-2">
        我的评课 {{ countUserRate }}
      </v-tab>
      <v-tab-item value="tab-2">
        <v-card flat tile>
          <v-list three-line>
            <template v-for="(rate, index) in rates">
              <!-- TODO: 路由的目标不对 -->
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
          </v-list>
        </v-card>
      </v-tab-item>
      <v-tab href="#tab-3">
        关注的人 {{ countFollowing }}
      </v-tab>
      <v-tab-item value="tab-3">
        <v-card flat tile>
          <v-list two-line>
            <template v-for="(user, index) in profile.following">
              <v-list-item :key="user.name" :to="`/user/${user.id}`">
                <v-list-item-avatar>
                  <v-img :src="processAvatar(user.avatar)" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="user.nickName||'Anonymous'" />
                  <v-list-item-subtitle v-text="user.bio||'这个人还没有个性签名哦'" />
                </v-list-item-content>
              </v-list-item>
              <v-divider v-if="index + 1 < profile.following.length" :key="`divider-${index}`" />
            </template>
          </v-list>
        </v-card>
      </v-tab-item>
      <v-tab href="#tab-4">
        我的粉丝 {{ countFollower }}
      </v-tab>
      <v-tab-item value="tab-4">
        <v-card flat tile>
          <v-list two-line>
            <template v-for="(user, index) in profile.follower">
              <v-list-item :key="user.name" :to="`/user/${user.id}`">
                <v-list-item-avatar>
                  <v-img :src="processAvatar(user.avatar)" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="user.nickName||'Anonymous'" />
                  <v-list-item-subtitle v-text="user.bio||'这个人还没有个性签名哦'" />
                </v-list-item-content>
              </v-list-item>
              <v-divider v-if="index + 1 < profile.follower.length" :key="`divider-${index}`" />
            </template>
          </v-list>
        </v-card>
      </v-tab-item>
      <v-tab href="#tab-5">
        浏览历史 {{ countHistory }}
      </v-tab>
      <v-tab-item value="tab-5">
        <v-card flat tile>
          <v-list two-line>
            <template v-for="(item, index) in histories">
              <v-list-item
                :key="item.lectureId"
                :to="`/lecture/${item.code}/${item.idx}`"
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="`${item.code}.${item.idx} ${item.name}`"
                  />
                  <v-list-item-subtitle v-text="item.teacher" />
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text v-text="item.time" />
                </v-list-item-action>
              </v-list-item>
              <v-divider v-if="index + 1 < histories.length" :key="`divider-${index}`" />
            </template>
          </v-list>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { initLecture } from '../../services/lecture';
import renderTime from '../../utils/time';
import defaultAvatar from '../../assets/default_avatar.jpg';

export default {
  data: () => ({}),
  computed: {
    ...mapState(['user', 'profile']),
    ...mapGetters([
      'countUserRate',
      'countUserStar',
      'countFollower',
      'countFollowing',
      'countHistory',
      'id2lecture',
    ]),
    rates() {
      const rates = [];
      this.profile.userRate.forEach((element) => {
        if (this.id2lecture[`${element.lectureId}`]) {
          const time = { time: renderTime(element.lastUpdate) };
          rates.push({
            ...this.id2lecture[`${element.lectureId}`],
            ...element,
            ...time,
          });
        }
      });
      return rates;
    },
    stars() {
      const stars = [];
      this.profile.userStar.forEach((element) => {
        if (this.id2lecture[`${element.lecture_id}`]) {
          stars.push(this.id2lecture[`${element.lecture_id}`]);
        }
      });
      return stars;
    },
    histories() {
      const histories = [];
      this.$store.state.profile.history.forEach((element) => {
        if (this.id2lecture[`${element.history_about_id}`]) {
          const time = { time: renderTime(element.created_at) };
          histories.push({
            ...this.id2lecture[`${element.history_about_id}`],
            ...time,
          });
        }
      });
      return histories;
    },
  },
  created() {
    this.$store.commit('SET_BAR_TITLE', '个人主页');
    initLecture();
  },
  methods: {
    processAvatar(originAvatar) {
      if (originAvatar && originAvatar.includes('/default_avatar.png')) {
        return defaultAvatar;
      }
      return originAvatar;
    },
  },
};
</script>

<style></style>
