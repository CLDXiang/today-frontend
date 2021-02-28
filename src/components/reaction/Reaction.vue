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
      @click="handleClickEmojiButton(emojiEntry)"
    />
    <f-popover
      v-if="!readonly && availableEmoji.length"
      v-model:visible="addEmojiVisible"
      trigger="click"
      placement="bottomRight"
    >
      <template #content>
        <div class="add-emoji-bar">
          <span
            v-for="emoji in availableEmoji"
            :key="emoji"
            @click="handleClickNewEmoji(emoji)"
          >{{ emoji }}</span>
        </div>
      </template>
      <div class="add-emoji-button">
        <f-icon
          name="plus-circle"
          :size="16"
        />
      </div>
    </f-popover>
  </div>
</template>

<script lang="ts">
import { CSSProperties, defineComponent, PropType } from 'vue';
import logger from '@/utils/log';
import { FPopover } from '@/components/common';
import { EmojiTable, EmojiEntry, EmojiItem } from './types';
import { compareEmojiEntryByTime, compareEmojiEntryByCount, emojiTable } from './utils';
import { EmojiButton } from './components';

export default defineComponent({
  components: {
    EmojiButton,
    FPopover,
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
  emits: ['add', 'delete'],
  data() {
    return {
      addEmojiVisible: false,
    };
  },
  computed: {
    /** 处理过的 emoji 数据列表 */
    emojiEntries(): EmojiEntry[] {
      // 去掉计数为 0 的
      let valueEntries: EmojiEntry[] = Object.entries(this.value)
        .filter((entry) => entry[1].length)
        .map(([emojiId, emojiItems]) => ({
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

      // 筛选前 topN
      if (this.topN > 0) {
        valueEntries = valueEntries.slice(0, this.topN);
      }

      // 计算当前用户的 reaction
      // TODO: 未登录态直接跳过这一步
      valueEntries = valueEntries.map((entry) => ({
        ...entry,
        activeIndex: this.isCurrentUserInEmojiItems(entry.emojiItems),
      }));

      return valueEntries;
    },
    /** 还未使用且可用的 Emoji 列表 */
    availableEmoji() {
      const valueEntries: [string, EmojiItem[]][] = Object.entries(this.value)
        .filter((entry) => entry[1].length);
      const exsitingEmojiSet = new Set(valueEntries.map((entry) => entry[0]));
      return emojiTable.filter((emoji) => !exsitingEmojiSet.has(emoji));
    },
  },
  methods: {
    /** 当前用户在 EmojiItem 列表中的位置 */
    isCurrentUserInEmojiItems(emojiItems: EmojiItem[]) {
      // FIXME: mock，应当改为当前用户真实 uid
      const userId = 'mock_test';
      return emojiItems.findIndex((emojiItem) => emojiItem.id === userId);
    },
    /** 处理点击已有 emoji */
    handleClickEmojiButton(emojiEntry: EmojiEntry) {
      // TODO: 未登录态处理
      if (this.readonly) {
        return;
      }

      if (emojiEntry.activeIndex !== -1) {
        // 已经点过了，走取消流程
        this.$emit('delete', emojiEntry.emojiId);
        logger.log('删除 Reaction', emojiEntry.emojiId);
      } else {
        // 没有点过，走添加流程
        this.$emit('add', emojiEntry.emojiId);
        logger.log('新增 Reaction', emojiEntry.emojiId);
      }
    },
    /** 处理点击新的 emoji */
    handleClickNewEmoji(emojiId: string) {
      // TODO: 未登录态处理
      if (this.readonly) {
        return;
      }
      this.$emit('add', emojiId);
      logger.log('新增 Reaction', emojiId);
    },
  },
});
</script>

<style lang="scss" scoped>
.reaction {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  > .emoji-button, > .add-emoji-button {
    margin: 0 10px 4px 0;
  }

  > .add-emoji-button {
    color: #bdbdbd;
    height: 16px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
}

.add-emoji-bar {
  padding: 4px;
  display: flex;
  flex-wrap: wrap;
  width: 200px;
  max-width: 90vw;

  > span {
    font-size: 17.5px;
    flex: 0 0 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    &:hover {
      opacity: 0.7;
    }
    transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
}
</style>
