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

/**
 * 计算悬浮元素相对视口的偏移量
 * @param current 悬浮元素
 * @param target 定位点元素
 * @param position 相对位置类型
 * @param offset 悬浮元素与定位点元素距离
 */
export function calculatePosition(
  current: HTMLElement | undefined,
  target: HTMLElement | undefined,
  placement: PlacementType,
  offset = 8,
): Position {
  // TODO: 视口边界的处理

  if (!target) {
    return {
      x: 0, y: 0,
    };
  }

  const targetBox = target.getBoundingClientRect();
  let { x, y } = targetBox;
  if (!current) {
    return {
      x, y,
    };
  }

  const currentBox = {
    x: current.clientLeft,
    y: current.clientTop,
    width: current.clientWidth,
    height: current.clientHeight,
  };

  switch (placement) {
    case 'top': {
      x += targetBox.width / 2 - currentBox.width / 2;
      y += -currentBox.height - offset;
      break;
    }
    case 'left': {
      x += -currentBox.width - offset;
      y += -targetBox.height / 2 + currentBox.height / 2;
      break;
    }
    case 'right': {
      x += +targetBox.width + offset;
      y += -targetBox.height / 2 + currentBox.height / 2;
      break;
    }
    case 'bottom': {
      x += targetBox.width / 2 - currentBox.width / 2;
      y += targetBox.height + offset;
      break;
    }
    case 'topLeft': {
      y += -currentBox.height - offset;
      break;
    }
    case 'topRight': {
      x += -currentBox.width + targetBox.width;
      y += -currentBox.height - offset;
      break;
    }
    case 'bottomLeft': {
      y += targetBox.height + offset;
      break;
    }
    case 'bottomRight': {
      x += -currentBox.width + targetBox.width;
      y += targetBox.height + offset;
      break;
    }
    case 'leftTop': {
      x += -currentBox.width - offset;
      break;
    }
    case 'leftBottom': {
      x += -currentBox.width - offset;
      y += -currentBox.height + targetBox.height;
      break;
    }
    case 'rightTop': {
      x += +targetBox.width + offset;
      break;
    }
    case 'rightBottom': {
      x += +targetBox.width + offset;
      y += -currentBox.height + targetBox.height;
      break;
    }
    default: break;
  }
  return {
    x, y,
  };
}
