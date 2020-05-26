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
      <div
        class="upvote-tag-toggle"
        :class="{'upvote-tag-toggle--active': upvote.active }"
        @click="toggleEmoji(upvote)"
      />

      <div class="upvote-tag-background" />
      <div class="upvote-tag-icon">
        <i class="material-icons-round">arrow_drop_up</i>
      </div>
      <div class="upvote-tag-cnt">
        赞同<span v-if="upvote.cnt > 0" style="margin-left: .5em;">{{ upvote.cnt }}</span>
      </div>
    </div>

    <div :key="downvote.id" class="emoji-tag-container">
      <div
        class="upvote-tag-toggle"
        :class="{'upvote-tag-toggle--active': downvote.active }"
        @click="toggleEmoji(downvote)"
      />
      <div class="upvote-tag-background" />
      <div class="upvote-tag-icon">
        <i class="material-icons-round">arrow_drop_down</i>
      </div>
    </div>


    <template v-for="i in items">
      <div
        v-if="i.id !== 'upvote' && i.id !== 'downvote' && !(i.cnt === 0 && i.locked)"
        :key="i.id"
        class="emoji-tag-container"
      >
        <div
          class="emoji-tag-toggle"
          :class="{'emoji-tag-toggle--active': i.active }"
          @click="toggleEmoji(i)"
        />
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
import log from '../../utils/log';
import { postReaction, deleteReaction } from '../../services/react';

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
    target: {
      type: String,
      default: '',
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
            this.toggleEmoji(item);
            added = true;
            break;
          } else valid = false;
        }
      }
      if (!added && valid) {
        const item = { id: e.id, cnt: 0, active: false, locked: true };
        this.items.push(item);
        this.toggleEmoji(item, false);
      } else if (!valid) {
        this.$toast.warn('您已添加过该表情');
      }
      this.showPicker = false;
    },
    toggleEmoji(ii, checkLock = true) {
      const i = ii;

      if (checkLock && i.locked) {
        log.info('May be a deadlock or click too fast');
      } else {
        i.locked = true;

        if (!i.active) {
          // upvote/downvote collision
          if (i.id === this.upvote.id || i.id === this.downvote.id) {
            const toActive = i;
            const toDeactive = i.id === this.upvote.id ? this.downvote : this.upvote;
            log.info('u/d', toActive, toDeactive);
            if (toDeactive.locked) {
              i.locked = false;
              return;
            }
            toDeactive.locked = true;

            if (toDeactive.active) {
              deleteReaction(this.target, toDeactive.reactId)
                .then(() => {
                  toDeactive.cnt -= 1;
                  toDeactive.reactId = undefined;
                  toDeactive.active = false;

                  postReaction(this.target, toActive.id)
                    .then((resp) => {
                      toActive.reactId = resp.id;
                      toActive.cnt += 1;
                      toActive.active = true;

                      toActive.locked = false;
                      toDeactive.locked = false;
                      if (!toActive.reactId) log.info('ERROR: react id undefined');
                    })
                    .catch((e) => {
                      toActive.locked = false;
                      toDeactive.locked = false;
                      log.info(e);
                    });
                })
                .catch((e) => {
                  toActive.locked = false;
                  toDeactive.locked = false;
                  log.info(e);
                });
            } else {
              postReaction(this.target, toActive.id)
                .then((resp) => {
                  toActive.reactId = resp.id;
                  toActive.cnt += 1;
                  toActive.active = true;

                  toActive.locked = false;
                  toDeactive.locked = false;
                  if (!toActive.reactId) log.info('ERROR: react id undefined');
                })
                .catch((e) => {
                  toActive.locked = false;
                  toDeactive.locked = false;
                  if (e.response.status === 403) this.$toast.error('抱歉，您添加的表情过多');
                  else log.info(e);
                });
            }
          }
          // Normal reactions
          else {
            postReaction(this.target, i.id)
              .then((resp) => {
                i.cnt += 1;
                i.reactId = resp.id;
                i.active = true;
                i.locked = false;
              })
              .catch((e) => {
                if (i.cnt === 0 && i.id !== this.upvote.id && i.id !== this.downvote.id) {
                  const idx = this.items.indexOf(i);
                  if (idx !== -1) {
                    this.items.splice(idx, 1);
                  }
                }

                i.locked = false;
                if (e.response.status === 403) {
                  this.$toast.error('抱歉，您添加的表情过多');
                } else log.info(e);
              });
          }
        } else if (i.reactId) {
          deleteReaction(this.target, i.reactId)
            .then(() => {
              i.cnt -= 1;

              if (i.cnt === 0 && i.id !== this.upvote.id && i.id !== this.downvote.id) {
                const idx = this.items.indexOf(i);
                if (idx !== -1) {
                  this.items.splice(idx, 1);
                }
              }

              i.reactId = undefined;
              i.active = false;
              i.locked = false;
            })
            .catch((e) => {
              i.locked = false;
              log.info(e);
            });
        } else {
          log.info('ERROR: React to Id not found ?');
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/utils.scss';
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
}
.upvote-tag-toggle--active {
  & + .upvote-tag-background {
    background: rgba($primary-color, 1) !important;
    //border: 2px solid rgba($primary-color, $inactive-opacity);
  }
  & ~ .upvote-tag-cnt,
  & ~ .upvote-tag-icon {
    color: white !important;
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
}
.emoji-tag-toggle--active {
  & + .emoji-tag-background {
    background: rgba($primary-color, 0.06) !important;
    border: 2px solid rgba($primary-color, $inactive-opacity) !important;
  }
  & ~ .emoji-tag-cnt {
    color: $primary-color !important;
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
