import { PlacementType, Position } from '../types';

/**
 * 计算悬浮元素相对视口的偏移量
 * @param current 悬浮元素
 * @param target 定位点元素
 * @param position 相对位置类型
 * @param offset 悬浮元素与定位点元素距离
 * @param adjustPlacement 对于超出视口边界的情况，是否尽量通过调整位置限制在视口内
 */
export function calculatePosition(
  current: HTMLElement | undefined,
  target: HTMLElement | undefined,
  placement: PlacementType,
  offset = 8,
  adjustPlacement = true,
): Position {
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

  // 视口边界处理
  if (adjustPlacement) {
    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }
    if (x > document.body.clientWidth - currentBox.width) {
      x = document.body.clientWidth - currentBox.width;
    }
    if (y > document.body.clientHeight - currentBox.height) {
      y = document.body.clientHeight - currentBox.height;
    }
  }

  return {
    x, y,
  };
}

export const placement2ArrowClassName = {
  top: 'left-1/2 bottom-0',
  left: 'right-0 top-1/2',
  right: 'left-0 top-1/2',
  bottom: 'left-1/2 top-0',
  topLeft: 'left-4 bottom-0',
  topRight: 'right-4 bottom-0',
  bottomLeft: 'left-4 top-0',
  bottomRight: 'right-4 top-0',
  leftTop: 'right-0 top-4',
  leftBottom: 'right-0 bottom-4',
  rightTop: 'left-0 top-4',
  rightBottom: 'left-0 top-4',
};
