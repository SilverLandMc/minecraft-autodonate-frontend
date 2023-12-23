class Logger {
  private readonly messageSource: string;

  constructor(messageSource: string) {
    this.messageSource = messageSource;
  }

  info(message: string) {
    console.log(`🔔 [INFO]: ${this.messageSource}: ${message}`);
  }

  warning(message: string) {
    console.warn(`⚠️ [WARNING]: ${this.messageSource}: ${message}`);
  }

  error(message: string) {
    console.error(`🛑 [ERROR]: ${this.messageSource}: ${message}`);
  }
}

const createLogger = (messageSource: string) => new Logger(messageSource);

export default createLogger;
