/** Lecture 通用 */
export interface LectureType {
  /** Lecture ID */
  id: string;
  /** 课程代码 */
  code: string;
  /** 教师 */
  taughtBy: string[];
  /** 课程名 */
  name: string;
  /** 类别 */
  category: string;
  /** 评课数 */
  rateCount: number;
  /** 收藏数 */
  starCount: number;
  /** 推荐指数 */
  recommended: number;
  /** 当前用户是否收藏 */
  starred: boolean;
}

interface TimeSlot {
  /** time_slot ID 每个 lesson 均从零开始计数 */
  id: number;
  /** activity ID */
  aid: number;
  /** lesson ID */
  cid: number;
  /** 开课时间（星期），1-7 */
  day: number;
  /** 开课时间（时段），“6-7”，即 6-7 节课 */
  section: string;
  /** 开课地点，“H6208” */
  place: string;
  /** 教室容量， “45” */
  capacity: string;
  /** 开课周（横跨时间），“1-16”，即 1-16 周 */
  week: string;
  /** 任课老师，["郑志坚", "王祥荣", "樊正球", "王寿兵", "周立国"] */
  teacher: string[];
}

/** Lecture 详情页项 */
export interface LectureDetail extends LectureType {
  /** 其他课程基本信息 */
  detailInfo: {
    /** 学分数 */
    credit: number;
    /** 学院 */
    department: string;
    /** 校区 */
    campus: string;
    /** 授课语言 */
    language: string;
    /** 备注 */
    remark: string;
    /** 考试类型 */
    examType: string;
    /** 考试时间 */
    examTime: string;
    /** 是否可以期中退课 */
    withdrawable: string;
    /** 三轮选课限制 */
    r3limit: string;
    /** 开课时间信息 */
    timeSlot: TimeSlot[];
    /** 最大选课人数 */
    maxStudent: number;
  };
  /** 难易程度 */
  difficulty: number;
  /** 给分好坏 */
  nice: number;
  /** 工作量 */
  workload: number;
  /** 当前用户是否点评（仅有草稿返回 false） */
  rated: boolean;
  /** 当前用户是否关注 */
  watched: boolean;
}

/** 列表页 Lecture 项 */
export type LectureItem = LectureType;
