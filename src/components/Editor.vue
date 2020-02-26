<template>
  <v-card class="d-flex flex-column">
    <v-col v-if="mode === 'discussion'" cols="12" md="6">
      <v-text-field v-model="title" label="标题" clearable></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      <v-textarea name="input-7-1" label="内容" :clearable="true" v-model="content" hint="支持 markdown 语法"></v-textarea>
    </v-col>
    <v-col cols="12" md="6">
      <v-btn @click="cancel">取消</v-btn>
      <v-btn @click="create">添加</v-btn>
    </v-col>
  </v-card>
</template>

<script>
import log from '../utils/log';
export default {
  props: {
    mode: String, // 'secret' | 'dicussion' | 'rate',
  },
  data() {
    return {
      content: '',
      title: '',
    };
  },
  methods: {
    cancel() {
      this.$emit('close');
    },
    create() {
      const post = { content: this.content, title: this.title };
      this.content = '';
      this.title = '';
      log.info(post, this);
      this.$emit('created', post);
      this.$emit('close');
    },
  },
};
</script>

<style>
</style>