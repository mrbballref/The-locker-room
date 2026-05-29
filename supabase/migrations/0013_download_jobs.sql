create table download_jobs (
  id uuid primary key,
  user_id uuid not null,
  video_asset_id uuid references video_assets(id),
  status text not null default 'queued',
  progress numeric not null default 0,
  local_file_name text,
  device_id text,
  error_message text,
  requested_at timestamp default now(),
  started_at timestamp,
  completed_at timestamp
);

create index download_jobs_user_id_idx on download_jobs(user_id);
create index download_jobs_video_asset_id_idx on download_jobs(video_asset_id);
create index download_jobs_status_idx on download_jobs(status);
