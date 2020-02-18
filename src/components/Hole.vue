<template>
  <v-container>
    <v-card class="d-flex pa-2 flex-column">
      <h1>树洞</h1>
      <v-card class="mx-auto" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">OVERLINE</div>
            <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn>点赞</v-btn>
          <v-btn>关注</v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="d-flex flex-column">
        <v-col cols="12" md="6">
          <v-textarea
            name="input-7-1"
            label="Default style"
            :clearable="true"
            :value="inputContent"
            hint="Hint text"
          ></v-textarea>
        </v-col>
        <v-btn @click="create">添加</v-btn>

        <!-- <v-dialog v-model="write">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>发布</v-card-title>

            <v-textarea></v-textarea>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="write = false">I accept</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>-->
        <!-- <v-speed-dial
          v-model="fab"
          bottom="true"
          right="true"
          direction="top"
          open-on-hover="false"
          transition="slide-y-reverse-transition"
        >
          <template v-slot:activator>
            <v-btn v-model="fab" color="blue darken-2" dark fab>
              <v-icon v-if="fab">mdi-close</v-icon>
              <v-icon v-else>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-btn fab dark small color="green">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn fab dark small color="indigo">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn fab dark small color="red">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-speed-dial>-->
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import { getDiscussion, createDiscussion } from '../services/post.service.js';
import log from '../utils/log.js';
export default {
  data() {
    return {
      posts: [],
      fab: false,
      fling: false,
      write: false,
      inputContent: '请输入',
    };
  },
  mounted() {
    this.posts = getDiscussion();
    log.info(this.posts);
  },
  methods: {
    create() {
      this.write = true;
      log.info('输入内容', this.inputContent);
      createDiscussion(this.inputContent);
    },
  },
  computed: {
    activeFab() {
      switch (this.tabs) {
        case 'one':
          return { class: 'purple', icon: 'account_circle' };
        case 'two':
          return { class: 'red', icon: 'edit' };
        case 'three':
          return { class: 'green', icon: 'keyboard_arrow_up' };
        default:
          return {};
      }
    },
  },
};
</script>

<style>
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>