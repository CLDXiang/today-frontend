// eslint-disable @typescript-eslint/no-explicit-any
import { NODE_ENV } from './config';

class Logger {
  static log(...args: any[]) {
    if (NODE_ENV !== 'production') {
      console.log(...args);
    }
  }

  static info(...args: any[]) {
    if (NODE_ENV !== 'production') {
      console.info(...args);
    }
  }

  static error(...args: any[]) {
    if (NODE_ENV !== 'production') {
      console.error(...args);
    }
  }
}

export default Logger;
