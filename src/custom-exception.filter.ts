import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof Error) {
      switch (exception.message) {
        case 'Forbidden':
          exception = new HttpException('Forbidden', HttpStatus.FORBIDDEN);
          break;
        case 'Cannot insert milk production for the same day twice':
          exception = new HttpException(exception.message, HttpStatus.CONFLICT);
          break;
        default:
          console.error(exception);
          new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = this.getHttpStatus(exception);

    response.status(status).json({
      statusCode: status,
      message:
        exception instanceof HttpException
          ? exception.getResponse()
          : 'Internal Server Error',
    });
  }

  private getHttpStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    } else {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
