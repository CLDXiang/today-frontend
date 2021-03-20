import { Section } from '../../types';

/** 课时数据（Column 用） */
export interface SectionInColumn extends Section {
  /** 节次数组 */
  sectionsArray: number[];
}

/** 列数据 */
export type Column = (number | SectionInColumn)[];
