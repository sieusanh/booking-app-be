// import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Class-based middleware, DI container

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log('class LoggerMiddleware...');
//     next();
//   }
// }

// Functional-based middleware
export function LoggerMiddleware(
req: Request, res: Response, next: NextFunction) {
    console.log('function LoggerMiddleware...');
    next();
}
