/* eslint-disable camelcase */
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

/** 课程搜索索引项 - 开课时间段 */
export interface SearchIndexItemTimeSlot {
  /** 起止周 */
  week: string;
  /** 星期 */
  day: number;
  /** 节次 */
  section: [number, number];
  /** 上课地点 */
  place: string;
  /** 星期（汉字） */
  dayText: string;
}

/** 课程搜索索引项 */
export interface SearchIndexItem {
  /** 课程名 */
  name: string;
  /** 授课教师 */
  teachers: string[];
  /** 开课院系 */
  department: string;
  /** 上课时间段 */
  timeSlots: SearchIndexItemTimeSlot[];
  /** 课程序号 */
  codeId: string;
  /** 课程 Id */
  courseId: number;
  /** 授课教师（字符串化） */
  teachersText: string;
  /** 上课时间段（字符串化） */
  timeSlotsTexts: string[];
}

/** 课时数据 */
export interface Section extends RawCourse {
  /** 当前课时数据 */
  currentSlot: RawTimeSlot;
}

/** 课时 key 到课时数据映射集 */
export type Sections = { [key: string]: Section };

/** 课程详情信息（展示用） - 上课时间段 */
export interface CourseDetailInfoTimeSlot {
  /** 起止周 */
  week: string;
  /** 星期 */
  day: string;
  /** 节次 */
  section: [number, number];
  /** 上课地点 */
  place: string;
  /** 授课教师 */
  teachers: string;
}

/** 课程详情信息（展示用） */
export interface CourseDetailInfo {
  /** 课程序号 */
  codeId: string;
  /** 课程名称 */
  name: string;
  /** 学分 */
  credit: number;
  /** 周课时数 */
  sectionCount: number;
  /** 人数上限 */
  maxStudent: number;
  /** 开课院系 */
  department: string;
  /** 校区 */
  campus: string;
  /** 备注 */
  remark: string;
  /** 考试时间 */
  examTime: string;
  /** 考试类型 */
  examType: string;
  /** 是否允许期中退课 */
  drop: string;
  /** 开课时间段 */
  timeSlots: CourseDetailInfoTimeSlot[];
  /** 授课教师 */
  teachers: string;
}

/** 课时数据（Column 用） */
export interface SectionInColumn extends Section {
  /** 节次数组 */
  sectionsArray: number[];
}

/** 列数据 */
export type Column = (number | SectionInColumn)[];

/** 已选课程列表项 */
export interface SelectedCourse {
  /** lesson Id */
  id: number;
  /** 课程名称 */
  name: string;
  /** 授课教师 */
  teachers: string[];
  /** 课程代码 */
  code: string;
}
