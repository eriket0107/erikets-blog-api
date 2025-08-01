/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { loggers, transports, format, transport } from 'winston';

const { combine, timestamp, label, printf, colorize } = format;

const consoleFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  colorize(),
  printf(({ level, message, context, timestamp: ts }) => {
    const ctx = typeof context === 'string' ? context : 'application';
    return `${ts} [${ctx}] ${level}: ${message}`;
  }),
);

const fileFormat = (logContext: string) =>
  combine(
    label({ label: logContext }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf(({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] ${level}: ${message}`;
    }),
  );

const createLoggerFor = (context: string) => {
  if (loggers.has(context)) {
    return;
  }

  const loggerTransports: transport[] = [
    new transports.File({
      filename: `logs/${context}.log`,
      format: fileFormat(context),
      level: 'info',
    }),
  ];

  if (process.env.NODE_ENV !== 'prod') {
    loggerTransports.push(
      new transports.Console({
        format: consoleFormat,
        level: 'debug',
      }),
    );
  }

  loggers.add(context, {
    transports: loggerTransports,
  });
};

export const getLogger = (context: string) => {
  if (!loggers.has(context)) {
    createLoggerFor(context);
  }

  return loggers.get(context);
};
