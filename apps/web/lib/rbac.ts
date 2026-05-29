import type { Permission } from './permissions';

export type UserRole =
  | 'super_admin'
  | 'administrator'
  | 'assignor'
  | 'observer'
  | 'official'
  | 'coach'
  | 'viewer';

export const rolePermissions: Record<UserRole, Permission[]> = {
  super_admin: [
    'film:view',
    'film:upload',
    'film:download',
    'film:manage',
    'clips:create',
    'clips:manage',
    'playlists:create',
    'playlists:manage',
    'evaluations:view',
    'evaluations:create',
    'evaluations:manage',
    'assignments:view',
    'assignments:manage',
    'users:manage',
    'organizations:manage',
    'system:admin'
  ],
  administrator: [
    'film:view',
    'film:upload',
    'film:download',
    'film:manage',
    'clips:create',
    'clips:manage',
    'playlists:create',
    'playlists:manage',
    'evaluations:view',
    'evaluations:create',
    'evaluations:manage',
    'assignments:view',
    'assignments:manage',
    'users:manage'
  ],
  assignor: [
    'film:view',
    'film:download',
    'playlists:create',
    'playlists:manage',
    'evaluations:view',
    'assignments:view',
    'assignments:manage'
  ],
  observer: [
    'film:view',
    'film:download',
    'clips:create',
    'playlists:create',
    'evaluations:view',
    'evaluations:create',
    'assignments:view'
  ],
  official: [
    'film:view',
    'film:download',
    'clips:create',
    'playlists:create',
    'evaluations:view',
    'assignments:view'
  ],
  coach: [
    'film:view',
    'film:download',
    'clips:create',
    'playlists:create',
    'playlists:manage'
  ],
  viewer: ['film:view']
};

export function hasPermission(role: UserRole, permission: Permission) {
  return rolePermissions[role]?.includes(permission) ?? false;
}

export function hasAnyPermission(role: UserRole, required: Permission[]) {
  return required.some((permission) => hasPermission(role, permission));
}

export function hasAllPermissions(role: UserRole, required: Permission[]) {
  return required.every((permission) => hasPermission(role, permission));
}
