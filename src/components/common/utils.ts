/* eslint-disable @typescript-eslint/no-explicit-any */
/* Refer: https://github.com/vueComponent/ant-design-vue/blob/next/components/_util/props-util/index.js */
import {
  Fragment, Comment, Text, VNode, cloneVNode,
} from 'vue';

function isEmptyElement(c: VNode) {
  return (
    c.type === Comment
    || (c.type === Fragment && c.children?.length === 0)
    || (c.type === Text && (c.children as string).trim() === '')
  );
}

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
