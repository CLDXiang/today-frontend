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
      follower: [],
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
