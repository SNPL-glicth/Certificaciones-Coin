import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createLogger, format, transports, Logger } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private logger: Logger;

  constructor(private configService: ConfigService) {
    this.initializeLogger();
  }

  private initializeLogger(): void {
    const environment = this.configService.get<string>('NODE_ENV');
    const logLevel = this.configService.get<string>('LOG_LEVEL');
    
    const logFormat = format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.errors({ stack: true }),
      format.json(),
      format.printf(({ timestamp, level, message, context, trace, ...meta }) => {
        return JSON.stringify({
          timestamp,
          level: level.toUpperCase(),
          context: context || 'Application',
          message,
          trace,
          ...meta,
        });
      }),
    );

    const consoleFormat = format.combine(
      format.colorize(),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(({ timestamp, level, message, context }) => {
        return `${timestamp} [${context || 'App'}] ${level}: ${message}`;
      }),
    );

    const loggerTransports: any[] = [];

    // Console transport para development
    if (environment === 'development') {
      loggerTransports.push(
        new transports.Console({
          format: consoleFormat,
          level: logLevel,
        }),
      );
    }

    // File transports para todos los ambientes
    const fileTransportOptions: DailyRotateFile.DailyRotateFileTransportOptions = {
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      format: logFormat,
    };

    // Error logs
    loggerTransports.push(
      new DailyRotateFile({
        ...fileTransportOptions,
        filename: 'logs/error-%DATE%.log',
        level: 'error',
      }),
    );

    // Combined logs
    loggerTransports.push(
      new DailyRotateFile({
        ...fileTransportOptions,
        filename: 'logs/combined-%DATE%.log',
        level: logLevel,
      }),
    );

    // Access logs para requests HTTP
    loggerTransports.push(
      new DailyRotateFile({
        ...fileTransportOptions,
        filename: 'logs/access-%DATE%.log',
        level: 'info',
      }),
    );

    this.logger = createLogger({
      level: logLevel,
      format: logFormat,
      transports: loggerTransports,
      exitOnError: false,
    });

    // Manejo de uncaught exceptions y unhandled rejections
    this.logger.exceptions.handle(
      new DailyRotateFile({
        ...fileTransportOptions,
        filename: 'logs/exceptions-%DATE%.log',
      }),
    );

    this.logger.rejections.handle(
      new DailyRotateFile({
        ...fileTransportOptions,
        filename: 'logs/rejections-%DATE%.log',
      }),
    );
  }

  log(message: string, context?: string): void {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.error(message, { context, trace });
  }

  warn(message: string, context?: string): void {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string): void {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string): void {
    this.logger.verbose(message, { context });
  }

  // Métodos adicionales para casos específicos
  logHttpRequest(req: any, res: any, responseTime: number): void {
    const logData = {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      responseTime: `${responseTime}ms`,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      userId: req.user?.id || 'anonymous',
    };

    this.logger.info('HTTP Request', logData);
  }

  logAuthEvent(event: string, userId?: number, metadata?: any): void {
    this.logger.info(`Auth Event: ${event}`, {
      context: 'Authentication',
      userId,
      ...metadata,
    });
  }

  logSecurityEvent(event: string, metadata?: any): void {
    this.logger.warn(`Security Event: ${event}`, {
      context: 'Security',
      ...metadata,
    });
  }

  logDatabaseEvent(operation: string, table: string, duration?: number): void {
    this.logger.debug(`Database ${operation} on ${table}`, {
      context: 'Database',
      duration: duration ? `${duration}ms` : undefined,
    });
  }
}