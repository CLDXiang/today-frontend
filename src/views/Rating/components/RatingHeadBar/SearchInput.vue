<template>
  <div
    class="search-input"
    :class="{ 'search-input--disable': disabled }"
  >
    <div
      class="search-input__container"
      @click="handleClickTextField"
    >
      <div class="search-input__text-field">
        <span
          class="search-input__icon"
          @click="search"
        >
          <f-icon
            name="search"
            size="14"
          />
        </span>
        <input
          ref="input"
          v-model="value"
          type="search"
          :disabled="disabled"
          placeholder="搜索课程"
          @keydown="handleKeyDown"
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FIcon } from '@/components/common';

export default defineComponent({
  components: {
    FIcon,
  },
  props: {
    /** 是否禁用 */
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      value: '',
    };
  },
  methods: {
    handleClickTextField() {
      if (this.disabled) {
        return;
      }
      (this.$refs.input as HTMLInputElement).focus();
    },
    handleKeyDown(e: KeyboardEvent) {
      // TODO: 如何在移动端监听键盘“完成”按钮？
      // 监听回车键
      if (e.which === 13) {
        this.search();
      }
    },
    search() {
      if (this.disabled) {
        return;
      }
      // 在搜索页面再次触发搜索，不重复堆叠页面栈
      if (this.$route.path === '/rating/search') {
        this.$router.replace({ path: '/rating/search', query: { q: this.value } });
      } else {
        this.$router.push({ path: '/rating/search', query: { q: this.value } });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.search-input {
  flex: 1;
  margin: 0 36px 0 24px;
}

.search-input__container {
  box-sizing: border-box;
  cursor: text;
  border-radius: 16px;
  color: $gray3;
  background-color: #f2f2f2;
  padding: 0 10px;
  font-size: 16px;
  line-height: 20px;
  height: 32px;
  transition: 0.3s color, border-width cubic-bezier(0.25, 0.8, 0.25, 1);

  > .search-input__text-field {
    height: 100%;

    position: relative;

    display: flex;
    align-items: center;
    cursor: text;

    > .search-input__icon {
      line-height: 14px;
      height: 14px;

      cursor: pointer;
    }

    > input {
      border: none;
      outline: none;
      width: 100%;
      background-color: #f2f2f2;
      padding-left: 10px;
    }

    > input::placeholder {
      text-align: center;;
    }
  }
}

// disable 态
.search-input.search-input--disable > .search-input__container {
  cursor: not-allowed;
  > .search-input__text-field > input {
    cursor: not-allowed;
  }
}
</style>
