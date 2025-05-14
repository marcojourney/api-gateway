import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
  
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const traceId = request.traceId || request.headers['x-trace-id'];
    const method = request.method;
    const url = request.originalUrl;

    const now = Date.now();
    return next.handle().pipe(
    tap(() =>
        console.log(`[TraceId: ${traceId}] ${method} ${url} - ${Date.now() - now}ms`),
    ),
    );
}
}
  