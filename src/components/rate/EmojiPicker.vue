<template>
  <div class="emoji-bar-container">
    <div v-if="showPicker" class="picker-container" :class="{'picker-container-show': showPicker}">
      <div v-click-outside="{ handler: hidePicker, isActive: showPicker }">
        <emoji-picker
          title="Pick your Reaction"
          set="twitter" 
          :data="index"
          class="picker" 
          @select="addEmoji"
        />
      </div>
    </div>

    <div :key="upvote.id" class="emoji-tag-container">
      <input v-model="upvote.active" class="upvote-tag-toggle" type="checkbox" @change="toggleEmoji(upvote)">
      <div class="upvote-tag-background" />
      <div class="upvote-tag-icon">
        <i class="material-icons-round">arrow_drop_up</i>
      </div>
      <div class="upvote-tag-cnt">
        赞同<span v-if="upvote.cnt > 0" style="margin-left: .5em;">{{ upvote.cnt }}</span>
      </div>
    </div>

    <div :key="downvote.id" class="emoji-tag-container">
      <input v-model="downvote.active" class="upvote-tag-toggle" type="checkbox" @change="toggleEmoji(downvote)">
      <div class="upvote-tag-background" />
      <div class="upvote-tag-icon">
        <i class="material-icons-round">arrow_drop_down</i>
      </div>
    </div>



    <template v-for="i in items">
      <div
        v-if="i.id !== 'upvote' && i.id !== 'downvote'"
        :key="i.id"
        class="emoji-tag-container"
      >
        <input v-model="i.active" class="emoji-tag-toggle" type="checkbox" @change="toggleEmoji(i)">
        <div class="emoji-tag-background" />
        <emoji-icon 
          :emoji="i.id" 
          :data="index" 
          :size="20"
          set="twitter" 
          class="emoji-tag-icon"
        />
        <div class="emoji-tag-cnt">
          {{ i.cnt }}
        </div>
      </div>
    </template>

    <div class="emoji-tag-container" style="padding: 0;">
      <input v-model="showPicker" class="emoji-tag-toggle" type="checkbox">
      <div class="emoji-tag-background" />
      <i class="emoji-tag-cnt material-icons" style="margin: 0 .3em;">add_circle_outline</i>
    </div>
  </div>
</template>

<script>
import data from 'emoji-mart-vue-fast/data/twitter.json';
import { StaticPicker as EmojiPicker, Emoji as EmojiIcon, EmojiIndex } from 'emoji-mart-vue-fast';
import 'emoji-mart-vue-fast/css/emoji-mart.css';

import vClickOutside from 'v-click-outside';

const index = new EmojiIndex(data);

export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    EmojiPicker,
    EmojiIcon,
  },
  props: {
    items: {
      type: Array,
      default: () => [{ id: 'santa', cnt: 3, active: true }],
    },
  },
  data() {
    return {
      showPicker: false,
      index,
      upvote: { id: 'upvote', cnt: 0, active: false },
      downvote: { id: 'downvote', cnt: 0, active: false },
    };
  },
  created() {
    this.items.forEach((i) => {
      if (i.id === 'upvote') {
        this.upvote = i;
      } else if (i.id === 'downvote') {
        this.downvote = i;
      }
    });
  },
  methods: {
    hidePicker() {
      this.showPicker = false;
    },
    addEmoji(e) {
      let added = false;
      let valid = true;
      for (let i = 0; i < this.items.length; i += 1) {
        const item = this.items[i];
        if (item.id === e.id) {
          if (item.active === false) {
            item.active = true;
            this.toggleEmoji(item);
            added = true;
            break;
          } else valid = false;
        }
      }
      if (!added && valid) {
        const item = { id: e.id, cnt: 0, active: true };
        this.items.push(item);
        this.toggleEmoji(item);
      }
    },
    toggleEmoji(ii) {
      const i = ii;
      if (i.active) {
        i.cnt += 1;
        this.showPicker = false;
        this.$emit('activate', i);
      } else {
        i.cnt -= 1;
        if (i.cnt === 0 && i.id !== this.upvote.id && i.id !== this.downvote.id) {
          const idx = this.items.indexOf(i);
          if (idx !== -1) {
            this.items.splice(idx, 1);
          }
        }
        this.$emit('deactivate', i);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/utils.scss';
.emoji-bar-container {
  $spacing: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: $spacing/2 0;
  position: relative;
  width: 100%;

  > .emoji-tag-container {
    margin: 0 $spacing/2 $spacing/2 0;
  }
}

$spacing: 0.6 * $small-spacing;
.upvote-tag-toggle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  & + .upvote-tag-background {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.3em;
    transition: border 0.2s, background 0.1s;

    background: rgba($primary-color, 0.16);
    // border: 2px solid rgba($primary-color, $inactive-opacity);
  }
  &:hover {
    + .upvote-tag-background {
      background: rgba($primary-color, 0.2);
    }
  }

  & ~ .upvote-tag-icon {
    pointer-events: none;
    position: relative;
    color: $primary-color;
    width: 1.3em;
    height: 1.3em;
    display: flex;
    align-items: center;
    justify-content: center;
    > i {
      font-size: 3em;
    }
  }

  & ~ .upvote-tag-cnt {
    position: relative;
    pointer-events: none;
    margin: 0 0.8 * $spacing 0 1.4 * $spacing;
    color: $primary-color;
  }

  &:checked + .upvote-tag-background {
    background: rgba($primary-color, 1);
    //border: 2px solid rgba($primary-color, $inactive-opacity);
  }
  &:checked ~ .upvote-tag-cnt,
  &:checked ~ .upvote-tag-icon {
    color: white;
  }
}

.emoji-tag-toggle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  &:hover {
    + .emoji-tag-background {
      background: rgba(0, 0, 0, 0.06);
    }
  }
  & + .emoji-tag-background {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.3em;
    transition: border 0.2s, background 0.1s;
    background: rgba(0, 0, 0, 0.03);
  }
  &:checked + .emoji-tag-background {
    background: rgba($primary-color, 0.06);
    border: 2px solid rgba($primary-color, $inactive-opacity);
  }
  &:checked ~ .emoji-tag-cnt {
    color: $primary-color;
  }
}

.emoji-tag-container {
  height: 2.5em;
  border-radius: 0.3em;
  padding: $spacing 1.6 * $spacing $spacing 1.6 * $spacing;
  position: relative;
  display: flex;
  align-items: center;
  //transition: all .2s;

  > .emoji-tag-icon {
    pointer-events: none;
  }
  > .emoji-tag-cnt {
    pointer-events: none;
    margin: 0 0.8 * $spacing 0 1.4 * $spacing;
    opacity: $active-opacity;
  }
}

.picker-container {
  @include button2span;
  position: absolute;
  left: 50%;
  top: 0;
  width: 100%;
  z-index: 3;
  transform: translate(-50%, -100%);
  opacity: 0;
  pointer-events: none;
}
.picker-container-show {
  opacity: 1;
  pointer-events: all;
}

// HACK
.emoji-tag-icon {
  padding: 0 !important;
  font-size: inherit;
  display: flex;
  align-items: center;
  & ::v-deep span {
    font-size: inherit;
    height: 1.3em !important;
    width: 1.3em !important;
  }
}

// HACK
.picker {
  // display: none !important;
  width: 100% !important;
  height: 20em !important;
  // max-width: 20em !important;

  color: rgba(0, 0, 0, $active-opacity) !important;
  background: white !important;
  border: 1px solid rgba(0, 0, 0, $divider-opacity) !important;
  & ::v-deep .emoji-mart-search {
    margin: 0 $small-spacing !important;
    padding: 0 !important;
    > input {
      border: none;
      border-radius: 0 !important;
      background: rgba(0, 0, 0, 0.03);
      padding: $small-spacing;
    }
  }
  & ::v-deep .emoji-mart-category-label {
    position: sticky !important;
  }

  & ::v-deep .emoji-mart-bar {
    border: none !important;
  }

  & ::v-deep .emoji-mart-anchor-bar {
    display: none !important;
  }
  & ::v-deep .emoji-mart-category-label {
    > span {
      padding: $small-spacing !important;
      background: white !important;
    }
  }

  & ::v-deep .emoji-mart-scroll {
    @include no-scrollbar;
  }
}
</style>
