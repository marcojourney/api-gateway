import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
  
@Catch(Error)
export class CsrfExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      if (exception.code !== 'EBADCSRFTOKEN') {
        throw exception;
      }
  
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      response.status(HttpStatus.FORBIDDEN).json({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Invalid CSRF token',
      });
    }
}
  