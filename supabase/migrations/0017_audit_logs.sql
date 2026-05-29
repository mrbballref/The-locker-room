create table audit_logs (
  id uuid primary key,
  actor_id uuid,
  organization_id uuid references organizations(id) on delete set null,
  action text not null,
  resource_type text not null,
  resource_id uuid,
  metadata jsonb default '{}'::jsonb,
  ip_address text,
  user_agent text,
  created_at timestamp default now()
);

create index audit_logs_actor_id_idx on audit_logs(actor_id);
create index audit_logs_organization_id_idx on audit_logs(organization_id);
create index audit_logs_action_idx on audit_logs(action);
create index audit_logs_resource_idx on audit_logs(resource_type, resource_id);
create index audit_logs_created_at_idx on audit_logs(created_at);
