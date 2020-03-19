<template>
  <v-card cols="12" md="6" class="d-flex flex-column">
    <v-card-title>
      <slot></slot>
    </v-card-title>
    <v-col v-if="mode === 'discussion'">
      <v-text-field v-model="title" label="标题" clearable></v-text-field>
    </v-col>
    <v-col>
      <v-textarea
        label="内容"
        :clearable="true"
        v-model="content"
        :hint="mode === 'discussion' ? '支持 markdown 语法' : ''"
      ></v-textarea>
    </v-col>
    <v-col>
      <v-btn @click="cancel">取消</v-btn>
      <v-btn @click="create">添加</v-btn>
    </v-col>
  </v-card>
</template>

<script>
import log from '../utils/log';
export default {
  props: {
    mode: String, // 'secret' | 'dicussion' | 'rate' | 'reply',
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
      const input = {
        content: this.content,
        title: this.title,
        created_at: '' + new Date(),
        mode: this.mode,
      };
      this.content = '';
      this.title = '';
      log.info('Editor input:', input);
      this.$emit('done', input);
      this.$emit('close');
    },
  },
};
</script>

<style></style>
