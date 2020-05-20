<template>
  <div>
    <v-list-item three-line>
      <v-list-item-avatar size="80" color="grey">
        <img :src="userInfo.avatar" alt="avatar">
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ userInfo.nickName }}
        </v-list-item-title>
        <v-list-item-subtitle>
          登录名：{{ userInfo.name }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          个性签名：{{ userInfo.bio }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-row align="center" justify="end">
        <v-icon
          class="mr-1"
          :color="isFollowing ? 'red' : 'gray'"
          @click="followUnfollow"
        >
          mdi-heart
        </v-icon>
        <span class="subheading mr-2">{{ profile.countFollower }}</span>
      </v-row>
    </v-list-item>
    <v-tabs centered grow>
      <v-tabs-slider />

      <v-tab href="#tab-1">
        关注课程 {{ profile.countStar }}
      </v-tab>
      <v-tab-item value="tab-1">
        <!-- <v-card flat tile> -->
        <v-list two-line>
          <div v-for="(item, index) in profile.star" :key="item.id">
            <v-list-item :to="`/lecture/${item.code}/${item.idx}`">
              <v-list-item-content>
                <v-list-item-title v-text="item.code+'.'+item.idx+' '+item.name" />
                <v-list-item-subtitle v-text="item.teacher" />
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="index + 1 < profile.star.length" :key="index" />
          </div>
        </v-list>
        <!-- </v-card> -->
      </v-tab-item>
      <v-tab href="#tab-2">
        发表评课 {{ profile.countRate }}
      </v-tab>
      <v-tab-item value="tab-2">
        <v-card flat tile>
          <v-list three-line>
            <template v-for="(item, index) in profile.rate">
              <!-- TODO: 路由的目标不对 -->
              <v-list-item
                :key="item.lectureId"
                :to="`/lecture/${item.code}/${item.idx}`"
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.name + ' · ' + item.teacher"
                  />
                  <v-list-item-subtitle v-text="item.content" />
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text v-text="item.time" />
                </v-list-item-action>
              </v-list-item>
              <v-divider v-if="index + 1 < profile.rate.length" :key="index" />
            </template>
          </v-list>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import {
  getUserProfile,
  getUserStar,
  getUserRate,
  getFollower,
  getFollowing,
} from '../../services/profile.service';
import { postFollow, deleteFollow } from '../../services/rate';
import log from '../../utils/log';
import getLectureById from '../../utils/lecture';
import renderTime from '../../utils/time';

export default {
  data: () => ({
    isFollowing: '',
    id: '',
    userInfo: [],
    profile: {
      rate: [],
      star: [],
      countFollower: '',
      countRate: '',
      countStar: '',
    },
  }),
  created() {
    this.getParams();
    this.fetchData();
  },
  methods: {
    getParams() {
      this.id = this.$route.params.id;
    },
    fetchData() {
      getUserProfile(this.id)
        .then((profile) => {
          this.userInfo = profile;
          log.info(profile);
        })
        .catch((err) => {
          log.info(err);
        });
      getUserStar(this.id)
        .then((userStar) => {
          userStar.forEach((element) => {
            this.profile.star.push(getLectureById(element.lecture_id));
          });
          this.profile.countStar = Object.keys(userStar).length;
          log.info(userStar);
        })
        .catch((err) => {
          log.info(err);
        });
      getUserRate(this.id)
        .then((userRate) => {
          userRate.forEach((element) => {
            const time = { time: renderTime(element.createdAt) };
            this.profile.rate.push({
              ...getLectureById(element.lectureId),
              ...element,
              ...time,
            });
          });
          this.profile.countRate = Object.keys(userRate).length;
          log.info(userRate);
        })
        .catch((err) => {
          log.info(err);
        });
      getFollower(this.id)
        .then((follower) => {
          this.profile.countFollower = Object.keys(follower).length;
          log.info(follower);
        })
        .catch((err) => {
          log.info(err);
        });

      this.isFollowing = false;
      this.$store.state.profile.following.forEach((element) => {
        if (this.id === String(element.id)) {
          this.isFollowing = true;
        }
      });
    },
    updateData() {
      getFollower(this.id)
        .then((follower) => {
          this.profile.countFollower = Object.keys(follower).length;
          log.info('his follower', follower);
        })
        .catch((err) => {
          log.info(err);
        });
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
  },
};
</script>

<style></style>
