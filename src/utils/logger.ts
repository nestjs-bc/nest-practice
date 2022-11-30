import { utilities } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDailyRotateFile from 'winston-daily-rotate-file';

//import { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';
// export const dailyOptions = (): DailyRotateFileTransportOptions => ({
export const dailyRotateLogger: winstonDailyRotateFile =
  new winstonDailyRotateFile({
    datePattern: 'YYYY-MM-DD',
    dirname: './storage/logs',
    filename: '%DATE%.log',
    maxFiles: 30,
    zippedArchive: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      utilities.format.nestLike('appreview-nest', {
        prettyPrint: true,
      }),
    ),
  });

export const logger = winston.createLogger({
  transports: [dailyRotateLogger],
});
