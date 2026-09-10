import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '../../users/schemas/user.schema.js';
import { RoleProtected } from './role-protected.decorator.js';
import { UserRoleGuard } from '../guards/user-role.guard.js';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard('jwt'), UserRoleGuard),
  );
}