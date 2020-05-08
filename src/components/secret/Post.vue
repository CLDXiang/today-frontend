<template>
  <v-card outlined class="my-1 px-1">
    <v-list-item three-line>
      <v-list-item-content>
        <!-- <div class="overline mb-4">{{ post.user_id }}</div> -->
        <v-list-item-subtitle class="post-subtitle">
          <p>#{{ id }} 于 {{ renderTime(created_at) }}</p>
          <v-menu>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="editing = true">
                <v-list-item-title>
                  重新编辑
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="deletePost">
                <v-list-item-title>
                  删除
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item-subtitle>
        <v-list-item-title v-if="title !== ''" class="headline mb-1">
          {{ title }}
        </v-list-item-title>
        <div v-html="render(content)" />
      </v-list-item-content>

      <!-- <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar> -->
    </v-list-item>

    <v-card-actions class="d-flex justify-end">
      <!-- <v-btn>点赞</v-btn> -->
      <v-btn :disabled="currentPost.starred_by_me === 1" @click="star">
        {{ currentPost.num_starred }} 关注
      </v-btn>
      <slot />
    </v-card-actions>
    <v-dialog
      v-model="editing"
      max-width="800px"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <Editor
        mode="secret"
        :default-content="content"
        @close="editing = false"
        @done="doneReEditing"
      >
        重新编辑
      </Editor>
    </v-dialog>
  </v-card>
</template>

<script>
import marked from 'marked';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

import log from '../../utils/log';
import Editor from './Editor.vue';
import { starSecretPost } from '../../services/post.service';

dayjs.extend(relativeTime);

export default {
  components: {
    Editor,
  },
  props: {
    title: String,
    content: String,
    id: Number,
    created_at: String,
  },
  data() {
    return {
      editing: false,
      starred: false,
    };
  },
  computed: {
    currentPost() {
      return this.$store.state.secret.postsMapping[this.id];
    },
  },
  mounted() {
    if (this.alreadyStarred) {
      this.starred = true;
    }
  },
  methods: {
    star() {
      log.info(`star post ${this.id}`);
      if (!this.currentPost.starred_by_me) {
        starSecretPost(this.id)
          .then(() => {
            this.starred = true;
          })
          .catch((err) => {
            log.info(`error: star post ${this.id}`, err, err.message);
            if (err.response) {
              log.info('error: ', err.response.data);
            }
          });
      }
    },
    render(content) {
      // see https://vuejs.org/v2/examples/ and https://marked.js.org/
      // we might want to try https://editorjs.io/ in the future
      return marked(content);
    },
    renderTime(time) {
      const formatted = dayjs(time)
        .locale('zh-cn')
        .fromNow();
      return formatted;
    },
    doneReEditing() {
      log.info('reEdit done');
    },
    deletePost() {
      log.info('delete not implemented yet');
    },
  },
};
</script>

<style lang="scss" scoped>
.post-subtitle {
  display: flex;
  justify-content: space-between;
}
</style>
