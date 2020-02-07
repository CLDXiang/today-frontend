
// see https://blog.morizyun.com/javascript/library-typescript-dotenv-environment-variable.html
import * as dotenv from 'dotenv';

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../../.env.test`;
    break;
  case 'production':
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env`;
}
dotenv.config({ path });

export const API_URL = process.env.API_URL || 'http://localhost:3000';
export const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';
