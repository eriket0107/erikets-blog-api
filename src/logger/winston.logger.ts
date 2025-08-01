import { Injectable, LoggerService } from '@nestjs/common';
import { getLogger } from 'src/config/winston.config';
import { Logger as WinstonInstance } from 'winston';

@Injectable()
export class WinstonLogger implements LoggerService {
  private getLogger(context?: string): WinstonInstance {
    return getLogger(context || 'application');
  }

  log(message: string, context?: string) {
    this.getLogger(context).info(message);
  }

  error(message: string, trace?: string, context?: string) {
    const winstonContext = context || 'application';
    this.getLogger(winstonContext).error(message, { trace });
  }

  warn(message: string, context?: string) {
    this.getLogger(context).warn(message);
  }

  debug(message: string, context?: string) {
    this.getLogger(context).debug(message);
  }

  verbose(message: string, context?: string) {
    this.getLogger(context).verbose(message);
  }
}
