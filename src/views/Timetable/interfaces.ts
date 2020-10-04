/** 原始上课时间段结构体（来自 JSON 文件） */
export interface RawTimeSlot {
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

/** 原始课程数据结构体（来自 JSON 文件） */
export interface RawCourse {
  /** 课程 ID */
  id: number;
  /** 课程序号 */
  code_id: string;
  /** 学期 */
  semester: string;
  /** 课程代码 */
  code: string;
  /** 课程名称 */
  name: string;
  /** 学分 */
  credit: number;
  /** 开课院系 */
  department: string;
  /** 校区 */
  campus: string;
  /** 授课语言 */
  language: string;
  /** 备注 */
  remark: string;
  /** 考试类型 */
  exam_type: string;
  /** 考试时间 */
  exam_time: string;
  /** 允许期中退课 */
  drop: string;
  /** 第三轮选课限制 */
  r3limit: string;
  /** 上课时间段 */
  time_slot: RawTimeSlot[];
  /** 人数上限 */
  max_student: number;
  /** 最大公选人数 */
  max_public: number;
  /** 实际选课人数 */
  cur_student: number;
}

/** 课程 ID 到数据映射集 */
export type AllCourses = { [id: number]: RawCourse };