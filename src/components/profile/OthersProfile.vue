<template>
  <div>
    <v-list-item three-line>
      <v-list-item-avatar size="80" color="grey">
        <img :src="processAvatar(userInfo.avatar)" alt="avatar">
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ userInfo.nickName||'Anonymous' }}
        </v-list-item-title>
        <v-list-item-subtitle>
          登录名：{{ userInfo.name }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          个性签名：{{ userInfo.bio||'这个人还没有个性签名哦' }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-row v-show="isMe === false" align="center" justify="end">
        <v-icon
          :color="isFollowing ? 'red' : 'gray'"
          class="mr-1"
          @click="followUnfollow"
        >
          mdi-heart
        </v-icon>
        <span class="subheading mr-2">{{ profile.countFollower }}</span>
      </v-row>
    </v-list-item>

    <v-tabs center-active grow show-arrows>
      <v-tabs-slider />
      <v-tab href="#tab-1">
        关注课程 {{ profile.countStar }}
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
        Ta的评课 {{ profile.countRate }}
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
        Ta的关注 {{ profile.countFollowing }}
      </v-tab>
      <v-tab-item value="tab-3">
        <v-card flat tile>
          <v-list two-line>
            <template v-for="(user, index) in profile.followings">
              <v-list-item :key="user.name" :to="`/user/${user.id}`">
                <v-list-item-avatar>
                  <v-img :src="processAvatar(user.avatar)" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="user.nickName||'Anonymous'" />
                  <v-list-item-subtitle v-text="user.bio||'这个人还没有个性签名哦'" />
                </v-list-item-content>
              </v-list-item>
              <v-divider v-if="index + 1 < profile.followings.length" :key="`divider-${index}`" />
            </template>
          </v-list>
        </v-card>
      </v-tab-item>
      <v-tab href="#tab-4">
        Ta的粉丝 {{ profile.countFollower }}
      </v-tab>
      <v-tab-item value="tab-4">
        <v-card flat tile>
          <v-list two-line>
            <template v-for="(user, index) in profile.followers">
              <v-list-item :key="user.name" :to="`/user/${user.id}`">
                <v-list-item-avatar>
                  <v-img :src="processAvatar(user.avatar)" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="user.nickName||'Anonymous'" />
                  <v-list-item-subtitle v-text="user.bio||'这个人还没有个性签名哦'" />
                </v-list-item-content>
              </v-list-item>
              <v-divider v-if="index + 1 < profile.followers.length" :key="`divider-${index}`" />
            </template>
          </v-list>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  getUserProfile,
  getUserStar,
  getUserRate,
  getFollower,
  getFollowing,
} from '../../services/profile.service';
import { postFollow, deleteFollow } from '../../services/rate';
import log from '../../utils/log';
import { initLecture } from '../../services/lecture';
import renderTime from '../../utils/time';
import defaultAvatar from '../../assets/default_avatar.png';

export default {
  data: () => ({
    isFollowing: '',
    id: '',
    userInfo: [],
    profile: {
      rawRates: [],
      rawStars: [],
      followers: [],
      followings: [],
      countFollowing: '',
      countFollower: '',
      countRate: '',
      countStar: '',
    },
  }),
  computed: {
    ...mapGetters(['id2lecture']),
    rates() {
      const rates = [];
      this.profile.rawRates.forEach((element) => {
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
      this.profile.rawStars.forEach((element) => {
        if (this.id2lecture[`${element.lecture_id}`]) {
          stars.push(this.id2lecture[`${element.lecture_id}`]);
        }
      });
      return stars;
    },
    isMe() {
      if (this.id.toString() === this.$store.state.user.id.toString()) {
        return true;
      }
      return false;
    },
  },
  watch: {
    $route() {
      if (this.$route.params.id !== undefined) {
        this.refresh();
      }
    },
  },
  created() {
    this.$store.commit('SET_BAR_TITLE', 'Ta的主页');
    initLecture();
    this.getParams();
    this.fetchData();
  },
  methods: {
    getParams() {
      this.id = this.$route.params.id;
    },
    getHisProfile() {
      getUserProfile(this.id)
        .then((profile) => {
          this.userInfo = profile;
          log.info(profile);
        })
        .catch((err) => {
          log.info(err);
        });
    },
    getHisStar() {
      getUserStar(this.id)
        .then((userStar) => {
          this.profile.rawStars = userStar;
          this.profile.countStar = Object.keys(userStar).length;
        })
        .catch((err) => {
          log.info(err);
        });
    },
    getHisRates() {
      getUserRate(this.id)
        .then((userRate) => {
          this.profile.rawRates = userRate;
          this.profile.countRate = Object.keys(userRate).length;
        })
        .catch((err) => {
          log.info(err);
        });
    },
    getHisFollower() {
      getFollower(this.id)
        .then((follower) => {
          this.profile.followers = follower;
          this.profile.countFollower = Object.keys(follower).length;
        })
        .catch((err) => {
          log.info(err);
        });
    },
    getHisFollowing() {
      getFollowing(this.id)
        .then((following) => {
          this.profile.followings = following;
          this.profile.countFollowing = Object.keys(following).length;
        })
        .catch((err) => {
          log.info(err);
        });
    },
    fetchData() {
      this.getHisProfile();
      this.getHisStar();
      this.getHisRates();
      this.getHisFollower();
      this.getHisFollowing();
      this.isFollowing = false;
      this.$store.state.profile.following.forEach((element) => {
        if (this.id === String(element.id)) {
          this.isFollowing = true;
        }
      });
    },
    updateData() {
      this.getHisFollower();
      getFollowing(this.$store.state.user.id)
        .then((myFollowing) => {
          this.$store.commit('SET_FOLLOWING', myFollowing);
          log.info('my follower', myFollowing);
        })
        .catch((err) => {
          log.info(err);
        });
      this.isFollowing = !this.isFollowing;
    },
    followUnfollow() {
      if (this.isFollowing) {
        deleteFollow(this.id)
          .then((resp) => {
            log.info(resp);
            this.updateData();
          })
          .catch((e) => log.info(e));
      } else {
        postFollow(this.id)
          .then((resp) => {
            log.info(resp);
            this.updateData();
          })
          .catch((e) => log.info(e));
      }
    },
    refresh() {
      this.profile.rawRates = [];
      this.profile.rawStars = [];
      this.profile.followers = [];
      this.profile.followings = [];
      this.getParams();
      this.fetchData();
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

<style></style>
