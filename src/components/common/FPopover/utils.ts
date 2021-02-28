/* eslint-disable @typescript-eslint/no-explicit-any */
/* Refer: https://github.com/vueComponent/ant-design-vue/blob/next/components/_util/props-util/index.js */
import {
  Fragment, Comment, Text, VNode, cloneVNode,
} from 'vue';
import { PlacementType, Position } from './types';

/** 判断 VNode 是否为空 */
function isEmptyElement(c: VNode) {
  return (
    c.type === Comment
    || (c.type === Fragment && c.children?.length === 0)
    || (c.type === Text && (c.children as string).trim() === '')
  );
}

/** 过滤 VNode 序列，返回不为空的 VNode */
function filterEmpty(children: VNode[] = []) {
  const res: VNode[] = [];
  children.forEach((child) => {
    if (Array.isArray(child)) {
      res.push(...child);
    } else if (child.type === Fragment) {
      res.push(...(child.children as VNode[]));
    } else {
      res.push(child);
    }
  });
  return res.filter((c) => !isEmptyElement(c));
}

/** 封装 Vue.cloneVNode */
export function cloneElement(vNode?: VNode, nodeProps = {}, mergeRef = false) {
  let ele = vNode;
  if (Array.isArray(vNode)) {
    [ele] = filterEmpty(vNode);
  }
  if (!ele) {
    return null;
  }
  const node = cloneVNode(ele, nodeProps, mergeRef);

  node.props = { ...node.props, ...nodeProps };
  return node;
}

/** 封装 addEventListener，提供 remove 方法 */
export function addEventListener(
  target: Document | HTMLElement,
  eventType: any,
  cb: (this: HTMLElement, ev: any) => any,
) {
  if (target.addEventListener) {
    target.addEventListener(eventType, cb);
  }
  return {
    remove: () => {
      if (target.removeEventListener) {
        target.removeEventListener(eventType, cb);
      }
    },
  };
}

/**
 * 计算悬浮元素相对视口的偏移量
 * @param current 悬浮元素
 * @param target 定位点元素
 * @param position 相对位置类型
 * @param offset 悬浮元素与定位点元素距离
 */
export function calculatePosition(
  current: HTMLElement | null,
  target: HTMLElement | null,
  placement: PlacementType,
  offset = 8,
): Position {
  // TODO: 视口边界的处理
  // TODO: 能不能用被注释掉的方式而非 transform 实现？现在存在的问题是调用这个函数的时候 current 还没有被渲染，得到的 width, height 都是 0

  let translateX = '0';
  let translateY = '0';

  if (!target) {
    return {
      x: 0, y: 0, translateX, translateY,
    };
  }

  const targetBox = target.getBoundingClientRect();
  let { x, y } = targetBox;
  if (!current) {
    return {
      x, y, translateX, translateY,
    };
  }

  // const currentBox = {
  //   x: current.clientLeft,
  //   y: current.clientTop,
  //   width: current.clientWidth,
  //   height: current.clientHeight,
  // };

  switch (placement) {
    case 'top': {
      // x += targetBox.width / 2 - currentBox.width / 2;
      // y += -currentBox.height - offset;
      x += targetBox.width / 2;
      y += -offset;
      translateX = '-50%';
      translateY = '-100%';
      break;
    }
    case 'left': {
      // x += -currentBox.width - offset;
      // y += -targetBox.height / 2 + currentBox.height / 2;
      x += -offset;
      y += -targetBox.height / 2;
      translateX = '-100%';
      translateY = '50%';
      break;
    }
    case 'right': {
      // x += +targetBox.width + offset;
      // y += -targetBox.height / 2 + currentBox.height / 2;
      x += +targetBox.width + offset;
      y += -targetBox.height / 2;
      translateY = '50%';
      break;
    }
    case 'bottom': {
      // x += targetBox.width / 2 - currentBox.width / 2;
      // y += targetBox.height + offset;
      x += targetBox.width / 2;
      y += targetBox.height + offset;
      translateX = '-50%';
      break;
    }
    case 'topLeft': {
      // y += -currentBox.height - offset;
      y += -offset;
      translateY = '-100%';
      break;
    }
    case 'topRight': {
      // x += -currentBox.width + targetBox.width;
      // y += -currentBox.height - offset;
      x += targetBox.width;
      y += -offset;
      translateX = '-100%';
      translateY = '-100%';
      break;
    }
    case 'bottomLeft': {
      y += targetBox.height + offset;
      break;
    }
    case 'bottomRight': {
      // x += -currentBox.width + targetBox.width;
      // y += targetBox.height + offset;
      x += targetBox.width;
      y += targetBox.height + offset;
      translateX = '-100%';
      break;
    }
    case 'leftTop': {
      // x += -currentBox.width - offset;
      x += -offset;
      translateX = '-100%';
      break;
    }
    case 'leftBottom': {
      // x += -currentBox.width - offset;
      // y += -currentBox.height + targetBox.height;
      x += -offset;
      y += targetBox.height;
      translateX = '-100%';
      translateY = '-100%';
      break;
    }
    case 'rightTop': {
      x += +targetBox.width + offset;
      break;
    }
    case 'rightBottom': {
      // x += +targetBox.width + offset;
      // y += -currentBox.height + targetBox.height;
      x += +targetBox.width + offset;
      y += targetBox.height;
      translateY = '-100%';
      break;
    }
    default: break;
  }
  return {
    x, y, translateX, translateY,
  };
}
