// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

// @Injectable()
// export class AuthGuard implements CanActivate {
//     canActivate(
//         context: ExecutionContext,
//     ): boolean | Promise<boolean> {
//         const request = context.switchToHttp().getRequest();
//         return validateRequest(request);
//     }
// }

// function validateRequest(request: unknown) {
//     return true;
// }

import { Injectable, CanActivate, ExecutionContext, 
    UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JWT_SECRET_KEY } from 'src/modules/auth/user/user.auth.constant';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        
        return this.validateRequest(request);
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    async validateRequest(request: Request): Promise<boolean> {

        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                { secret: JWT_SECRET_KEY }
            );
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers

            request['user'] = payload;
        } catch (err) {
            console.log('======================= AuthGuard canActivate err ', err)
            throw new UnauthorizedException();
        }

        return true;
    }
}


