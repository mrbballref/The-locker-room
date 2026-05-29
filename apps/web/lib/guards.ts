import type { Permission } from './permissions';
import type { UserRole } from './rbac';
import { hasAllPermissions, hasAnyPermission, hasPermission } from './rbac';

export class AuthorizationError extends Error {
  status = 403;

  constructor(message = 'You do not have permission to access this resource.') {
    super(message);
    this.name = 'AuthorizationError';
  }
}

export function requirePermission(role: UserRole, permission: Permission) {
  if (!hasPermission(role, permission)) {
    throw new AuthorizationError(`Missing required permission: ${permission}`);
  }
  return true;
}

export function requireAnyPermission(role: UserRole, permissions: Permission[]) {
  if (!hasAnyPermission(role, permissions)) {
    throw new AuthorizationError(`Missing one of required permissions: ${permissions.join(', ')}`);
  }
  return true;
}

export function requireAllPermissions(role: UserRole, permissions: Permission[]) {
  if (!hasAllPermissions(role, permissions)) {
    throw new AuthorizationError(`Missing required permissions: ${permissions.join(', ')}`);
  }
  return true;
}

export function canAccessOrganization(userOrganizationIds: string[], organizationId: string) {
  return userOrganizationIds.includes(organizationId);
}
