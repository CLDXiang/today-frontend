<template>
  <div class="flex flex-col h-full w-full">
    <div class="justify-end items-center p-2 hidden md:flex space-x-2">
      <a-button
        v-show="searchResults.length !== 0"
        block
        :type="isSearchResultsVisible ? 'primary' : undefined"
        shape="round"
        size="large"
        @click="isSearchResultsVisible = !isSearchResultsVisible"
      >
        <f-icon
          :style="isSearchResultsVisible ? 'color: #fff' : undefined"
          :name="isSearchResultsVisible ? 'contract' : 'expand'"
          size="20"
        />
        {{ isSearchResultsVisible ? '收起搜索结果' : '展开搜索结果' }}
      </a-button>
    </div>
    <div class="justify-end items-center p-2 hidden md:flex space-x-2">
      <a-button
        :disabled="isLoadingSearchResults || isSearchQueryEmpty"
        shape="round"
        size="large"
        @click="resetSearchQuery"
      >
        <f-icon
          name="undo"
          size="20"
        />
        重置
      </a-button>
      <a-button
        :disabled="isLoadingSearchResults || isSearchQueryEmpty"
        :loading="isLoadingSearchResults"
        type="primary"
        shape="round"
        size="large"
        @click="search"
      >
        <f-icon
          name="search"
          size="20"
        />
        搜索课程
      </a-button>
    </div>
    <span
      :class="[
        'mt-7 mx-0 mb-5 text-xl flex-initial flex-shrink-0',
        'flex justify-center text-gray-800 md:hidden',
      ]"
    >
      搜索课程
    </span>
    <div
      v-show="!(isSearchResultsVisible && searchResults.length !== 0)"
      class="flex flex-col justify-start relative w-full h-full flex-grow"
    >
      <div class="w-full h-16 py-0 px-4 flex items-center">
        <f-input
          ref="textfield1"
          v-model="searchQuery.name"
          :disabled="isLoadingSearchResults || isLoadingCourses"
          :success-messages="
            searchBarStatus === 'success' ? `找到 ${searchResults.length} 门课程` : []
          "
          :error-messages="searchBarStatus === 'error' ? '没有找到符合条件的课程' : []"
          label="课程名"
          hint="e.g. 文学（不分大小写）"
          outlined
          dense
          autocomplete="off"
          class="flex-grow"
          @keydown="handleKeyDown"
        />
      </div>
      <div class="w-full h-16 py-0 px-4 flex items-center">
        <f-input
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
          class="flex-grow"
          @keydown="handleKeyDown"
        />
      </div>
      <div class="w-full h-16 py-0 px-4 flex items-center">
        <f-input
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
          class="flex-grow"
          @keydown="handleKeyDown"
        />
      </div>
      <div class="w-full h-16 py-0 px-4 flex items-center">
        <f-input
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
          class="flex-grow"
          @keydown="handleKeyDown"
        />
      </div>
      <div class="w-full h-16 py-0 px-4 flex items-center">
        <f-input
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
          class="flex-grow"
          @keydown="handleKeyDown"
        />
      </div>
      <div class="w-full h-16 py-0 px-4 flex items-center">
        <f-select
          v-model="searchQuery.day"
          class="flex-grow"
          :options="['全部', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']"
          :disabled="isLoadingSearchResults || isLoadingCourses"
          :success="searchBarStatus === 'success' && searchQuery.day !== '全部'"
          :error="searchBarStatus === 'error' && searchQuery.day !== '全部'"
          label="星期"
          autocomplete="off"
        />
      </div>
      <div class="w-full h-16 py-0 px-4 flex items-center">
        节次
        <a-slider
          v-model:value="searchQuery.sectionRange"
          class="flex-grow ml-2"
          range
          dots
          :marks="sectionLabels"
          :min="0"
          :max="13"
        />
      </div>
    </div>
    <div
      v-show="isSearchResultsVisible && searchResults.length !== 0"
      class="flex-auto overflow-y-auto mt-3 bg-gray-100"
    >
      <!-- <v-scroll-y-reverse-transition> -->
      <div
        v-show="isSearchResultsVisible && searchResults.length !== 0"
        class="w-full h-full rounded-b overflow-auto"
      >
        <div
          v-for="item in searchResults"
          :key="item.courseId"
          class="f-clickable bg-white mt-2 shadow-md p-5 rounded-lg text-sm text-gray-500"
          @click.stop="$emit('add-course', item.courseId)"
        >
          <div class="text-lg text-gray-600">
            {{ `${item.codeId} ${item.name}` }}
          </div>
          <div
            class="whitespace-nowrap overflow-hidden overflow-ellipsis text-sm text-gray-600"
          >
            {{ item.teachersText }}
          </div>
          <div
            v-for="(ts, tsIndex) in item.timeSlotsTexts.slice(0, 3)"
            :key="tsIndex"
            class="text-xs text-gray-500"
          >
            {{ ts }}
          </div>
          <div
            v-if="item.timeSlotsTexts.length > 3"
            class="text-xs text-gray-500"
          >
            ……
          </div>
        </div>
      </div>
      <!-- </v-scroll-y-reverse-transition> -->
    </div>
    <div class="justify-end items-center p-2 md:hidden space-x-2">
      <a-button
        v-show="searchResults.length !== 0"
        :type="isSearchResultsVisible ? 'primary' : undefined"
        shape="round"
        size="large"
        @click="isSearchResultsVisible = !isSearchResultsVisible"
      >
        <f-icon
          :style="isSearchResultsVisible ? 'color: #fff' : undefined"
          :name="isSearchResultsVisible ? 'contract' : 'expand'"
          size="20"
        />
        {{ isSearchResultsVisible ? '收起搜索结果' : '展开搜索结果' }}
      </a-button>
    </div>
    <div class="justify-end items-center p-2 md:hidden space-x-2">
      <a-button
        :disabled="isLoadingSearchResults || isSearchQueryEmpty"
        shape="round"
        size="large"
        @click="resetSearchQuery"
      >
        <f-icon
          name="undo"
          size="20"
        />
        重置
      </a-button>
      <a-button
        :disabled="isLoadingSearchResults"
        shape="round"
        size="large"
        @click="$emit('hide-search-dialog')"
      >
        <f-icon
          name="arrawsalt"
          size="20"
        />
        关闭
      </a-button>
      <a-button
        :disabled="isLoadingSearchResults || isSearchQueryEmpty"
        :loading="isLoadingSearchResults"
        type="primary"
        shape="round"
        size="large"
        @click="search"
      >
        <f-icon
          name="search"
          size="20"
        />
        搜索课程
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue';
import {
  computed, defineComponent, PropType, ref, watch,
} from 'vue';
import { SearchIndexItem } from '../types';

export default defineComponent({
  props: {
    searchIndex: { type: Array as PropType<SearchIndexItem[]>, required: true },
    isLoadingCourses: Boolean,
  },
  emits: ['hide-search-dialog', 'add-course'],
  setup(props) {
    /** 搜索表单字串 */
    const searchQuery = ref({
      name: '',
      teachers: '',
      department: '',
      day: '全部',
      sectionRange: [0, 13] as [number, number],
      place: '',
      codeId: '',
    });

    /** 节次滑条标签数组 */
    const sectionLabels = computed(() => {
      const res = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
      const marks: Record<number, string> = {};
      res.forEach((item, index) => {
        if (
          index === 0
          || index === res.length - 1
          || index === searchQuery.value.sectionRange[0]
          || index === searchQuery.value.sectionRange[1]
        ) {
          marks[index] = item;
        }
      });
      return marks;
    });
    /** 搜索结果为空 */
    const isSearchQueryEmpty = computed(() => {
      const sq = searchQuery.value;
      return (
        sq.name.trim() === ''
        && sq.teachers.trim() === ''
        && sq.department.trim() === ''
        && sq.day === '全部'
        && sq.sectionRange[0] === 0
        && sq.sectionRange[1] === 13
        && sq.place.trim() === ''
        && sq.codeId.trim() === ''
      );
    });

    /** 重置 searchQuery */
    const resetSearchQuery = () => {
      searchQuery.value = {
        name: '',
        teachers: '',
        department: '',
        day: '全部',
        sectionRange: [0, 13] as [number, number],
        place: '',
        codeId: '',
      };
    };

    /** 搜索结果 */
    const searchResults = ref<SearchIndexItem[]>([]);
    /** 搜索栏状态 */
    const searchBarStatus = ref<'normal' | 'success' | 'error'>('normal');

    watch(
      searchQuery,
      () => {
        if (searchBarStatus.value !== 'normal') {
          searchBarStatus.value = 'normal';
        }
        if (searchResults.value.length > 0) {
          searchResults.value = [];
        }
      },
      { deep: true },
    );

    /** 搜索结果是否显示 */
    const isSearchResultsVisible = ref(false);

    /** 是否正在搜索 */
    const isLoadingSearchResults = ref(false);

    /** 搜索课程 */
    const search = () => {
      isLoadingSearchResults.value = true;

      // 防止还未渲染 loading 状态就卡住
      setTimeout(() => {
        if (isSearchQueryEmpty.value) {
          isSearchResultsVisible.value = false;
          isLoadingSearchResults.value = false;
          return;
        }

        // 过滤结果
        const sq = searchQuery.value;
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

        searchResults.value = props.searchIndex.filter(
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

        if (searchResults.value.length > 0) {
          searchBarStatus.value = 'success';
          message.success(`找到 ${searchResults.value.length} 门课程`, 1);
          // 主要针对移动端，使键盘收回
          // FIXME: 修复下面这部分功能
          // this.$refs.textfield1.blur();
          // this.$refs.textfield2.blur();
          // this.$refs.textfield3.blur();
          // this.$refs.textfield4.blur();
          // this.$refs.textfield5.blur();
        } else {
          searchBarStatus.value = 'error';
          message.error('没有找到符合条件的课程', 1.5);
        }

        isLoadingSearchResults.value = false;
        isSearchResultsVisible.value = true;
      }, 0);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // TODO: 如何在移动端监听键盘“完成”按钮？
      // 监听回车键
      if (e.key === 'Enter') {
        search();
      }
    };

    return {
      searchQuery,
      isSearchResultsVisible,
      searchResults,
      isLoadingSearchResults,
      searchBarStatus,
      sectionLabels,
      isSearchQueryEmpty,
      resetSearchQuery,
      search,
      handleKeyDown,
    };
  },
});
</script>
