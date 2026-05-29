export type Permission =
  | 'film:view'
  | 'film:upload'
  | 'film:download'
  | 'film:manage'
  | 'clips:create'
  | 'clips:manage'
  | 'playlists:create'
  | 'playlists:manage'
  | 'evaluations:view'
  | 'evaluations:create'
  | 'evaluations:manage'
  | 'assignments:view'
  | 'assignments:manage'
  | 'users:manage'
  | 'organizations:manage'
  | 'system:admin';

export const permissions: Permission[] = [
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
];
