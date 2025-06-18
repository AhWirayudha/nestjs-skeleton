import { SetMetadata } from '@nestjs/common';

/**
 * Custom decorator for specifying required roles on an endpoint.
 * @param roles List of required roles
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);