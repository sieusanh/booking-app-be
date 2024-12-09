import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    HttpServer
} from '@nestjs/common';
import { HttpAdapterHost, BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: unknown, host: ArgumentsHost) {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;
        console.log('=================== AllExceptionsFilter catch ')

        const ctx = host.switchToHttp();
        // const request = ctx.getRequest();
        const response = ctx.getResponse();

        const [httpStatus, message] = 
            exception instanceof HttpException
                ? [exception.getStatus(), exception.name]
                : [HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong.'];

        const responseBody = {
            statusCode: httpStatus,
            message,
            // timestamp: new Date().toISOString(),
            // path: httpAdapter.getRequestUrl(request),
        };

        httpAdapter.reply(response, responseBody, httpStatus);
    }
}

// @Catch()
// export class AllExceptionsFilter extends BaseExceptionFilter {
//   catch(exception: unknown, host: ArgumentsHost) {
//     super.catch(exception, host);
//   }
// }

@Catch() 
export class AllExceptionsFilter extends BaseExceptionFilter {
    
    // constructor(
    //     protected readonly httpAdapterHost: HttpAdapterHost,

    // ) { 
        
    // }

    catch(exception: unknown, host: ArgumentsHost) {
        console.log('=================== AllExceptionsFilter catch ')

        super.catch(exception, host);

        // const ctx = host.switchToHttp();
        // const request = ctx.getRequest();
        // const response = ctx.getResponse();

        // const [status, message] = 
        //     exception instanceof HttpException
        //         ? [exception.getStatus(), exception.name]
        //         : [HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong.'];

        // return response
        //     // .status(status)
        //     .json({
        //         statusCode: status,
        //         message
        //         // timestamp: new Date().toISOString(),
        //         // path: request.url,
        //     });
    }
  
}
