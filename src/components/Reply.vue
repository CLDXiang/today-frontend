<template>
  <div
    class="dialog"
    style="z-index: 12; background-color: white;"
    id="discuss"
  >
    <a class="dialog-back" @click="$router.back()"></a>
    <div
      class="dialog-content responsive-max-width"
      style="
        height: 100%;
        --max-width--landscape: 35rem;
        --max-width--portrait: 100%;
      "
    >
      <div
        class="mark no-scrollbar"
        style="height: 100%; --mark-padding: 2.1rem 0; overflow: auto;"
      >
        <!-- Action buttons -->
        <h3 style="display: flex; align-items: center;">
          <a
            class="icon"
            style="margin-right: .4em;"
            onclick="window.history.back();"
          >
            <i class="material-icons" style="font-size: inherit;">
              navigate_before
            </i>
          </a>
          View Post
        </h3>

        <div
          style="
              margin: 0;
              --opacity: .38; --opacity--hover: .6;
              --margin--landscape: 1.5rem;
              --padding--landscape: 1.2rem 1.4rem 1.5rem 1.4rem;
              --border-radius--landscape: .6em;

              --margin--portrait: 0;
              --padding--portrait: 1rem 1rem 1rem 1rem;
              --border-radius--portrait: 0;
          "
        >
          <div
            class="responsive-margin responsive-padding responsive-border-radius"
            style="
              --margin--landscape: 0 1rem;
              --padding--landscape: 0 1rem;
              --padding--portrait: 0rem 1rem 1rem 1rem;
            "
          >
            <p style="margin: 0;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>

            <div
              style="display: flex; align-items: center; margin: .8rem 0; font-size: .8rem;"
            >
              <span style="margin-right: 1rem;">Airey</span>
              <span style="opacity: var(--opacity);">1 hour ago</span>

              <label
                class="switch--heart"
                style="margin-left: auto; margin-right: .7rem;"
              >
                <input type="checkbox" /><span></span>
                <svg
                  style="--fill-color: #ed7a9b; --border-color: transparent; --shadow-color: transparent"
                >
                  <use xlink:href="#heart--flat"></use>
                </svg>
              </label>
              <span>13</span>
            </div>

            <div
              class="side-input-container portrait-only"
              style="--height: 2.6em;"
            >
              <textarea
                spellcheck="false"
                placeholder="Type here to reply to Airey..."
                style="
                  --width: calc(100% - 5em); 
                  --background: #f7f7f7;
                  --background--focus: #f0f0f0;
                  padding: .7em; 
                  border-radius: .3em;
                  color: rgba(0, 0, 0, .8);
                  "
              ></textarea>
              <button
                class="text"
                style="position: absolute; top: 0; right: 0; "
              >
                Send
              </button>
            </div>
          </div>

          <div
            class="responsive-margin responsive-padding responsive-border-radius"
            style="background: rgba(0, 0, 0, .03);"
          >
            <p style="margin: 0;">
              Lo rem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div
              style="display: flex; align-items: center; margin-top: .8rem; font-size: .8rem;"
            >
              <span style="margin-right: 1rem;">Airey</span>
              <span style="opacity: var(--opacity);">1 hour ago</span>
            </div>
          </div>
          <div
            class="responsive-margin responsive-padding responsive-border-radius"
            style="background: rgba(0, 0, 0, .03);"
          >
            <p style="margin: 0;">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div
              style="display: flex; align-items: center; margin-top: .8rem; font-size: .8rem;"
            >
              <span style="margin-right: 1rem;">Airey</span>
              <span style="opacity: var(--opacity);">1 hour ago</span>
            </div>
          </div>
          <div
            class="responsive-margin responsive-padding responsive-border-radius"
            style="background: rgba(0, 0, 0, .03);"
          >
            <p style="margin: 0;">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
            <div
              style="display: flex; align-items: center; margin-top: .8rem; font-size: .8rem;"
            >
              <span style="margin-right: 1rem;">Airey</span>
              <span style="opacity: var(--opacity);">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../scss/config.scss';
// Side input for reply dialog
.side-input-container {
  position: relative;
  width: 100%;
  > textarea {
    z-index: 1;
    outline: none;
    border: none;
    position: relative;
    width: 100%;
    height: var(--height);
    background: var(--background);
    transition: width 1s cubic-bezier(0.12, 0.87, 0.15, 1) 0.2s,
      background 1s cubic-bezier(0.12, 0.87, 0.15, 1) 0.2s;

    + * {
      height: var(--height);
      opacity: 0;
      transition: opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
    }
  }
  > textarea:focus {
    width: var(--width);
    background: var(--background--focus);
    + * {
      opacity: 1;
      transition-delay: 0s;
    }
  }
}
</style>
