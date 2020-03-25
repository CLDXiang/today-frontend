<template>
  <!-- Header footer main layout -->
  <div class="hmf--dense">
    <!-- Landscape Top Bar -->
    <header class="landscape-only">
      <div style="height: 3em; align-items: center;">
        <span>TODAY</span>

        <span class="right-start search-span">
          <input
            type="text"
            id="spb"
            spellcheck="false"
            placeholder="Search..."
            onfocus="
            // Hack
            setTimeout(() => {this.selectionStart = this.selectionEnd;}, 1);
        "
          />
          <i></i>
          <span><a style="font-size: .9em;">Timetable</a></span>
          <span><a style="font-size: .9em;">Course</a></span>
          <span><a style="font-size: .9em;">Forum</a></span>
          <span><a style="font-size: .9em;" href="#signin">Login</a></span>
          <label class="search-span--trigger" for="spb"
            ><i class="material-icons">search</i></label
          >
        </span>
      </div>
    </header>

    <!-- Portrait Top Bar -->
    <input
      type="checkbox"
      v-model="openDropdown"
      class="hmf--fullscreen-trigger"
    />

    <header
      id="portrait-header"
      class="portrait-fixed portrait-only topbar"
      :class="{ 'topbar--hidden': !showTopbar && !openDropdown }"
    >
      <!-- header row 1 -->
      <div style="height: 3em; align-items: center;">
        <span>TODAY</span>
        <label class="switch--arrow right-start">
          <input type="checkbox" v-model="openDropdown" /><span></span>
        </label>
      </div>

      <!-- header row 2(dropdown box) -->
      <div
        style="height: calc(100vh - 3rem); display: flex; flex-direction: column; align-items: center;overflow-y: auto; padding-top: 0;"
      >
        <span
          class="search-span--portrait"
          spellcheck="false"
          style="
        font-size: 1rem;
        margin-right: 0;
        --slot-height: 2.5rem;
        --dropdown-height: calc(100vh - 5.5rem);
        "
        >
          <input type="text" placeholder="Search..." />
          <div>
            <div>
              <div>Data Structure</div>
              <div>Introduction to Algorithms</div>
              <div>Introduction to the Theory of Computation</div>

              <div>Compilers</div>
              <div>Operating System</div>

              <div>Pattern Recognition and Machine Learning</div>
              <div>Natural Language Processing</div>
              <div>Computer Vision</div>
            </div>
          </div>
        </span>

        <nav class="nav-menu--light" style="width: 100%; border: none;">
          <ul>
            <li><a>Timetable</a></li>
            <li><a>Course</a></li>
            <!-- Not a route, we should set id of signin in SignIn.vue -->
            <li><a href="#signin">Login</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <slot>
      The main page here
    </slot>

    <footer style="background-color: rgba(0, 0, 0, .03);">
      <div class="footer-row" style="/*max-width: 60em;*/">
        <div class="intro">
          Designed and Built by Mr. Foo<br />
          Powered by <a>Light Minimalism</a>
        </div>
        <div class="link">
          <a>F.A.Q</a>
          <a>Contact Us</a>
          <a>Join Us</a>
        </div>
      </div>

      <div class="footer-row">
        <div class="intro">Copyright © 2020 Today. All rights reserved.</div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    // Hide topbar automatically
    onScroll() {
      if (!this.timerOnScroll) {
        this.timerOnScroll = setTimeout(() => {
          this.timerOnScroll = null;
        }, this.delay);
        const thispos = window.pageYOffset;
        if (this.lastScrollPosition < thispos && thispos > 3 * 17)
          this.showTopbar = false;
        else this.showTopbar = true;
        this.lastScrollPosition = thispos;
      }
    },
  },
  data() {
    return {
      openDropdown: false,
      lastScrollPosition: 0,
      timerOnScroll: null,
      // 节流延迟，数值越小反应越灵敏，性能需求越高
      delay: 233,
      showTopbar: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/config.scss';
//@import '../../scss/responsive.scss';
.topbar--hidden {
  transform: translateY(-3rem) !important;
}
.topbar {
  top: 0;
  z-index: 11;
  width: 100%;
  transform: translateY(0);
}

@mixin nav-menu($line-height: 1.4em + $small-spacing) {
  & input {
    display: none;
  }

  & li {
    list-style: none;
    line-height: 1.4em;
  }
  & ul {
    padding-left: 2em;
  }

  & > ul {
    padding: 0;
    margin: 0;
  }

  //text & color & background
  & a,
  & input + label {
    white-space: nowrap; //FIX: force single line
    display: inline-block;
    padding: (($line-height)-1.4em)/2 ($line-height)-1.4em;
    text-decoration: none;
    outline: none;
    cursor: pointer;
  }
  // Support label in a
  & a > label {
    cursor: pointer;
  }

  //Collapse
  & li.section > input {
    & + label {
      & + ul {
        height: 0;
        //display: none;
        overflow: hidden;

        transition: height 0.7s cubic-bezier(0.23, 1, 0.32, 1);
      }
    }

    &:checked + label {
      & + ul {
        --line-height: #{$line-height};
        --eps: 0em;

        //height: auto;
        height: calc(var(--lines, 3) * var(--line-height) + var(--eps));
      }
    }
  }
}

//Landscape
nav.nav-menu {
  @include nav-menu;
  @include no-select;

  & a,
  & input + label {
    color: rgba(black, $inactive-opacity);
    &:hover {
      border-radius: 3px; //FIXME
      background-color: rgba(black, 0.04);
    }
  }
}
nav.nav-menu--light {
  @include nav-menu;
  @include no-select;
  color: black;

  & a,
  & input + label {
    color: currentColor;
    opacity: $high-emphasis-opacity;
    &:hover {
      opacity: $medium-emphasis-opacity;
    }
  }
}

//Portrait
@media (max-width: $break-width) {
  $line-height: 2.5em;
  nav.nav-menu,
  nav.nav-menu--light {
    @include nav-menu($line-height);

    border: 1px solid rgba(0, 0, 0, $divider-opacity);
    border-left: none;
    border-right: none;
    border-top: none;

    & ul,
    li {
      width: 100%;
      padding-left: 0;
    }

    label,
    a {
      display: block;
      width: 100%;
    }

    li.section a {
      text-indent: 2em;
    }

    //Apple's collapse effect
    & li.section > input + label + ul {
      //outer expand
      transition: height 0.5s cubic-bezier(0.28, 0.11, 0.32, 1) 0.4s;

      & > div {
        transform: translate3d(0, #{-$line-height * 6}, 0);
        opacity: 0;
        //inner expand
        transition: transform 0s cubic-bezier(0.23, 1, 0.32, 1) 0.9s,
          opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.2s;
      }
    }
    & li.section > input:checked + label + ul {
      //outer collapse
      transition-delay: 0.2s;

      & > div {
        transform: translate3d(0, 0, 0);
        opacity: 1;
        //inner collapse
        transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0.2s,
          opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.4s;
      }
    }
  }
}

%hmf--dense-bar {
  display: block;

  //dense
  > * {
    margin-left: auto;
    margin-right: auto;
  }

  overflow: hidden;

  //dense appbar
  > div {
    overflow: hidden;
    position: relative;
    width: 100%;

    display: flex;
    align-items: flex-end;

    padding: calc(#{$medium-spacing} - 0.2em) $medium-spacing;
    & > * {
      line-height: 1.4em;
      margin-right: $medium-spacing;
    }
    & > *:last-child {
      margin-right: 0;
    }

    & > span {
      font-size: 1.2em;
      color: rgba(black, $high-emphasis-opacity);
    }
    & > a {
      text-decoration: none;
      outline: none;
      cursor: pointer;

      font-size: 0.8em;
      color: black;
      opacity: $high-emphasis-opacity;

      &:hover {
        opacity: $inactive-opacity;
      }
    }
    & > button.icon {
      margin-top: -10px;
      margin-bottom: -10px;
    }
    & > button {
      line-height: 1em;
    }

    //usage
    & > .left-end {
      margin-right: auto;
    }
    & > .right-start {
      margin-left: auto;
    }
    & > .middle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

//Classic layout: header, main and footer
// Portrait
%hmf--base {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 100%;
    max-width: $main-width;
  }

  main > nav {
    padding: $medium-spacing;
    flex-shrink: 0; //no shrink
  }
  main > div {
    width: 100%;
  }

  header {
    color: white;
    background-color: currentcolor;

    border: 1px solid rgba(0, 0, 0, $divider-opacity);
    border-top: none;
    border-left: none;
    border-right: none;

    @extend %hmf--dense-bar;
  }

  footer {
    //TODO
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: rgba(black, $divider-opacity);
    //height: 5em;

    //dense footer
    > div {
      width: 100%;
    }

    //usage
    &.bar {
      @extend %hmf--dense-bar;
    }
    &.sticky-bar {
      @extend %hmf--dense-bar;
      position: sticky;
      bottom: 0;
      z-index: 10;

      color: white;
      background-color: currentColor;
      border: 1px solid rgba(0, 0, 0, $divider-opacity);
      border-bottom: none;
      border-left: none;
      border-right: none;
    }
  }
}

@mixin hmf--landscape {
  @extend %hmf--base;

  & > main {
    flex-direction: row;
    padding: $large-spacing 0;
  }
  //FIXME tune the width
  & > main > nav {
    width: 25%;
    padding: 0 $medium-spacing;
  }
  & > main > div {
    width: 75%;
    //padding: 0;

    //FIX
    > .mark > *:first-child {
      margin-top: 0;
    }
  }
}

@mixin hmf--portrait {
  @extend %hmf--base;
}

@mixin hmf--responsive {
  @extend %hmf--base;

  //desktop
  @media (min-width: $break-width) {
    & > main {
      flex-direction: row;
      padding: $large-spacing 0;
      justify-content: center;
    }
    //FIXME tune the width
    & > main > nav {
      width: 25%;
      padding: 0 $medium-spacing;
    }
    & > main > div {
      width: 75%;
      //padding: 0;
    }
  }
}

.hmf--landscape {
  @include hmf--landscape;
}
.hmf--portrait {
  @include hmf--portrait;
}
.hmf--responsive {
  @include hmf--responsive;
}

.hmf {
  @include hmf--responsive;
}
.hmf--dense {
  @include hmf--responsive;
  //Dense header and footer
  header > div,
  footer > div {
    max-width: $main-width;
  }
}

.hmf--fullscreen-trigger {
  display: none;
  & + * {
    height: 3rem;
    transition: height 0.5s cubic-bezier(0.28, 0.11, 0.32, 1) 0.4s,
      transform 0.3s ease; // Support auto hide
    //nav
    & > *:nth-child(2) > * {
      transform: translateY(-6 * 3rem);
      opacity: 0;
      transition: transform 0s cubic-bezier(0.23, 1, 0.32, 1) 0.9s,
        opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.2s;
    }
  }
  &:checked + * {
    height: 100vh;
    transition-delay: 0.2s;

    //nav
    & > *:nth-child(2) > * {
      transform: translateY(0);
      opacity: 1;
      transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0.2s,
        opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.4s;
    }
  }
}

.footer-row {
  font-size: 0.8em;
  line-height: 1.6em;

  display: flex;
  flex-direction: row;
  padding: 0 $small-spacing;
  &:first-child {
    padding-top: 1em;
  }
  &:last-child {
    padding-bottom: $small-spacing;
  }
  > * {
    flex-basis: 0;
    flex-grow: 1;
    margin: $small-spacing;
  }
  > .intro,
  > .copyright {
    opacity: $inactive-opacity;
  }
  > .link {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    > a {
      cursor: pointer;
      opacity: $high-emphasis-opacity;
      &:hover {
        opacity: $inactive-opacity;
      }
    }
  }

  //mobile
  @media (max-width: $break-width) {
    flex-direction: column;
    > .link {
      align-items: flex-start;
    }
    > * {
      flex-basis: auto;
    }
  }
}

// Header tookits
.search-span {
  position: relative;
  display: inline-flex;
  align-items: center;

  $icon-width: 0.5em;

  // Hidden search box
  > input {
    @include button2span;
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 0.8em;
    padding-left: $icon-width + $small-spacing;
  }
  > label {
    display: inline-flex;
  }
  // Hidden search icon
  > input + i {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    &::before {
      content: '';
      box-sizing: border-box;
      width: $icon-width;
      height: $icon-width;
      border-radius: 50%;
      border: 0.1em solid currentColor;
    }
  }

  // Animations
  // Hidden search bar
  > input,
  > input + i {
    opacity: 0;
    transform: translateX(-100px);
    //transition: transform 1s cubic-bezier(0.12, 0.87, 0.15, 1) .4s;
    transition: transform 1s cubic-bezier(0.12, 0.87, 0.15, 1) 0.4s,
      opacity 0s ease 0s;
  }
  > input:focus,
  > input:focus + i {
    opacity: $high-emphasis-opacity;
    transform: translateX(0);
    transition: transform 1s cubic-bezier(0.12, 0.87, 0.15, 1) 0.4s,
      opacity 0s ease 0.4s;
  }

  // Background menu item
  > input ~ span,
  > input ~ label {
    padding-right: $medium-spacing;
  }
  > input ~ label:last-child {
    padding-right: 0;
  }
  > input ~ span,
  > input ~ label {
    //color: black;
    font-size: 0.8em;
    cursor: pointer;

    opacity: 1;
    transform: scale(1);
    transition: opacity 0.1s ease 0.2s, transform 0.4s ease;
    > * {
      opacity: $high-emphasis-opacity;
      &:hover {
        opacity: $inactive-opacity;
      }
    }
  }
  > input:focus ~ span,
  > input:focus ~ label {
    pointer-events: none;
    opacity: 0;
    transform: scale(0.7);
    transition: opacity 0.2s cubic-bezier(0.2727, 0.0986, 0.8333, 1) 0.2s,
      transform 0.4s linear;
  }
}

.search-span--portrait {
  // Defined by user
  --nslots: 3;
  --slot-height: #{2 * $small-spacing + 1em};
  --dropdown-height: calc(100vh - 6rem);
  --border-color: none;

  @include button2span;

  height: var(--slot-height);
  position: relative;
  width: 100%;

  //text-align: left;

  // Font color
  color: rgba(black, $high-emphasis-opacity);

  // Background
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    background-color: currentColor;
    opacity: 0.06;
    pointer-events: none;
    border-radius: 0.2em;

    transition: transform 0.4s ease;
  }

  > input {
    display: inline-flex;
    align-items: center;

    height: var(--slot-height);
    width: 100%;
    padding: 0 1.4 * $small-spacing;
    padding: 0 1.1em;
    text-align: left;

    //border: 1px solid rgba(black, $divider-opacity);
    border: 1px solid var(--border-color);
    //background-color: rgba(black, .08);
    border-radius: 0.3em;
    transition: width 0.3s ease;
    + span {
      position: absolute;
      right: 0;
      top: 0;
      width: 2em;
      height: 2em;
    }
  }
  > div {
    @include button2span;

    display: block;
    width: 100%;
    overflow: hidden;
    background: white;
    border: 1px solid var(--border-color);
    border-top: none;

    > div {
      @include no-scrollbar;
      height: var(--dropdown-height, calc(var(--nslots) * var(--slot-height)));
      width: 100%;
      display: flex;
      flex-direction: column;
      > * {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        width: 100%;
        height: var(--slot-height);
        padding: $small-spacing 1.1em;
        color: black;
        opacity: $high-emphasis-opacity;
        &:hover {
          opacity: $inactive-opacity;
        }
      }
    }
  }

  & {
    z-index: 1;
    transition: z-index 0s 0.7s;
  }
  &:focus {
    z-index: 9;
    transition: z-index 0s 0s;
  }

  // Input animation
  & > input:focus,
  &:focus > input {
    outline: none;
    //width: calc(100% - 2em);
  }
  &:focus-within::before {
    transform: translate(-50%, -50%) scaleX(1.2);
  }

  // Dropdown Animation
  & > div {
    visibility: hidden;
    height: 0;
    opacity: 0;
    transform-origin: top center;
    transition: height 0s cubic-bezier(0.28, 0.11, 0.32, 1) 0.4s,
      opacity 0.2s 0.2s, visibility 0s 0.7s;
    > div {
      transform: translateY(-6 * 3rem);
      opacity: 0;
      transition: transform 0s cubic-bezier(0.23, 1, 0.32, 1) 0.2s,
        opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1);
    }
  }
  & > input:focus ~ div,
  &:focus > div {
    visibility: visible;
    opacity: 1;
    height: var(--dropdown-height, calc(var(--nslots) * var(--slot-height)));

    transition: height 0.5s cubic-bezier(0.28, 0.11, 0.32, 1), opacity 0s,
      visibility 0s;
    > div {
      transform: translateY(0);
      opacity: 1;
      transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1),
        opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.2s;
    }
  }
}

// The arrow trigger in the topbar
.switch--arrow {
  color: #333333;
  position: relative;
  > input {
    width: 1em;
    height: 1em;
    opacity: 0;
    cursor: pointer;
  }
  > input + * {
    pointer-events: none;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);

    &::before,
    &::after {
      content: '';
      position: absolute;
      box-sizing: content-box;
      top: 70%;
      width: 0.7em;
      height: 0.1em;
      background: currentColor;
    }
    &::before {
      right: 50%;
      transform-origin: 120% center;
      transform: rotate(40deg);
    }
    &::after {
      left: 50%;
      transform-origin: -20% center;
      transform: rotate(-40deg);
    }

    &,
    &::before,
    &::after {
      transition: transform 1s cubic-bezier(0.86, 0, 0.07, 1),
        transform-origin 1s cubic-bezier(0.86, 0, 0.07, 1),
        -webkit-transform 1s cubic-bezier(0.86, 0, 0.07, 1),
        -webkit-transform-origin 1s cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
  > input:checked + * {
    transform: translate(-50%, -100%);
    &::before {
      transform: rotate(-40deg);
    }
    &::after {
      transform: rotate(40deg);
    }
  }
}

// Fix a
a {
  color: inherit;
  text-decoration: none;
}
</style>
