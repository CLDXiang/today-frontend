// see https://blog.morizyun.com/javascript/library-typescript-dotenv-environment-variable.html
import * as dotenv from 'dotenv';

dotenv.config();
let path;
let api_url;
let base_url;
switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../../.env.test`;
    break;
  case 'production':
    path = `${__dirname}/../../.env.production`;
    api_url = 'https://dev.fudan.today/api';
    base_url = 'https://dev.fudan.today/';
    break;
  default:
    api_url = 'http://localhost:3000';
    base_url = 'http://localhost:8080';
    path = `${__dirname}/../../.env`;
}
// eslint-disable-next-line
console.log(path, process.env);
dotenv.config({ path });

// eslint-disable-next-line
console.log(path);

export const API_URL = process.env.API_URL || api_url;
export const BASE_URL = process.env.BASE_URL || base_url;
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
