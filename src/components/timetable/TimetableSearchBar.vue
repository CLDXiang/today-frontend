<template>
  <div class="timetable__search-bar" @mouseleave="isSearchResultsVisible = false">
    <input
      v-model="searchText"
      type="search"
      placeholder="输入课程名、教师名或课程号"
      autocomplete="off"
      @focus="isSearchResultsVisible = searchText !== ''"
      @mouseenter="isSearchResultsVisible = searchText !== ''"
    >
    <div v-show="isSearchResultsVisible" class="search-bar__results">
      <div
        v-for="(searchResult, index) in searchResults"
        :key="index"
        class="search-bar__result"
        @click="handleClickSearchResult(searchResult[1])"
      >
        {{ searchResult[0] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchIndex: Object,
  },
  data() {
    return {
      searchText: '',
      isSearchResultsVisible: false,
      /** 搜索结果
       * TODO: 后续可能还需要在 value 中加入一些状态：是否已选等
       */
      searchResults: [],
    };
  },
  watch: {
    searchText(newVal, oldVal) {
      const query = newVal.trim();
      if (!query || query === '') {
        this.isSearchResultsVisible = false;
        return;
      }

      // TODO: 加入防抖？
      const reg = new RegExp(query, 'i');

      // 如果本次输入字符串包含上一次输入字符串，则在已有搜索结果中再次过滤，不再遍历整个索引
      const queryOld = oldVal.trim();
      const regOld = new RegExp(oldVal.trim(), 'i');
      if (queryOld && queryOld !== '' && regOld.test(query)) {
        this.searchResults = this.searchResults.filter(
          // eslint-disable-next-line no-unused-vars
          ([index, _]) => reg.test(index),
        );
      } else {
        this.searchResults = Object.entries(this.searchIndex).filter(
          // eslint-disable-next-line no-unused-vars
          ([index, _]) => reg.test(index),
        );
      }

      this.isSearchResultsVisible = true;
    },
  },
  methods: {
    handleClickSearchResult(courseID) {
      this.$emit('addcourse', courseID);
    },
  },
};
</script>

<style lang="scss" scoped>
.timetable__search-bar {
  position: relative;

  flex: 1;
  display: flex;

  > input {
    height: 2.75rem;
    flex: 1;

    border: 1px solid #d3d6db;
    border-radius: 0.25rem;
    box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.1);
    padding: 0.375rem 0.75rem;

    font-size: 1rem;
    font-weight: 400;
    color: #69707a;
    line-height: 1.5;

    text-align: left;
    white-space: nowrap;

    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    outline: none;

    &:focus {
      border-color: lightcoral;
    }
  }
}

.search-bar__results {
  position: absolute;
  top: 2.75rem;
  width: 100%;

  max-height: 13.5rem;
  border: 1px solid #d3d6db;
  border-top: 0;
  border-radius: 0 0 0.25rem 0.25rem;

  overflow: auto;
}

.search-bar__result {
  box-sizing: border-box;
  cursor: pointer;

  padding: 0.6rem 0.5rem;
  font-size: 0.9rem;
  color: #69707a;

  &:hover,
  &.hover {
    background-color: #f3f5f8;
  }
}
</style>
