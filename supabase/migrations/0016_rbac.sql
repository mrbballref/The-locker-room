create table roles (
  id uuid primary key,
  name text unique not null,
  description text,
  created_at timestamp default now()
);

create table permissions (
  id uuid primary key,
  name text unique not null,
  description text,
  created_at timestamp default now()
);

create table role_permissions (
  role_id uuid references roles(id) on delete cascade,
  permission_id uuid references permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);

create table user_roles (
  user_id uuid not null,
  role_id uuid references roles(id) on delete cascade,
  organization_id uuid references organizations(id) on delete cascade,
  created_at timestamp default now(),
  primary key (user_id, role_id, organization_id)
);

create index user_roles_user_id_idx on user_roles(user_id);
create index user_roles_organization_id_idx on user_roles(organization_id);
