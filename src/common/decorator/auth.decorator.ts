
import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { RolesGuard, AuthGuard } from "../guards";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ROLES } from 'src/common';

export function Auth(...roles: ROLES[]) {
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(AuthGuard, RolesGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}
