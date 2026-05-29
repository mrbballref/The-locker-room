create table video_assets (
  id uuid primary key,
  video_id uuid references videos(id),
  asset_type text not null,
  storage_provider text not null,
  storage_path text not null,
  mime_type text,
  file_size_bytes bigint,
  duration_seconds numeric,
  width integer,
  height integer,
  frame_rate numeric,
  checksum text,
  created_at timestamp default now()
);

create index video_assets_video_id_idx on video_assets(video_id);
create index video_assets_storage_provider_idx on video_assets(storage_provider);
