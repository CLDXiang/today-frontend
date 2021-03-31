/* eslint-disable @typescript-eslint/no-explicit-any */
/* Refer: https://github.com/vueComponent/ant-design-vue/blob/next/components/_util/props-util/index.js */
import {
  Fragment, Comment, Text, VNode, cloneVNode,
} from 'vue';
import { AnimationType } from './types';

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

/** Transition 所用动画类名 */
export function mapAnimationToTransitionClassNames(animation: AnimationType): {
  enterActive: string;
  enterFrom: string;
  enterTo: string;
  leaveActive: string;
  leaveFrom: string;
  leaveTo: string;
} {
  switch (animation) {
    case 'scale':
      return {
        enterActive: 'transition ease-out duration-150 transform',
        enterFrom: 'opacity-0 scale-50',
        enterTo: 'opacity-100 scale-100',
        leaveActive: 'transition ease-in duration-100 transform',
        leaveFrom: 'opacity-100 scale-100',
        leaveTo: 'opacity-0 scale-50',
      };
    case 'expandFromTop':
      return {
        enterActive: 'transition ease-out duration-150 transform origin-top',
        enterFrom: 'opacity-0 scale-y-50',
        enterTo: 'opacity-100 scale-y-100',
        leaveActive: 'transition ease-in duration-100 transform origin-top',
        leaveFrom: 'opacity-100 scale-100',
        leaveTo: 'opacity-0 scale-50',
      };
    case 'expandFromBottom':
      return {
        enterActive: 'transition ease-out duration-150 transform origin-bottom',
        enterFrom: 'opacity-0 scale-y-50',
        enterTo: 'opacity-100 scale-y-100',
        leaveActive: 'transition ease-in duration-100 transform origin-bottom',
        leaveFrom: 'opacity-100 scale-100',
        leaveTo: 'opacity-0 scale-50',
      };
    default: {
      return {
        enterActive: '',
        enterFrom: '',
        enterTo: '',
        leaveActive: '',
        leaveFrom: '',
        leaveTo: '',
      };
    }
  }
}
