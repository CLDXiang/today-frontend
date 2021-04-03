import {
  defineComponent, PropType, ref, VNode, nextTick, watch, onMounted,
} from 'vue';
import { useWindowResize } from '@/composables';
import { calculatePosition, placement2ArrowClassName } from './utils';
import { PlacementType, Position } from '../types';

export const ContentWrapper = defineComponent({
  name: 'ContentWrapper',
  props: {
    /** 是否显示 */
    visible: { type: Boolean, required: true },
    /** 内容 VNode */
    content: { type: Object as PropType<VNode | undefined>, required: true },
    /** 挂载点 DOM */
    target: { type: Object as PropType<HTMLElement | undefined>, default: undefined },
    /** 相对挂载点的位置 */
    placement: {
      type: String as PropType<PlacementType>,
      required: true,
    },
    /** 对于超出视口边界的情况，是否尽量通过调整位置限制在视口内 */
    adjustPlacement: { type: Boolean, default: true },
  },
  setup(props) {
    const contentRef = ref<HTMLElement | undefined>(undefined);

    // TODO: target 移动时跟随移动
    /** 定位点 */
    const position = ref<Position>({ x: 0, y: 0 });

    onMounted(async () => {
      if (props.visible) {
        await nextTick();
        position.value = calculatePosition(contentRef.value, props.target, props.placement);
      }
    });

    watch(
      () => props.visible,
      async (value) => {
        if (value) {
          await nextTick();
          position.value = calculatePosition(contentRef.value, props.target, props.placement);
        }
      },
    );

    useWindowResize(() => {
      if (props.visible) {
        position.value = calculatePosition(contentRef.value, props.target, props.placement);
      }
    });

    return {
      position,
      contentRef,
    };
  },
  render() {
    return (
      <div
        v-show={this.visible}
        class="absolute"
        style={{
          left: `${this.position.x}px`,
          top: `${this.position.y}px`,
          zIndex: 23333,
        }}
      >
        <div
          ref="contentRef"
          onMousedown={(e) => {
            e.stopPropagation();
          }}
          onTouchstart={(e) => {
            e.stopPropagation();
          }}
          class="relative bg-white rounded-md shadow-popover"
        >
          <div
            class={`absolute bg-white w-2 h-2 transform origin-center rotate-45 -translate-x-1/2 -translate-y-1/2 ${
              placement2ArrowClassName[this.placement]
            }`}
          />
          {this.content}
        </div>
      </div>
    );
  },
});
