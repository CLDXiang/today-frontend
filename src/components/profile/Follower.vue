<template>
  <v-container>
    <v-row justify="center">
      <v-col md="10" lg="8">
        <v-card class="mx-auto" outlined>
          <v-list>
            <v-subheader>
              <strong>
                <font size="3">
                  粉丝
                </font>
              </strong>
            </v-subheader>
            <div v-for="user in follower" :key="user.id">
              <v-divider />
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title v-text="user.name" />
                  <v-list-item-subtitle v-text="'Bio: ' + user.bio" />
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getFollower } from '../../services/post.service';
import log from '../../utils/log';

export default {
  props: { id: String },
  data() {
    return {
<<<<<<< HEAD
      follower: [],
=======
      follower: [
        {
          id: 1,
          name: '张三',
          bio:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          icon: '', // TODO
        },
        {
          id: 2,
          name: '小脑虎',
          bio:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          icon: '',
        },
      ],
>>>>>>> resolve #79
    };
  },
  mounted() {
    getFollower()
      .then((follower) => {
        this.follower = follower;
        log.info(follower);
      })
      .catch((err) => {
        log.info(err);
      });
  },
};
</script>

<style></style>
