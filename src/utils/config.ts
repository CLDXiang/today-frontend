/**
 * 如何配置本地 API_URL?
 *
 * 在项目根目录添加 .env.local 文件, 并写入
 *
 * VUE_APP_API_URL=http://localhost:3000
 *
 * 其中 3000 是后端的默认端口
 * 参见 https://cli.vuejs.org/guide/mode-and-env.html#modes
 */
export const { NODE_ENV, BASE_URL } = process.env;

if (NODE_ENV !== 'production') {
  // eslint-disable-next-line no-console
  console.log(NODE_ENV, BASE_URL);
}

interface semesterItem {
  /** 后端 key */
  key: string;
  /** 展示用名称 */
  name: string;
  /** 对应 JSON 文件名 */
  jsonFileName: string;
}

// 后端保存的学期名：前端展示的学期名
export const semesterArray: semesterItem[] = [
  { key: '2015-2016学年2学期', name: '2015-2016学年2学期', jsonFileName: 'lessons_202.json' },
  { key: '2015-2016学年暑期学期', name: '2015-2016学年暑期学期', jsonFileName: 'lessons_222.json' },
  { key: '2016-2017学年1学期', name: '2016-2017学年1学期', jsonFileName: 'lessons_242.json' },
  { key: '2016-2017学年2学期', name: '2016-2017学年2学期', jsonFileName: 'lessons_243.json' },
  { key: '2016-2017学年暑期学期', name: '2016-2017学年暑期学期', jsonFileName: 'lessons_262.json' },
  { key: '2017-2018学年1学期', name: '2017-2018学年1学期', jsonFileName: 'lessons_263.json' },
  { key: '2017-2018学年2学期', name: '2017-2018学年2学期', jsonFileName: 'lessons_264.json' },
  { key: '2017-2018学年暑期学期', name: '2017-2018学年暑期学期', jsonFileName: 'lessons_287.json' },
  { key: '2018-2019学年1学期', name: '2018-2019学年1学期', jsonFileName: 'lessons_284.json' },
  { key: '2018-2019学年2学期', name: '2018-2019学年2学期', jsonFileName: 'lessons_285.json' },
  { key: '2018-2019学年暑期学期', name: '2018-2019学年暑期学期', jsonFileName: 'lessons_304.json' },
  { key: '2019-2020学年1学期', name: '2019-2020学年1学期', jsonFileName: 'lessons_324.json' },
  { key: '2019-2020学年2学期', name: '2019-2020学年2学期', jsonFileName: 'lessons_325.json' },
  { key: '2019-2020学年暑期学期', name: '2019-2020学年暑期学期', jsonFileName: 'lessons_327.json' },
  { key: '2020-2021学年1学期', name: '2020-2021学年1学期', jsonFileName: 'lessons_344.json' },
  { key: '2020-2021学年2学期', name: '2020-2021学年2学期', jsonFileName: 'lessons_364.json' },
];

// export const semesterNameArray = semesterArray.map((x) => x.name);

// export const jsonNameArray = semesterArray.map((x) => x.jsonFileName);

/** 用作 Tab 页标题的 lectures 类型 */
export type LectureType = '七模' | '思政' | '外语' | '体育';

/** 将前端 lectures 所属 Tabs 映射为后端的 categories 字段数组 */
export const lectureType2Categories = (type: LectureType) => {
  switch (type) {
    case '七模':
      return ['一模', '二模', '三模', '四模', '五模', '六模', '七模'];
    case '思政':
      return ['思政 (A组)', '思政 (B组)'];
    case '外语':
      return ['通用英语', '专用英语', '英语文化', '二外'];
    case '体育':
      return ['体育'];
    default:
      return [];
  }
};
