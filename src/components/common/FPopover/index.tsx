import {
  defineComponent, PropType, ref, Teleport, VNode, Transition,
} from 'vue';
import log from '@/utils/log';
import { addEventListener } from '@/utils/dom';
import { cloneElement } from './utils';
import { PlacementType } from './types';
import { ContentWrapper } from './components';

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

    const defaultRef = ref<HTMLElement | undefined>(undefined);

    const handleUpdate = () => {
      // if (visible.value) {
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
      // } else {
      //   clearOutsideHandler();
      // }
    };

    return {
      visible,
      setVisible,
      clearOutsideHandler,
      handleUpdate,
      defaultRef,
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
          <Transition
            enter-active-class="transition ease-out duration-150 transform"
            enter-from-class="opacity-0 scale-50"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-100 transform"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-50"
          >
            <ContentWrapper
              visible={this.visible}
              content={this.$slots.content?.() as (VNode | undefined)}
              target={this.defaultRef}
              placement={this.placement}
            />
          </Transition>
        </Teleport>
      </>
    );
  },
});
