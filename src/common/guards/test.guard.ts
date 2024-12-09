
import { CanActivate, ExecutionContext } from '@nestjs/common';

export class TestGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> {
        return validateRequest(context);        
    }
}

function validateRequest(context: ExecutionContext): boolean {
    return true;
}