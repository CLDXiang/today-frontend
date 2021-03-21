import { Section } from '../../types';

/** 课时数据（Column 用） */
export interface SectionInColumn extends Section {
  /** 课程 Id */
  id: number;
  /** 课程代码 */
  code: string;
  /** 课程序号 */
  codeId: string;
  /** 课程名 */
  name: string;
  /** 节次数组 */
  sectionsArray: number[];
  /** 上课地点及对应上课周 */
  place2WeeksArray: Record<string, string[]>;
}

/** 列数据 */
export type Column = (number | SectionInColumn)[];
