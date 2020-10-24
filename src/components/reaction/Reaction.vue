<template>
  <div class="reaction">
    <emoji-button
      v-for="emojiEntry in emojiEntries"
      :key="emojiEntry.emojiId"
      :emoji="emojiEntry.emojiId"
      :count="emojiEntry.emojiItems.length"
      :style="buttonStyle"
      :active="emojiEntry.activeIndex !== -1"
      :emoji-style="emojiStyle"
      :count-style="countStyle"
    />
  </div>
</template>

<script lang="ts">
import { CSSProperties, defineComponent, PropType } from 'vue';
import { EmojiTable, EmojiEntry, EmojiItem } from './types';
import { compareEmojiEntryByTime, compareEmojiEntryByCount } from './utils';
import { EmojiButton } from './components';

export default defineComponent({
  components: {
    EmojiButton,
  },
  props: {
    /** reaction 对象 */
    value: { type: Object as PropType<EmojiTable>, default: {} },
    /** 是否只读（不可交互） */
    readonly: { type: Boolean, default: true },
    /** 排序 */
    sortBy: { type: String as PropType<'time' | 'count'>, default: 'time' },
    /** 只显示前 N 个（为 0 时不筛选） */
    topN: { type: Number, default: 0 },
    /** button 样式 */
    buttonStyle: { type: Object as PropType<CSSProperties>, default: {} },
    /** emoji 样式 */
    emojiStyle: { type: Object as PropType<CSSProperties>, default: {} },
    /** 数目样式 */
    countStyle: { type: Object as PropType<CSSProperties>, default: {} },
  },
  computed: {
    /** 处理过的 emoji 数据列表 */
    emojiEntries(): EmojiEntry[] {
      let valueEntries: EmojiEntry[] = Object.entries(this.value).map(([emojiId, emojiItems]) => ({
        emojiId,
        emojiItems,
        activeIndex: -1,
      }));

      if (this.sortBy === 'time') {
        // 时间排序
        valueEntries.sort(compareEmojiEntryByTime);
      } else if (this.sortBy === 'count') {
        // 数目排序
        valueEntries.sort(compareEmojiEntryByCount);
      }
      if (this.topN > 0) {
        valueEntries = valueEntries.slice(0, this.topN);
      }

      valueEntries = valueEntries.map((entry) => ({
        ...entry,
        activeIndex: this.isCurrentUserInEmojiItems(entry.emojiItems),
      }));

      return valueEntries;
    },
  },
  methods: {
    /** 当前用户在 EmojiItem 列表中的位置 */
    isCurrentUserInEmojiItems(emojiItems: EmojiItem[]) {
      // FIXME: mock，应当改为当前用户真实 uid
      const userId = 'mock_test';
      return emojiItems.findIndex((emojiItem) => emojiItem.id === userId);
    },
  },
});
</script>

<style lang="scss" scoped>
.reaction {
  display: flex;

  > .emoji-button {
    margin-right: 10px;
  }
}
</style>
