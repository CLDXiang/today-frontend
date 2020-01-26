class Logger {
    info(...args) {
      // eslint-disable-next-line no-console
      console.log(...args);
    }
  }
  
  const logger = new Logger();
  export default logger;