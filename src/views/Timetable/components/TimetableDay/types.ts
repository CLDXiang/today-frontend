/** 课时数据（Column 用） */
export interface SectionInColumn {
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
  /** 上课地点 */
  place: string;
  /** 上课周数组 */
  weeksArray: string[];
}

/** 列数据 */
export type Column = (number | SectionInColumn)[];
