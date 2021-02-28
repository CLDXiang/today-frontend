import {
  defineComponent, PropType, ref, computed, VNode,
} from 'vue';
import { calculatePosition } from '../utils';
import { PlacementType } from '../types';

export const ContentWrapper = defineComponent({
  props: {
    /** 是否显示 */
    visible: { type: Boolean, required: true },
    /** 内容 VNode */
    content: { type: Object as PropType<VNode | undefined>, required: true },
    /** 挂载点 DOM */
    target: { type: Object as PropType<HTMLElement | null>, required: true },
    /** 相对挂载点的位置 */
    placement: {
      type: String as PropType<PlacementType>,
      required: true,
    },
  },
  setup(props) {
    const contentRef = ref<HTMLElement | null>(null);

    /** 定位点 */
    const position = computed(() =>
      calculatePosition(contentRef.value, props.target, props.placement));

    return {
      position,
      contentRef,
    };
  },
  render() {
    return (
      <div
        v-show={this.visible}
        ref="contentRef"
        onMousedown={(e) => {
          e.stopPropagation();
        }}
        onTouchstart={(e) => {
          e.stopPropagation();
        }}
        class="absolute bg-white rounded-md shadow-popover"
        style={{
          left: `${this.position.x}px`,
          top: `${this.position.y}px`,
          transform: `translate(${this.position.translateX}, ${this.position.translateY})`,
        }}
      >
        {this.content}
      </div>
    );
  },
});
