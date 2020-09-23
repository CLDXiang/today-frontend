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

export const ANONY_NAMES = [
  '光华楼',
  '一教',
  '二教',
  '三教',
  '四教',
  '五教',
  '六教',
  '西辅楼',
  '旦苑',
  '南食',
  '北食',
  '南小食',
  '光草',
  '校医院',
  '相辉堂',
  '校史馆',
  '正大',
  '菜地',
  '雪莱',
];

if (NODE_ENV !== 'production') {
  // eslint-disable-next-line no-console
  console.log(NODE_ENV, API_URL, BASE_URL);
}
