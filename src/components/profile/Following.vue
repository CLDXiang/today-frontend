<template>
  <v-container>
    <v-row justify="center">
      <v-col md="10" lg="8">
        <v-card class="mx-auto" outlined>
          <v-list>
            <v-subheader>
              <strong>
                <font size="3">
                  我关注的人
                </font>
              </strong>
            </v-subheader>
            <div v-for="user in following" :key="user.id">
              <v-divider />
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title v-text="user.name" />
                  <v-list-item-subtitle v-text="'Bio: ' + user.bio" />
                  <v-list-item-subtitle v-show="user.icon" />
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
import { getFollowing } from '../../services/post.service';
import log from '../../utils/log';

export default {
  props: { id: String },
  data() {
    return {
      following: [],
    };
  },
  mounted() {
    getFollowing()
      .then((following) => {
        this.following = following;
        log.info(following);
      })
      .catch((err) => {
        log.info(err);
      });
  },
};
</script>

<style></style>
