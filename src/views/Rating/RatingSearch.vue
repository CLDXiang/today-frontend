<template>
  <div class="content-box">
    <rating-head-bar is-back-visible />
    <div class="title">
      “{{ q }}”的搜索结果
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { rpcClient } from '@/apis';
import { CardLectureItem } from '@/components/listCard';
import { RatingHeadBar } from './components';

export default defineComponent({
  components: {
    RatingHeadBar,
  },
  props: {
    /** 传入的搜索字串 */
    q: { type: String, required: true },
  },
  data() {
    return {
      /** 搜索结果列表 */
      searchResults: [] as CardLectureItem[],
    };
  },
  watch: {
    q() {
      // q 改变时重新拉数据
      this.search();
    },
  },
  created() {
    // 首次进入该页面拉数据
    this.search();
  },
  methods: {
    /** 搜索并覆盖当前列表 */
    search() {
      if (this.q) {
        rpcClient.search({ q: this.q }).then((resp) => {
          this.searchResults = resp.data;
        });
      }
    },
    /** 搜索并将结果附加在当前列表后 */
    searchMore() {
      if (this.q) {
        rpcClient.search({ q: this.q }).then((resp) => {
          this.searchResults = [...this.searchResults, ...resp.data];
        });
      }
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

  > .title {
    align-self: flex-start;
    margin: 11px 0 0 10px;
    font-size: 16px;
    line-height: 22px;
    color: #828282;
  }
}
</style>
