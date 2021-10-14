const winston = require('winston');
require('winston-daily-rotate-file');
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});
winston.loggers.add('logger', {
    levels: winston.config.syslog.levels,
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new (winston.transports.Console)(),
        new winston.transports.DailyRotateFile({
                name: 'debug-log',
                filename: 'debug.log.%DATE%',
                level: 'info',
                prepend: true,
                maxFiles: '7d',
                dirname: "./logs"
            }
        ),
        new winston.transports.DailyRotateFile({
            name: 'error-log',
            filename: 'error.log.%DATE%',
            level: 'error',
            prepend: true,
            maxFiles: '7d',
            dirname: "./logs"
        })
    ]
});

const logger = winston.loggers.get('logger');
module.exports = logger;
//Object.defineProperty(exports, "LOG", {value: logger});