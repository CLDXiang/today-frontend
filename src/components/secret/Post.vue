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
      <v-btn>点赞</v-btn>
      <v-btn>关注</v-btn>
      <slot />
    </v-card-actions>
    <v-dialog
      v-model="editing"
      max-width="800px"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <Editor mode="secret" :defaultContent="content" @close="editing = false" @done="doneReEditing">
        重新编辑
      </Editor>
    </v-dialog>
  </v-card>
</template>

<script>
import marked from 'marked';
import moment from 'moment';
import log from '../../utils/log';
import Editor from './Editor.vue';

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
    };
  },
  methods: {
    render(content) {
      // see https://vuejs.org/v2/examples/ and https://marked.js.org/
      // we might want to try https://editorjs.io/ in the future
      return marked(content);
    },
    renderTime(time) {
      const formatted = moment(time)
        .locale('zh-CN')
        .fromNow();
      log.info(time, formatted);
      return formatted;
    },
    doneReEditing() {
      log.info('reEdit done');
    },
    deletePost() {
      log.info('delete');
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
