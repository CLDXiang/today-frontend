<template>
  <v-container>
    <Post :content="post.content" :id="post.id" :created_at="post.created_at">
      <v-btn @click="reply()">回复</v-btn>
    </Post>
    <v-card>
      <v-card v-for="reply in replies" :key="reply.created_at" class="my-1 my-1" flat>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle>{{ getName(reply.user_id) }} 于 {{ reply.created_at }}：</v-list-item-subtitle>
            <div>{{ reply.content }}</div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-card>
    <v-dialog v-model="editing">
      <Editor mode="discussion" @close="editing = false"></Editor>
    </v-dialog>
  </v-container>
</template>

<script>
import marked from 'marked';
import { ANONY_NAMES } from '../utils/config';
import Post from './Post.vue';
import Editor from './Editor.vue';
import log from '../utils/log.js';
export default {
  components: { Post, Editor },
  data() {
    return {
      editing: false,
      post: {
        id: 23,
        title: '这是一个帖子，有的时候没有标题',
        content: '但是内容是不可缺少的\n特别是我们还支持 **markdown**',
        created_at: '2020-02-26T07:44:31.365Z',
        user_id: 1,
        user_name: '小虎',
        user_avatar: 'logo.png',
        category: 'discussion',
      },
      replies: [
        {
          content: '回复通常只有内容，没有标题',
          created_at: '2020-02-26T07:45:31.365Z',
          user_id: 1,
        },
        {
          content: '多个回复也是可以的',
          created_at: '2020-02-26T07:46:31.365Z',
          user_id: 2,
        },
        {
          content: '多个回复也是可以的',
          created_at: '2020-02-26T07:47:31.365Z',
          user_id: 0,
        },
        {
          content: '多个回复也是可以的',
          created_at: '2020-02-26T07:48:31.365Z',
          user_id: 3,
        },
        {
          content: '回复通常只有内容，没有标题',
          created_at: '2020-02-26T07:49:31.365Z',
          user_id: 4,
        },
        {
          content: '多个回复也是可以的',
          created_at: '2020-02-26T07:50:31.365Z',
          user_id: 5,
        },
        {
          content: '多个回复也是可以的',
          created_at: '2020-02-26T07:26:31.365Z',
          user_id: 6,
        },
        {
          content: '多个回复也是可以的',
          created_at: '2020-02-26T07:16:31.365Z',
          user_id: 7,
        },
        {
          content: '回复通常只有内容，没有标题',
          created_at: '2020-02-26T17:45:31.365Z',
          user_id: 8,
        },
        {
          content: '多个回复也是可以的',
          created_at: '2020-02-26T27:46:31.365Z',
          user_id: 9,
        },
        {
          content: '多个回复也是可以的',
          created_at: '2020-02-26T37:46:31.365Z',
          user_id: 10,
        },
        {
          content: '多个回复也是可以的',
          created_at: '2020-02-26T47:46:31.365Z',
          user_id: 11,
        },
        {
          content: '回复通常只有内容，没有标题',
          created_at: '2020-02-26T57:45:31.365Z',
          user_id: 12,
        },
        {
          content: '多个回复也是可以的',
          created_at: '2020-02-26T67:46:31.365Z',
          user_id: 13,
        },
        {
          content: '多个回复也是可以的',
          created_at: '2020-02-26T77:46:31.365Z',
          user_id: 14,
        },
        {
          content: '多个回复也是可以的',
          created_at: '2020-02-26T97:46:31.365Z',
          user_id: 15,
        },
      ],
    };
  },
  methods: {
    render(content) {
      // see https://vuejs.org/v2/examples/ and https://marked.js.org/
      // we might want to try https://editorjs.io/ in the future
      return marked(content);
    },
    getName(id) {
      if (id < ANONY_NAMES.length) {
        return ANONY_NAMES[id];
      }
      return id;
    },
    reply() {
      log.info('reply!');
      this.editing = true;
    },
  },
};
</script>

<style>
</style>