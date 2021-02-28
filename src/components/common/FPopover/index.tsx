import {
  defineComponent, PropType, ref, Teleport, watch,
} from 'vue';
import log from '@/utils/log';
import { addEventListener, cloneElement, calculatePosition } from './utils';
import { PlacementType, Position } from './types';

export default defineComponent({
  props: {
    /** 触发方式 */
    trigger: { type: String as PropType<'hover' | 'click'>, default: 'hover' },
    /** 相对目标元素的位置 */
    placement: {
      type: String as PropType<PlacementType>,
      default: 'top',
    },
  },
  setup(props) {
    /** 是否可见 */
    const visible = ref(false);
    const setVisible = (value: boolean) => {
      visible.value = value;
    };

    const clickOutsideHandler = ref<{ remove:() => void } | null>(null);
    const touchOutsideHandler = ref<{ remove:() => void } | null>(null);

    const clearOutsideHandler = () => {
      if (clickOutsideHandler.value) {
        clickOutsideHandler.value.remove();
        clickOutsideHandler.value = null;
      }
      if (touchOutsideHandler.value) {
        touchOutsideHandler.value.remove();
        touchOutsideHandler.value = null;
      }
    };

    const defaultRef = ref<HTMLElement | null>(null);
    const contentRef = ref<HTMLElement | null>(null);
    /** 定位点 */
    const position = ref<Position>({
      x: 0,
      y: 0,
      translateX: '0',
      translateY: '0',
    });

    watch(defaultRef, () => {
      position.value = calculatePosition(contentRef.value, defaultRef.value, props.placement);
    });
    watch(contentRef, () => {
      position.value = calculatePosition(contentRef.value, defaultRef.value, props.placement);
    });

    const handleUpdate = () => {
      if (visible.value) {
        if (props.trigger === 'click') {
          if (!clickOutsideHandler.value) {
            clickOutsideHandler.value = addEventListener(document, 'mousedown', () =>
              setVisible(false));
          }
          if (!touchOutsideHandler.value) {
            touchOutsideHandler.value = addEventListener(document, 'touchstart', () =>
              setVisible(false));
          }
        }
      } else {
        clearOutsideHandler();
      }
    };

    return {
      visible,
      setVisible,
      clearOutsideHandler,
      handleUpdate,
      defaultRef,
      position,
      contentRef,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.handleUpdate();
    });
  },
  updated() {
    this.$nextTick(() => {
      this.handleUpdate();
    });
  },
  beforeUnmount() {
    this.clearOutsideHandler();
  },
  render() {
    const defaultSlots = this.$slots.default?.();
    if (!defaultSlots || defaultSlots.length > 1) {
      log.error('FPopover 必须有且仅有一个 default 子元素');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const defaultSlotsProps: Record<string, any> = {
      ref: 'defaultRef',
    };

    if (this.$props.trigger === 'click') {
      defaultSlotsProps.onClick = () => this.setVisible(!this.visible);
    } else if (this.$props.trigger === 'hover') {
      defaultSlotsProps.onMouseenter = () => this.setVisible(true);
      defaultSlotsProps.onMouseleave = () => this.setVisible(false);
    }
    const triggerNode = cloneElement(defaultSlots?.[0], defaultSlotsProps);

    return (
      <>
        {triggerNode}
        <Teleport to="body">
          <div
            ref="contentRef"
            onMousedown={(e) => { e.stopPropagation(); }}
            onTouchstart={(e) => { e.stopPropagation(); }}
            class={`absolute bg-pink-100 ${this.visible ? '' : 'hidden'}`}
            style={{
              left: `${this.position.x}px`,
              top: `${this.position.y}px`,
              transform: `translate(${this.position.translateX}, ${this.position.translateY})`,
            }}
          >
            {this.$slots.content?.()}
          </div>
        </Teleport>
      </>
    );
  },
});
