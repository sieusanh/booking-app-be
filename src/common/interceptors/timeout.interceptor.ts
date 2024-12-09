import { Injectable, NestInterceptor, ExecutionContext, 
    CallHandler, RequestTimeoutException } from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            timeout(5000),
            catchError(err => {
                if (err instanceof TimeoutError) {
                    return throwError(() => new RequestTimeoutException());
                }
                return throwError(() => err);
            }), 
        );
    }
}


/**
 * 
 * After 5 seconds, request processing will be canceled. 
 * You can also add custom logic before throwing RequestTimeoutException (e.g. release resources).
 * 
 */
