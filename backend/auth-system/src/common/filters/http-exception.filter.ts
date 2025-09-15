import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomLoggerService } from '../logger/logger.service';

interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string | object;
  error?: string;
  errorCode?: string;
  requestId?: string;
  stack?: string;
}

@Catch()
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLoggerService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const timestamp = new Date().toISOString();
    const path = request.url;
    const method = request.method;
    const requestId = request.headers['x-request-id'] as string;

    let status: number;
    let message: string | object;
    let error: string;
    let errorCode: string;
    let stack: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        error = exception.name;
      } else if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || exceptionResponse;
        error = (exceptionResponse as any).error || exception.name;
        errorCode = (exceptionResponse as any).errorCode;
      }
      
      stack = exception.stack;
    } else if (exception instanceof Error) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Error interno del servidor';
      error = exception.name;
      stack = exception.stack;
      
      // Errores específicos de base de datos
      if (exception.message.includes('ECONNREFUSED')) {
        errorCode = 'DATABASE_CONNECTION_FAILED';
        message = 'Error de conexión a la base de datos';
      } else if (exception.message.includes('ER_DUP_ENTRY')) {
        status = HttpStatus.CONFLICT;
        errorCode = 'DUPLICATE_ENTRY';
        message = 'El recurso ya existe';
      } else if (exception.message.includes('ER_NO_REFERENCED_ROW')) {
        status = HttpStatus.BAD_REQUEST;
        errorCode = 'FOREIGN_KEY_CONSTRAINT';
        message = 'Referencia inválida';
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Error desconocido';
      error = 'UnknownError';
    }

    const errorResponse: ErrorResponse = {
      statusCode: status,
      timestamp,
      path,
      method,
      message,
      error,
    };

    if (errorCode) {
      errorResponse.errorCode = errorCode;
    }

    if (requestId) {
      errorResponse.requestId = requestId;
    }

    // Solo incluir stack trace en desarrollo
    if (process.env.NODE_ENV === 'development' && stack) {
      errorResponse.stack = stack;
    }

    // Log del error
    const logContext = {
      statusCode: status,
      path,
      method,
      requestId,
      userAgent: request.get('User-Agent'),
      ip: request.ip,
      userId: (request as any).user?.id,
    };

    if (status >= 500) {
      this.logger.error(
        `Internal Server Error: ${message}`,
        stack,
        'HttpExceptionFilter',
      );
      this.logger.logSecurityEvent('INTERNAL_SERVER_ERROR', logContext);
    } else if (status === 401 || status === 403) {
      this.logger.warn(
        `Authentication/Authorization Error: ${message}`,
        'HttpExceptionFilter',
      );
      this.logger.logSecurityEvent('AUTH_ERROR', logContext);
    } else if (status >= 400) {
      this.logger.warn(
        `Client Error: ${message}`,
        'HttpExceptionFilter',
      );
    }

    response.status(status).json(errorResponse);
  }
}