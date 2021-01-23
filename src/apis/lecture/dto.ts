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

/** 列表页 Lecture 项 */
export type LectureItem = LectureType;

export interface GetLecturesRespDto {
  /** 返回信息（非 200 时给用户看的） */
  msg?: string;
  /** 课程列表 */
  data: LectureItem[];
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
    timeSlot: JSON;
    maxStudent: number;
  };
  /** 难易程度 */
  /** 拉取条数 */
  limit: number;
  difficulty: number;
  /** 给分好坏 */
  nice: number;
  /** 工作量 */
  workload: number;
  /** 当前用户是否点评（仅有草稿返回 false） */
  rated: boolean;
  /** 当前用户是否关注 */
  watched: boolean;
  /** 当前用户对该课程的点评 Id（包括草稿） */
  ratingId?: string;
}

export interface GetLecturesIdRespDto {
  /** 返回信息（非 200 时给用户看的） */
  msg?: string;
  /** 课程信息 */
  data: LectureDetail;
}
