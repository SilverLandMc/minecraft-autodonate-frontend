class Logger {
    private readonly messageSource: string;

    constructor(messageSource: string) {
        this.messageSource = messageSource;
    }

    info(message: string) {
        // eslint-disable-next-line no-console
        console.log(`🔔 [INFO]: ${this.messageSource}: ${message}`);
    }

    warning(message: string) {
        // eslint-disable-next-line no-console
        console.warn(`⚠️ [WARNING]: ${this.messageSource}: ${message}`);
    }

    error(message: string) {
        // eslint-disable-next-line no-console
        console.error(`🛑 [ERROR]: ${this.messageSource}: ${message}`);
    }
}

export const createLogger = (messageSource: string) => new Logger(messageSource);
