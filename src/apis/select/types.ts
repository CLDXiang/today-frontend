interface TimeSlotDto {
  /** 时间段编号（仅对该课程） */
  id: number;
  /** 时间段编号（全局） */
  aid: number;
  /** 课程 ID */
  cid: number;
  /** 星期 */
  day: number;
  /** 节次 */
  section: string;
  /** 上课地点 */
  place: string;
  /** 教室容量 */
  capacity: string;
  /** 起止周 */
  week: string;
  /** 教师 */
  teacher: string[];
}

/** 原始 lesson 数据体 */
export interface LessonItemDto {
  /** Lesson ID */
  id: string;
  /** 课程代码 */
  code: string;
  /** 完整课程代码 */
  codeFull: string;
  /** 教师 */
  taughtBy: string;
  /** 学期 */
  semester: string;
  /** 课程名 */
  name: string;
  /** 学分 */
  credit: number;
  /** 开课院系 */
  department: string;
  /** 校区 */
  campus: string;
  /** 语言 */
  language: string;
  /** 注意事项 */
  remark: string;
  /** 考试形式 */
  examType: string;
  /** 考试时间 */
  examTime: string;
  /** 期中是否允许退课 */
  withdrawable: string;
  /** 三轮选课是否限制 */
  r3limit: string;
  /** 上课时间 */
  timeSlot: TimeSlotDto;
  /** 人数限制 */
  maxStudent: number;
  /** 公选人数 */
  maxPublic: number;
  /** 当前选课人数 */
  curStudent: number;
}
