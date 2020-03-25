<template>
  <div>
    <label v-if="variant === 'heart'" class="switch--heart">
      <input type="checkbox" /><span></span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 23"
        style="--fill-color: #ed7a9b; --border-color: transparent; --shadow-color: transparent"
      >
        <g fill-rule="evenodd" fill="none" stroke-width="1" stroke="none">
          <g transform="translate(-300.000000, -101.000000)">
            <g transform="translate(300.000000, 101.000000)">
              <path
                d="M24.5,7 C24.5,3.41 21.59,0.5 18,0.5 C15.681,0.5 13.65,1.719 12.5,3.547 C11.35,1.719 9.319,0.5 7,0.5 C3.41,0.5 0.5,3.41 0.5,7 C0.5,7.169 0.513,7.334 0.525,7.5 L0.5,7.5 C0.5,16.5 11.5,22.5 12.5,22.5 C13.5,22.5 24.5,16.5 24.5,7.5 L24.475,7.5 C24.487,7.334 24.5,7.169 24.5,7"
                fill="var(--fill, #FF2C55)"
              />
              <path
                d="M-0.0002,7.0002 C-0.0002,6.7695512 0.0118609344,6.53610512 0.0351901669,6.29836913 C0.0948520269,5.69038637 0.98454279,5.6997967 1.03133137,6.3089054 C1.30920064,9.92629665 3.42292338,13.3148708 6.73061013,16.2471793 C8.97779027,18.2393346 11.9525171,20.0002 12.4998,20.0002 C13.0470829,20.0002 16.0218097,18.2393346 18.2689899,16.2471793 C21.5766766,13.3148708 23.6903994,9.92629665 23.9682686,6.3089054 C24.0150678,5.69965848 24.9050314,5.69044645 24.9644319,6.2985941 C24.9877475,6.53730178 24.9998,6.77058476 24.9998,7.0002 C24.9998,7.12130537 24.9954041,7.22990126 24.985131,7.37948746 C24.9947145,7.41814554 24.9998,7.45857888 24.9998,7.5002 C24.9998,11.6373125 22.8124471,15.4570184 19.2119347,18.7444427 C16.7287351,21.0117119 13.4145883,23.0002 12.4998,23.0002 C11.5850117,23.0002 8.27086491,21.0117119 5.78766532,18.7444427 C2.18715294,15.4570184 -0.0002,11.6373125 -0.0002,7.5002 C-0.0002,7.4577332 0.00509425482,7.41650294 0.0150587451,7.37713324 C0.00473433441,7.23044282 -0.0002,7.11771542 -0.0002,7.0002 Z"
                fill="var(--shadow, rgba(0, 0, 0, 0.24))"
                fill-rule="nonzero"
              />
              <path
                d="M24.5,7 C24.5,3.41 21.59,0.5 18,0.5 C15.681,0.5 13.65,1.719 12.5,3.547 C11.35,1.719 9.319,0.5 7,0.5 C3.41,0.5 0.5,3.41 0.5,7 C0.5,7.169 0.513,7.334 0.525,7.5 L0.5,7.5 C0.5,16.5 11.5,22.5 12.5,22.5 C13.5,22.5 24.5,16.5 24.5,7.5 L24.475,7.5 C24.487,7.334 24.5,7.169 24.5,7 Z"
                stroke="var(--border, #000000)"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </g>
        </g>
      </svg>
    </label>

    <label v-if="variant === 'edit'" class="action-switch--edit switch--edit">
      <input type="checkbox" /><span></span>

      <!-- SVGs -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-451.000000, -151.000000)">
            <g transform="translate(450.000000, 151.000000)">
              <path
                fill="var(--primary, #FFCC00)"
                d="M1.5,22.5 L3.493,15.525 L18.226,0.792 C18.615,0.403 19.246,0.403 19.635,0.792 L23.208,4.365 C23.597,4.754 23.597,5.385 23.208,5.774 L8.475,20.507 L1.5,22.5 Z"
              />
              <polygon
                fill="var(--secondary, #FFFFFF)"
                points="8.4902 20.4902 8.4802 20.5102 1.5002 22.5002 3.4902 15.5202 3.5102 15.5102"
              />
              <path
                fill="var(--eraser, #FF2C55)"
                d="M23.21,5.77 L21.99,6.99 L17.01,2.01 L18.23,0.79 C18.62,0.4 19.25,0.4 19.64,0.79 L23.21,4.36 C23.6,4.75 23.6,5.38 23.21,5.77"
              />
              <path
                d="M22.5590466,3.71574661 C22.7543088,3.52048446 23.0708912,3.52048446 23.2661534,3.71574661 L23.5611534,4.01074661 C24.1464155,4.59600876 24.1464155,5.54259124 23.5611414,6.12786539 L8.82814139,20.8598654 C8.76807719,20.9199255 8.69370239,20.9636938 8.61203339,20.9870412 L1.63703339,22.9810412 C1.25986726,23.0888647 0.911100702,22.7401933 1.01882137,22.3629977 L1.64082137,20.1849977 C1.68826643,20.0188638 1.81812023,19.8889969 1.98424943,19.8415352 L8.21266542,18.0621278 L22.5590466,3.71574661 Z"
                fill="var(--shadow, rgba(0, 0, 0, 0.24))"
              />
              <path
                d="M1.5,22.5 L3.493,15.525 L18.226,0.792 C18.615,0.403 19.246,0.403 19.635,0.792 L23.208,4.365 C23.597,4.754 23.597,5.385 23.208,5.774 L8.475,20.507 L1.5,22.5 Z"
                stroke="var(--border, #000000)"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21.9902,6.9902 L17.0102,2.0102"
                stroke="var(--border, #000000)"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.4902,20.4902 L3.5102,15.5102"
                stroke="var(--border, #000000)"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </g>
        </g>
      </svg>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    variant: {
      default: 'heart',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/config.scss';
// SVG Animation
$border-color--inactive: #777;

%svg-switch {
  display: inline-flex;
  position: relative;
  height: 1.4em;
  width: 1.4em;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  > svg {
    width: 1.4em;
    height: 1.4em;
  }
  > input {
    display: none;
  }

  > input ~ svg {
    --fill: var(--fill-color--inactive, transparent);
    --shadow: var(--shadow-color--inactive, transparent);
    --border: #{var(--border-color--inactive, $border-color--inactive)};
  }
  > input:checked ~ svg {
    --fill: var(--fill-color);
    --border: var(--border-color);
    --shadow: var(--shadow-color);
  }
}

// Heart Begin
$bubble-d: 2.3em; // bubble diameter
$bubble-r: 0.5 * $bubble-d; // bubble-radius
$particle-d: 0.3em;
$particle-r: 0.5 * $particle-d;

@mixin particles($k) {
  $shadow-list: ();
  $n-groups: 7;
  $group-base-angle: 360deg / $n-groups;
  $group-distr-r: (1 + $k * 0.25) * $bubble-r;
  $n-particles: 2;
  $particle-base-angle: 360deg / $n-particles;
  $particle-off-angle: 60deg; // offset angle from radius
  $spread-r: -$k * $particle-r;

  @for $i from 0 to $n-groups {
    $group-curr-angle: $i * $group-base-angle - 90deg;
    $xg: $group-distr-r * cos($group-curr-angle);
    $yg: $group-distr-r * sin($group-curr-angle);

    @for $j from 0 to $n-particles {
      $particle-curr-angle: $group-curr-angle +
        $particle-off-angle +
        $j *
        $particle-base-angle;
      $xs: $xg + $particle-d * cos($particle-curr-angle);
      $ys: $yg + $particle-d * sin($particle-curr-angle);

      $shadow-list: $shadow-list,
        $xs $ys 0 $spread-r hsl(($i + $j) * $group-base-angle, 100%, 75%);
    }
  }
  box-shadow: $shadow-list;
}

@mixin bubble($ext) {
  transform: scale(1);
  border-color: #cc8ef5;
  border-width: $ext;
}
@keyframes heart {
  0%,
  17.5% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes heart-wobble {
  0%,
  30% {
    transform: translate(-50%, -50%) scale(0);
  }
  60% {
    transform: translate(-50%, -50%) scale(1.3);
  }
  70% {
    transform: translate(-50%, -50%) scale(0.9);
  }
  80% {
    transform: translate(-50%, -50%) scale(1.05);
  }
  90% {
    transform: translate(-50%, -50%) scale(0.96);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
@keyframes bubble {
  0% {
    border-color: #e2264d;
    border-width: $bubble-r;
  }
  30% {
    border-color: #cc8ef5;
    border-width: $bubble-r;
  }
  40%,
  100% {
    border-color: rgba(#cc8ef5, 0.4);
    border-width: 0;
  }
}
@keyframes particles {
  0%,
  20% {
    opacity: 0;
  }
  25% {
    opacity: 1;
    @include particles(0);
  }
}

.switch--heart {
  color: #e2264d;
  position: relative;
  height: 1.4em;
  width: 1.4em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  > input {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    &:checked + * {
      color: #e2264d;
      animation: heart 1s cubic-bezier(0.17, 0.89, 0.32, 1.49);

      &:before,
      &:after {
        animation: inherit;
        animation-timing-function: ease-out;
      }

      &:before {
        will-change: transform, border-width, border-color;
        animation-name: bubble;
      }

      &:after {
        will-change: opacity, box-shadow;
        animation-name: particles;
      }
    }
  }

  > input + * {
    align-self: center;
    position: relative;
    color: #aab8c2;
    height: 1em;
    width: 1em;
    display: inline-block;
    transform: scale(0);

    &:before,
    &:after {
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      content: '';
    }
    // Ring
    &:before {
      box-sizing: border-box;
      margin: -$bubble-r;
      border: solid $bubble-r #e2264d;
      width: $bubble-d;
      height: $bubble-d;
    }
    // Particles
    &:after {
      margin: -$particle-r;
      width: $particle-d;
      height: $particle-d;
      @include particles(1);
    }
  }
  // Heart
  > input + * + * {
    color: currentColor;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1.4em;
    height: 1.4em;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    transform: translate(-50%, -50%);

    // FIXME: these are support for normal icon fonts
    //opacity: $disabled-opacity;
    //transition: opacity .2s;
    //> i { font-size: 1.3em; }
    --fill: var(--fill-color--inactive, transparent);
    --shadow: var(--shadow-color--inactive, transparent);
    --border: #{var(--border-color--inactive, $border-color--inactive)};
  }
  > input:checked + * + * {
    // FIXME: these are support for normal icon fonts
    //opacity: 1;
    animation: heart-wobble 1s ease-out;
    --fill: var(--fill-color);
    --border: var(--border-color);
    --shadow: var(--shadow-color);
  }
}

.switch--comment {
  @extend %svg-switch;
  > svg {
    fill: var(--border-color, currentColor);
  }
  > input + * {
    &::before,
    &::after {
      content: '';
      position: absolute;
      display: block;
      left: $small-spacing + 0.05em;
      width: 0;
      height: 1px;
      background: var(--border-color, currentColor);
      transition: width 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    }
    &::before {
      top: 0.8em;
      transition-duration: 1s;
    }
    &::after {
      top: 1.1em;
    }
  }
  > input:checked + * {
    &::before,
    &::after {
      transition: width 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    }
    &::before {
      width: 0.9em;
    }
    &::after {
      width: 0.8em;
      transition-delay: 0.2s;
    }
  }
}

$edit-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
@keyframes edit-animation {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  20% {
    transform: translate(100%, -25%) rotate(-45deg);
  }
  30% {
    transform: translate(100%, 5%) rotate(-65deg);
    animation-timing-function: $edit-timing-function;
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}
@keyframes edit-line-animation {
  0% {
    transform: translateX(100%) scaleX(0);
    animation-timing-function: $edit-timing-function;
  }
  100% {
    transform: translateX(0) scaleX(0.8);
  }
}

.switch--edit {
  // Customize
  //color: rgba(160, 0, 0, .8);
  $duration: 1s;
  @extend %svg-switch;
  > input ~ svg {
    //transform: translate(0, 0) rotate(0deg);
    //transition: transform .3s ease-out;
    fill: currentColor;
    transform-origin: left bottom;
    //opacity: $disabled-opacity;
    //transition: opacity .2s;
    --primary: var(--primary-color--inactive, transparent);
    --secondary: var(--secondary-color--inactive, transparent);
    --eraser: var(--eraser-color--inactive, transparent);
  }
  > input:checked ~ svg {
    //opacity: 1;
    animation: edit-animation $duration;
    --primary: var(--primary-color);
    --secondary: var(--secondary-color);
    --eraser: var(--eraser-color);
  }
  > input + * {
    position: absolute;
    height: 0.1em;
    width: 100%;
    top: 105%;
    left: 0%;
    background: var(--border-color, #2d213f);
    transform-origin: left center;
    transform: translateX(0) scaleX(0);
  }
  > input:checked + * {
    will-change: transform;
    animation: edit-line-animation 0.7 * $duration 0.3 * $duration;
    width: 0;
    transition: width 0.6 * $duration cubic-bezier(0.68, 0, 0.77, 0) 0.4 *
      $duration;
  }
}
</style>
