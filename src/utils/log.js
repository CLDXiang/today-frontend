import { NODE_ENV } from './config';

class Logger {
  static log(...args) {
    if (NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(...args);
    }
  }

  static info(...args) {
    if (NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.info(...args);
    }
  }

  static error(...args) {
    if (NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(...args);
    }
  }
}

export default Logger;
