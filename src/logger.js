import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'traps-registration' },
  transports: [
    new winston.transports.Console({ colorize: true })
  ]
});

logger.stream = {
  write: (msg, enc) => {
    logger.info(msg);
  }
}

export { logger as default };
