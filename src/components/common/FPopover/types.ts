/** 相对位置 */
export type PlacementType =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

/** 位置坐标 */
export interface Position { x: number, y: number }

/** 显隐动画类型
 * @scale 默认，显示时从小到大，隐藏时从大到小
 * @expandFromTop 显示时顶部向下展开，隐藏时从下向顶部收起
 * @expandFromBottom 显示时底部向下展开，隐藏时从下向底部收起
 */
export type AnimationType = 'scale' | 'expandFromTop' | 'expandFromBottom';
