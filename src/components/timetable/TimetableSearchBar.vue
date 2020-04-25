<template>
  <div class="timetable__search-bar" @mouseleave="isSearchResultsVisible = false">
    <v-text-field
      ref="textfield"
      v-model="searchText"
      label="搜索课程"
      hint="可通过课程名、课程号、教师名、院系、时间地点搜索"
      outlined
      dense
      :disabled="isLoadingSearchResults"
      :success-messages="searchBarStatus === 'success' ? `找到 ${searchResults.length} 门课程` : []"
      :error-messages="searchBarStatus === 'error' ? '没有找到符合条件的课程' : []"
      class="search-bar__text-field"
      @focus="isSearchResultsVisible = searchResults.length !== 0"
      @mouseenter="isSearchResultsVisible = searchResults.length !== 0"
      @keydown="handleKeyDown"
    >
      <template #append>
        <v-fab-transition>
          <v-btn
            v-show="searchText !== ''"
            color="blue"
            fab
            dark
            x-small
            absolute
            right
            :loading="isLoadingSearchResults"
            class="search-bar__search-button"
            @click="handleClickSearchButton"
          >
            <v-icon>search</v-icon>
          </v-btn>
        </v-fab-transition>
      </template>
    </v-text-field>
    
    <div v-show="isSearchResultsVisible" class="search-bar__results">
      <div
        v-for="item in searchResults"
        :key="item.courseID"
        class="search-bar__result"
        @click.stop="handleClickSearchResult(item.courseID)"
      >
        <div class="result-line">
          {{ `${item.codeID} ${item.name}` }}
        </div>
        <div class="result-line cut">
          {{ item.teachers }}
        </div>
        <div v-for="(ts, tsIndex) in item.timeSlots.slice(0, 3)" :key="tsIndex" class="result-line">
          {{ ts }}
        </div>
        <div v-if="item.timeSlots.length > 3" class="result-line">
          ……
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchIndex: Array,
  },
  data() {
    return {
      searchText: '',
      isSearchResultsVisible: false,
      /** 搜索结果
       * TODO: 后续可能还需要在 value 中加入一些状态：是否已选等
       */
      searchResults: [],
      isLoadingSearchResults: false,
      searchBarStatus: 'normal',

      isMessageVisible: false,
      messageColor: 'info',
      messageText: '',
      messageTimeout: 1500,
    };
  },
  // computed: {
  //   searchReg() {
  //     return new RegExp(this.searchText.trim(), 'i');
  //   },
  // },
  watch: {
    searchText(newVal) {
      const query = newVal.trim();
      if (this.searchBarStatus !== '') {
        this.searchBarStatus = '';
      }
      if (this.searchResults.length > 0) {
        this.searchResults = [];
      }
      if (!query || query === '') {
        this.isSearchResultsVisible = false;
      }
    },
  },
  methods: {
    handleClickSearchResult(courseID) {
      this.$emit('addcourse', courseID);
    },
    handleClickSearchButton() {
      this.isLoadingSearchResults = true;

      // 防止还未渲染 loading 状态就卡住
      setTimeout(() => {
        const query = this.searchText.trim();
        if (!query || query === '') {
          this.isSearchResultsVisible = false;
          return;
        }

        const reg = new RegExp(query, 'i');

        this.searchResults = this.searchIndex.filter(({ index }) => reg.test(index));
        if (this.searchResults.length > 0) {
          this.searchBarStatus = 'success';
          this.$message.success(`找到 ${this.searchResults.length} 门课程`);
          // 主要针对移动端，使键盘收回
          this.$refs.textfield.blur();
        } else {
          this.searchBarStatus = 'error';
          this.$message.error('没有找到符合条件的课程');
        }

        this.isLoadingSearchResults = false;
        this.isSearchResultsVisible = true;
      }, 0);
    },
    handleKeyDown(e) {
      // TODO: 如何在移动端监听键盘“完成”按钮？
      // 监听回车键
      if (e.which === 13) {
        this.handleClickSearchButton();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.timetable__search-bar {
  position: relative;
  min-width: 320px;
  height: 928px;

  flex: 1;
  display: flex;

  > .search-bar__text-field {
    position: relative;
  }
}

.search-bar__search-button {
  margin-top: -4px;
}

.search-bar__results {
  position: absolute;
  // top: 2.75rem;
  top: 40px;
  width: 100%;

  max-height: 13.5rem;
  border: 1px solid #d3d6db;
  border-top: 0;
  border-radius: 0 0 0.25rem 0.25rem;
  background-color: #fff;

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

.result-line.cut {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
