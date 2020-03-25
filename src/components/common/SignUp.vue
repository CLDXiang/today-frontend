<template>
  <div class="dialog" style="z-index: 12; background-color: white;" id="signup">
    <a class="dialog-back" href="#"></a>
    <div class="dialog-content" style="max-width: 35rem;">
      <div class="mark">
        <h3>Welcome.</h3>

        <div class="inputbar" style="max-width: 20em; border-radius: .3em;">
          <input id="signupname" type="text" spellcheck="false" />
          <span style="--width: 5em;"><span>Name</span></span>
        </div>

        <div class="inputbar" style="max-width: 20em; border-radius: .3em;">
          <input id="signuppwd" type="text" spellcheck="false" />
          <span style="--width: 7em;"><span>Password</span></span>
        </div>

        <div>
          <button class="light" style="color: rgba(0, 0, 0, .8);">
            Sign Up
          </button>
        </div>

        <!-- Action buttons -->
        <div style="text-align: right;">
          <label style="align-self: flex-end;"
            ><a class="icon" href="#"
              ><i class="material-icons">navigate_before</i></a
            ></label
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
// @import '../../scss/mark.scss';
// @import '../../scss/dialog.scss';
// @imoprt '../../scss/button.scss';
@import '../../scss/config.scss';

// Input bar style
div.inputbar {
  //TODO support custom color

  //user should provide --width
  //span {--width: 3em;}

  //border: 1px solid red;
  display: inline-flex;
  position: relative;
  overflow: hidden;
  max-width: 20em;

  border: 1px solid rgba(black, $divider-opacity);

  //input text
  input {
    //remove Edge's "x"
    &::-ms-clear {
      display: none;
    }

    //FIXME: when text overflow, try them
    //padding-left: $small-spacing;
    padding: 0 $small-spacing;

    border: none;
    outline: none;
    position: relative;
    width: 100%;
    min-width: 0px; //fix firefox

    background-color: transparent;

    + span {
      height: 1.4em+2 * $small-spacing;
      white-space: nowrap;
      position: relative;
      left: 1px; //remove extra border
      width: 0;
      min-width: 0;

      display: inline-flex;
      justify-content: flex-end;
      align-items: center;
      overflow: hidden;

      border: 1px solid rgba(black, $divider-opacity);
      border-top: none;
      border-bottom: none;
      border-right: none;

      //display: inline-block;
      opacity: 0;

      //outer
      transition: min-width 0.5s cubic-bezier(0.28, 0.11, 0.32, 1) 0.4s,
        opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.4s;
      > span {
        display: inline-block;
        position: absolute;
        width: var(--width, 0px);
        padding: $small-spacing;
        //line-height: 1.4em + $small-spacing;
        text-align: center;

        //inner
        opacity: 0;

        //should add display: inline-block
        transform: translate3d(600%, 0, 0);
        transition: transform 0s cubic-bezier(0.23, 1, 0.32, 1) 0.9s,
          opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.2s;

        color: black;
        &:hover {
          cursor: pointer;
          //border-radius: .3em;
          //background-color: rgba(black, .04);
          color: rgba(black, $inactive-opacity);
        }
      }
    }

    &:focus {
      outline: none;
      + span {
        //outer
        opacity: 1;
        //width: 50px;
        min-width: var(--width, 0px);

        //transition-delay: 0.2s;
        transition: min-width 0.5s cubic-bezier(0.28, 0.11, 0.32, 1) 0.2s,
          opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0.2s;

        > span {
          //inner
          transform: translate3d(0, 0, 0);
          opacity: $high-emphasis-opacity;
          //inner collapse
          transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0.2s,
            opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.4s;
        }
      }
    }
  }
}
</style>
