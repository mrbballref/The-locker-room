create table playlists (
  id uuid primary key,
  owner_id uuid not null,
  organization_id uuid references organizations(id),
  title text not null,
  description text,
  visibility text not null default 'private',
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create index playlists_owner_id_idx on playlists(owner_id);
create index playlists_organization_id_idx on playlists(organization_id);
create index playlists_visibility_idx on playlists(visibility);
