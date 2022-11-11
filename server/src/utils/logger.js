import { format, createLogger, transports } from 'winston';

import { DATE_TIME_FORMAT } from '../constants';

const logFormat = format.printf(({ level, message, timestamp, stack }) => {
  return `[${timestamp}] [${level}] : ${stack || message}`;
});

const logger = createLogger({
  format: format.combine(format.colorize(), format.timestamp({ format: DATE_TIME_FORMAT }), logFormat),
  transports: [new transports.Console()],
});

export default logger;
