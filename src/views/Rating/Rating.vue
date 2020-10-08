<template>
  <div class="content-box">
    <rating-head-bar @search-lecture="handleSearch" />
    <f-tabs
      v-model="activeTab"
      size="small"
      :pages="pages"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RatingHeadBar from './components/RatingHeadBar';

export default defineComponent({
  components: {
    RatingHeadBar,
  },
  data() {
    return {
      pages: {
        最新: '最新',
        通识: '通识',
        思政: '思政',
        外语: '外语',
        体育: '体育',
      },
      activeTab: '最新',
    };
  },
  methods: {
    handleSearch(query: string) {
      // TODO: 跳转至搜索页，搜索页 mounted 时根据 query 拉搜索 API
      return query;
    },
  },
});
</script>

<style lang="scss" scoped>
.content-box {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: #444;
  font-size: 14px;

  padding-top: 4px;

  margin: 0 auto;

  max-width: 2560px;

  > .center-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > div:last-child {
      color: #aaa;
      font-size: 12px;
    }
  }
  > .bottom-content {
    justify-self: flex-end;
    padding-bottom: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;

    > .hide-img {
      width: 100px;
      height: 100px;
      background-color: #e3f1f3;
      border-radius: 6px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    > img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
