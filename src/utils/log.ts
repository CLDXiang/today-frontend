/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NODE_ENV } from './config';

const logger = {
  log(...args: any[]) {
    if (NODE_ENV !== 'production') {
      console.log(...args);
    }
  },
  info(...args: any[]) {
    if (NODE_ENV !== 'production') {
      console.info(...args);
    }
  },
  error(...args: any[]) {
    if (NODE_ENV !== 'production') {
      console.error(...args);
    }
  },
};

export default logger;
