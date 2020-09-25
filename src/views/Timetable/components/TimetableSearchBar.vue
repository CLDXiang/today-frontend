<template>
  <div class="timetable__search-bar">
    <v-btn
      v-show="searchResults.length !== 0"
      :color="isSearchResultsVisible ? 'primary' : ''"
      class="results-visible-button"
      rounded
      depressed
      large
      @click="handleChangeResultsVisible"
    >
      <v-icon
        :style="isSearchResultsVisible ? 'color: #fff' : ''"
        left
      >
        {{ isSearchResultsVisible ? 'unfold_less' : 'unfold_more' }}
      </v-icon>
      {{ isSearchResultsVisible ? '收起搜索结果' : '展开搜索结果' }}
    </v-btn>
    <div class="search-bar__content-line search-bar__actions-bar">
      <v-btn
        :disabled="isLoadingSearchResults || isSearchQueryEmpty"
        rounded
        depressed
        large
        @click="handleClickResetButton"
      >
        <v-icon
          left
          style="color: #000"
        >
          settings_backup_restore
        </v-icon>
        重置
      </v-btn>
      <v-btn
        :disabled="isLoadingSearchResults || isSearchQueryEmpty"
        :loading="isLoadingSearchResults"
        color="primary"
        rounded
        depressed
        large
        @click="handleClickSearchButton"
      >
        <v-icon left>
          search
        </v-icon>
        搜索课程
      </v-btn>
    </div>
    <div v-show="!(isSearchResultsVisible && searchResults.length !== 0)">
      <div class="search-bar__content-line">
        <v-text-field
          ref="textfield1"
          v-model="searchQuery.name"
          :disabled="isLoadingSearchResults || isLoadingCourses"
          :success-messages="searchBarStatus === 'success' ? `找到 ${searchResults.length} 门课程` : []"
          :error-messages="searchBarStatus === 'error' ? '没有找到符合条件的课程' : []"
          label="课程名"
          hint="e.g. 文学（不分大小写）"
          outlined
          dense
          autocomplete="off"
          class="search-bar__text-field"
          @keydown="handleKeyDown"
        />
      </div>
      <div class="search-bar__content-line">
        <v-text-field
          ref="textfield4"
          v-model="searchQuery.codeId"
          :disabled="isLoadingSearchResults || isLoadingCourses"
          :success="searchBarStatus === 'success' && searchQuery.codeId.trim() !== ''"
          :error="searchBarStatus === 'error' && searchQuery.codeId.trim() !== ''"
          label="课程号"
          hint="e.g. Engl（不分大小写）"
          outlined
          dense
          autocomplete="off"
          class="search-bar__text-field"
          @keydown="handleKeyDown"
        />
      </div>
      <div class="search-bar__content-line">
        <v-text-field
          ref="textfield2"
          v-model="searchQuery.teachers"
          :disabled="isLoadingSearchResults || isLoadingCourses"
          :success="searchBarStatus === 'success' && searchQuery.teachers.trim() !== ''"
          :error="searchBarStatus === 'error' && searchQuery.teachers.trim() !== ''"
          label="授课教师"
          hint="请输入教师全名，多名教师可用逗号分隔"
          outlined
          dense
          autocomplete="off"
          class="search-bar__text-field"
          @keydown="handleKeyDown"
        />
      </div>
      <div class="search-bar__content-line">
        <v-text-field
          ref="textfield5"
          v-model="searchQuery.place"
          :disabled="isLoadingSearchResults || isLoadingCourses"
          :success="searchBarStatus === 'success' && searchQuery.place.trim() !== ''"
          :error="searchBarStatus === 'error' && searchQuery.place.trim() !== ''"
          label="上课地点"
          hint="e.g. Hgx（不分大小写）"
          outlined
          dense
          autocomplete="off"
          class="search-bar__text-field"
          @keydown="handleKeyDown"
        />
      </div>
      <div class="search-bar__content-line">
        <v-text-field
          ref="textfield3"
          v-model="searchQuery.department"
          :disabled="isLoadingSearchResults || isLoadingCourses"
          :success="searchBarStatus === 'success' && searchQuery.department.trim() !== ''"
          :error="searchBarStatus === 'error' && searchQuery.department.trim() !== ''"
          label="开课院系"
          hint="e.g. 马克思"
          outlined
          dense
          autocomplete="off"
          class="search-bar__text-field"
          @keydown="handleKeyDown"
        />
      </div>
      <div class="search-bar__content-line">
        <!-- <v-range-slider
        v-model="searchQuery.dayRange"
        label="星期"
        :tick-labels="dayLabels"
        min="0"
        max="6"
        ticks="always"
        tick-size="4"
      >
        <template v-slot:thumb-label="props">
          {{ '周' + dayLabels[props.value] }}
        </template>
      </v-range-slider> -->
        <v-select
          v-model="searchQuery.day"
          :items="dayLabels"
          :disabled="isLoadingSearchResults || isLoadingCourses"
          :success="searchBarStatus === 'success' && searchQuery.day !== '全部'"
          :error="searchBarStatus === 'error' && searchQuery.day !== '全部'"
          label="星期"
          dense
          outlined
          autocomplete="off"
        />
      </div>
      <div class="search-bar__content-line">
        <v-range-slider
          v-model="searchQuery.sectionRange"
          :tick-labels="sectionLabels"
          label="节次"
          min="0"
          max="13"
          ticks="always"
          tick-size="4"
        >
          <template #thumb-label="props">
            {{ props.value + 1 }}
          </template>
        </v-range-slider>
      </div>
    </div>

    <div
      v-show="isSearchResultsVisible && searchResults.length !== 0"
      class="search-bar__results-box"
    >
      <v-scroll-y-transition>
        <div
          v-show="isSearchResultsVisible && searchResults.length !== 0"
          class="search-bar__results"
        >
          <div
            v-for="item in searchResults"
            :key="item.courseId"
            class="search-bar__result"
            @click.stop="handleClickSearchResult(item.courseId)"
            @mouseenter="setHoveredCourseId(item.courseId)"
            @mouseleave="resetHoveredCourseId"
            @touchstart="setHoveredCourseId(item.courseId)"
            @touchend="resetHoveredCourseId"
          >
            <div class="result-line">
              {{ `${item.codeId} ${item.name}` }}
            </div>
            <div class="result-line cut">
              {{ item.teachersText }}
            </div>
            <div
              v-for="(ts, tsIndex) in item.timeSlotsTexts.slice(0, 3)"
              :key="tsIndex"
              class="result-line result-line--ts"
            >
              {{ ts }}
            </div>
            <div
              v-if="item.timeSlotsTexts.length > 3"
              class="result-line result-line--ts"
            >
              ……
            </div>
          </div>
        </div>
      </v-scroll-y-transition>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    searchIndex: Array,
    isLoadingCourses: Boolean,
  },
  data() {
    return {
      searchQuery: {
        name: '',
        teachers: '',
        department: '',
        day: '全部',
        // dayRange: [0, 6],
        sectionRange: [0, 13],
        place: '',
        codeId: '',
      },

      // dayLabels: ['一', '二', '三', '四', '五', '六', '日'],
      dayLabels: ['全部', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],

      isSearchResultsVisible: false,
      /** 搜索结果
       * TODO: 后续可能还需要在 value 中加入一些状态：是否已选等
       */
      searchResults: [],
      isLoadingSearchResults: false,
      searchBarStatus: 'normal',
    };
  },
  computed: {
    sectionLabels() {
      const res = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
      return res.map((item, index) => {
        if (
          index === 0
          || index === res.length - 1
          || index === this.searchQuery.sectionRange[0]
          || index === this.searchQuery.sectionRange[1]
        ) {
          return item;
        }
        return '';
      });
    },
    isSearchQueryEmpty() {
      const sq = this.searchQuery;
      return (
        sq.name.trim() === ''
        && sq.teachers.trim() === ''
        && sq.department.trim() === ''
        // sq.dayRange[0] === 0 &&
        // sq.dayRange[1] === 6 &&
        && sq.day === '全部'
        && sq.sectionRange[0] === 0
        && sq.sectionRange[1] === 13
        && sq.place.trim() === ''
        && sq.codeId.trim() === ''
      );
    },
  },
  watch: {
    searchQuery: {
      handler() {
        if (this.searchBarStatus !== '') {
          this.searchBarStatus = '';
        }
        if (this.searchResults.length > 0) {
          this.searchResults = [];
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations(['setHoveredCourseId', 'resetHoveredCourseId']),
    handleChangeResultsVisible() {
      this.isSearchResultsVisible = !this.isSearchResultsVisible;
    },
    handleClickSearchResult(courseId) {
      this.$emit('addcourse', courseId);
    },
    handleClickResetButton() {
      this.searchQuery.name = '';
      this.searchQuery.teachers = '';
      this.searchQuery.department = '';
      // this.searchQuery.dayRange = [0, 6];
      this.searchQuery.day = '全部';
      this.searchQuery.sectionRange = [0, 13];
      this.searchQuery.place = '';
      this.searchQuery.codeId = '';
    },
    handleClickSearchButton() {
      this.isLoadingSearchResults = true;

      // 防止还未渲染 loading 状态就卡住
      setTimeout(() => {
        if (this.isSearchQueryEmpty) {
          this.isSearchResultsVisible = false;
          this.isLoadingSearchResults = false;
          return;
        }

        // 过滤结果
        const sq = this.searchQuery;
        // 对可能出现英文的采用正则匹配以支持大小写，teachers 除外
        const nameReg = new RegExp(sq.name, 'i');
        const placeReg = new RegExp(sq.place, 'i');
        const codeIdReg = new RegExp(sq.codeId, 'i');

        const nameTrimmed = sq.name.trim();
        const teachersTrimmed = sq.teachers.trim();
        const departmentTrimmed = sq.department.trim();
        const placeTrimmed = sq.place.trim();
        const codeIdTrimmed = sq.codeId.trim();
        // const dayRangeStart = sq.dayRange[0] + 1;
        // const dayRangeEnd = sq.dayRange[1] + 1;
        const { day } = sq;
        const sectionRangeStart = sq.sectionRange[0] + 1;
        const sectionRangeEnd = sq.sectionRange[1] + 1;

        this.searchResults = this.searchIndex.filter(
          ({
            name, teachers, department, timeSlots, codeId,
          }) => {
            // 外层每一个 if 中，前面的条件都代表“有有效输入”，即需要根据这个字段进行过滤
            if (nameTrimmed && !nameReg.test(name)) return false;
            if (teachersTrimmed) {
              // 按逗号分隔
              const teachersArray = teachersTrimmed.split(/,|，/);
              // 按与匹配，必须每个老师都在课程教师列表中
              if (teachersArray.filter((t) => !teachers.includes(t)).length > 0) return false;
            }
            if (departmentTrimmed && !department.includes(departmentTrimmed)) return false;
            if (codeIdTrimmed && !codeIdReg.test(codeId)) return false;

            // timeSlots 相关，匹配任意一个即可
            if (
              placeTrimmed
              // dayRangeStart !== 1 ||
              // dayRangeEnd !== 7 ||
              || day !== '全部'
              || sectionRangeStart !== 1
              || sectionRangeEnd !== 14
            ) {
              /* eslint-disable no-continue */
              // eslint-disable-next-line no-restricted-syntax
              for (const ts of timeSlots) {
                if (placeTrimmed && !placeReg.test(ts.place)) continue;
                // if (dayRangeStart > ts.day || dayRangeEnd < ts.day) continue;
                if (day === '星期一' && ts.day !== 1) continue;
                if (day === '星期二' && ts.day !== 2) continue;
                if (day === '星期三' && ts.day !== 3) continue;
                if (day === '星期四' && ts.day !== 4) continue;
                if (day === '星期五' && ts.day !== 5) continue;
                if (day === '星期六' && ts.day !== 6) continue;
                if (day === '星期日' && ts.day !== 7) continue;
                if (sectionRangeStart > ts.section[0] || sectionRangeEnd < ts.section[1]) continue;
                return true;
              }
            } else {
              return true;
            }

            return false;
          },
        );

        if (this.searchResults.length > 0) {
          this.searchBarStatus = 'success';
          this.$message.success(`找到 ${this.searchResults.length} 门课程`);
          // 主要针对移动端，使键盘收回
          this.$refs.textfield1.blur();
          this.$refs.textfield2.blur();
          this.$refs.textfield3.blur();
          this.$refs.textfield4.blur();
          this.$refs.textfield5.blur();
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
@import '@/scss/_timetable';

.title {
  margin-top: 36px;
  font-size: 20px;
  line-height: 20px;
  flex: 1;
  display: flex;
  justify-content: center;
  color: #333;
}

.timetable__search-bar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  position: relative;
  // min-width: 320px;
  width: 100%;
  height: 100%;

  flex: 1;
  display: flex;

  > .search-bar__text-field {
    position: relative;
    flex: 0;
  }

  > .search-bar__content-line {
    width: 100%;
    height: 66px;
    padding: 0 16px;
  }

  .search-bar__actions-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    margin: 12px 0;
  }

  >>> .v-slider__tick-label {
    transform: translateX(-50%) !important;
  }
}

.search-bar__search-button {
  margin-top: -4px;
}

.search-bar__results-box {
  backface-visibility: hidden;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  overflow-y: auto;
  margin-top: 12px;
  background-color: #f2f2f2;
}

.search-bar__results {
  width: 100%;

  // max-height: 13.5rem;
  height: 100%;
  border-radius: 0 0 0.25rem 0.25rem;

  overflow: auto;
}

.search-bar__result {
  background-color: #fff;
  margin-top: 10px;
  // height: 120px;
  filter: drop-shadow(0px 4px 4px rgba(141, 141, 141, 0.3));

  cursor: pointer;

  padding: 20px;
  border-radius: 8px;

  font-size: 0.9rem;
  color: #69707a;

  &:hover,
  &.hover {
    background-color: #f3f5f8;
  }
}

.result-line {
  line-height: 22px;
}

.result-line:first-child {
  font-size: 18px;
  color: #4f4f4f;
}

.result-line.cut {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: #4f4f4f;
}

.result-line--ts {
  font-size: 12px;
  color: #828282;
}
</style>
