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
export const API_URL = process.env.VUE_APP_API_URL;

if (NODE_ENV !== 'production') {
  // eslint-disable-next-line no-console
  console.log(NODE_ENV, API_URL, BASE_URL);
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
  { key: '2015-2016学年2学期', name: '2015-2016学年2学期', jsonFileName: 'lessons_202_2015-2016_spring.json' },
  { key: '2015-2016学年暑期学期', name: '2015-2016学年暑期学期', jsonFileName: 'lessons_222_2015-2016_summer.json' },
  { key: '2016-2017学年1学期', name: '2016-2017学年1学期', jsonFileName: 'lessons_242_2016-2017_fall.json' },
  { key: '2016-2017学年2学期', name: '2016-2017学年2学期', jsonFileName: 'lessons_243_2016-2017_spring.json' },
  { key: '2016-2017学年暑期学期', name: '2016-2017学年暑期学期', jsonFileName: 'lessons_262_2016-2017_summer.json' },
  { key: '2017-2018学年1学期', name: '2017-2018学年1学期', jsonFileName: 'lessons_263_2017-2018_fall.json' },
  { key: '2017-2018学年2学期', name: '2017-2018学年2学期', jsonFileName: 'lessons_264_2017-2018_spring.json' },
  { key: '2017-2018学年暑期学期', name: '2017-2018学年暑期学期', jsonFileName: 'lessons_287_2017-2018_summer.json' },
  { key: '2018-2019学年1学期', name: '2018-2019学年1学期', jsonFileName: 'lessons_284_2018-2019_fall.json' },
  { key: '2018-2019学年2学期', name: '2018-2019学年2学期', jsonFileName: 'lessons_285_2018-2019_spring.json' },
  { key: '2018-2019学年暑期学期', name: '2018-2019学年暑期学期', jsonFileName: 'lessons_304_2018-2019_summer.json' },
  { key: '2019-2020学年1学期', name: '2019-2020学年1学期', jsonFileName: 'lessons_324_2019-2020_fall.json' },
  { key: '2019-2020学年2学期', name: '2019-2020学年2学期', jsonFileName: 'lessons_325_2019-2020_spring.json' },
  { key: '2019-2020学年暑期学期', name: '2019-2020学年暑期学期', jsonFileName: 'lessons_327_2019-2020_summer.json' },
  { key: '2020-2021学年1学期', name: '2020-2021学年1学期', jsonFileName: 'lessons_344_2020-2021_fall.json' },
];

// export const semesterNameArray = semesterArray.map((x) => x.name);

// export const jsonNameArray = semesterArray.map((x) => x.jsonFileName);
