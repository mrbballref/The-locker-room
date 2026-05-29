insert into roles (id, name, description) values
  (gen_random_uuid(), 'super_admin', 'Full system administrator with all permissions'),
  (gen_random_uuid(), 'administrator', 'Organization administrator with broad management permissions'),
  (gen_random_uuid(), 'assignor', 'Assignor with assignment and film access permissions'),
  (gen_random_uuid(), 'observer', 'Observer/evaluator with evaluation permissions'),
  (gen_random_uuid(), 'official', 'Official with film review and assignment access'),
  (gen_random_uuid(), 'coach', 'Coach with film and playlist permissions'),
  (gen_random_uuid(), 'viewer', 'Read-only film viewer')
on conflict (name) do nothing;

insert into permissions (id, name, description) values
  (gen_random_uuid(), 'film:view', 'View film and video assets'),
  (gen_random_uuid(), 'film:upload', 'Upload film and video assets'),
  (gen_random_uuid(), 'film:download', 'Download film for offline review'),
  (gen_random_uuid(), 'film:manage', 'Manage film metadata and access'),
  (gen_random_uuid(), 'clips:create', 'Create film clips'),
  (gen_random_uuid(), 'clips:manage', 'Manage film clips'),
  (gen_random_uuid(), 'playlists:create', 'Create playlists'),
  (gen_random_uuid(), 'playlists:manage', 'Manage playlists'),
  (gen_random_uuid(), 'evaluations:view', 'View evaluations'),
  (gen_random_uuid(), 'evaluations:create', 'Create evaluations'),
  (gen_random_uuid(), 'evaluations:manage', 'Manage evaluations'),
  (gen_random_uuid(), 'assignments:view', 'View assignments'),
  (gen_random_uuid(), 'assignments:manage', 'Manage assignments'),
  (gen_random_uuid(), 'users:manage', 'Manage users'),
  (gen_random_uuid(), 'organizations:manage', 'Manage organizations'),
  (gen_random_uuid(), 'system:admin', 'Perform full system administration')
on conflict (name) do nothing;

insert into role_permissions (role_id, permission_id)
select r.id, p.id
from roles r
cross join permissions p
where r.name = 'super_admin'
on conflict do nothing;

insert into role_permissions (role_id, permission_id)
select r.id, p.id
from roles r
join permissions p on p.name in (
  'film:view','film:upload','film:download','film:manage',
  'clips:create','clips:manage',
  'playlists:create','playlists:manage',
  'evaluations:view','evaluations:create','evaluations:manage',
  'assignments:view','assignments:manage','users:manage'
)
where r.name = 'administrator'
on conflict do nothing;

insert into role_permissions (role_id, permission_id)
select r.id, p.id
from roles r
join permissions p on p.name in (
  'film:view','film:download','playlists:create','playlists:manage',
  'evaluations:view','assignments:view','assignments:manage'
)
where r.name = 'assignor'
on conflict do nothing;

insert into role_permissions (role_id, permission_id)
select r.id, p.id
from roles r
join permissions p on p.name in (
  'film:view','film:download','clips:create','playlists:create',
  'evaluations:view','evaluations:create','assignments:view'
)
where r.name = 'observer'
on conflict do nothing;

insert into role_permissions (role_id, permission_id)
select r.id, p.id
from roles r
join permissions p on p.name in (
  'film:view','film:download','clips:create','playlists:create',
  'evaluations:view','assignments:view'
)
where r.name = 'official'
on conflict do nothing;

insert into role_permissions (role_id, permission_id)
select r.id, p.id
from roles r
join permissions p on p.name in (
  'film:view','film:download','clips:create','playlists:create','playlists:manage'
)
where r.name = 'coach'
on conflict do nothing;

insert into role_permissions (role_id, permission_id)
select r.id, p.id
from roles r
join permissions p on p.name in ('film:view')
where r.name = 'viewer'
on conflict do nothing;
