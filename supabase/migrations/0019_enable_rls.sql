alter table organizations enable row level security;
alter table conferences enable row level security;
alter table teams enable row level security;
alter table seasons enable row level security;
alter table games enable row level security;
alter table assignments enable row level security;
alter table videos enable row level security;
alter table video_assets enable row level security;
alter table download_jobs enable row level security;
alter table playlists enable row level security;
alter table playlist_items enable row level security;
alter table evaluations enable row level security;
alter table audit_logs enable row level security;
alter table roles enable row level security;
alter table permissions enable row level security;
alter table role_permissions enable row level security;
alter table user_roles enable row level security;

create policy organizations_read_authenticated on organizations
  for select using (auth.role() = 'authenticated');

create policy conferences_read_authenticated on conferences
  for select using (auth.role() = 'authenticated');

create policy teams_read_authenticated on teams
  for select using (auth.role() = 'authenticated');

create policy seasons_read_authenticated on seasons
  for select using (auth.role() = 'authenticated');

create policy games_read_authenticated on games
  for select using (auth.role() = 'authenticated');

create policy videos_read_authenticated on videos
  for select using (auth.role() = 'authenticated');

create policy video_assets_read_authenticated on video_assets
  for select using (auth.role() = 'authenticated');

create policy clips_read_authenticated on clips
  for select using (auth.role() = 'authenticated');

create policy playlists_owner_all on playlists
  for all using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy playlist_items_read_authenticated on playlist_items
  for select using (auth.role() = 'authenticated');

create policy download_jobs_owner_all on download_jobs
  for all using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy evaluations_read_authenticated on evaluations
  for select using (auth.role() = 'authenticated');

create policy audit_logs_admin_read on audit_logs
  for select using (
    exists (
      select 1
      from user_roles ur
      join roles r on r.id = ur.role_id
      where ur.user_id = auth.uid()
        and r.name in ('super_admin', 'administrator')
    )
  );

create policy roles_read_authenticated on roles
  for select using (auth.role() = 'authenticated');

create policy permissions_read_authenticated on permissions
  for select using (auth.role() = 'authenticated');

create policy role_permissions_read_authenticated on role_permissions
  for select using (auth.role() = 'authenticated');

create policy user_roles_self_read on user_roles
  for select using (user_id = auth.uid());
