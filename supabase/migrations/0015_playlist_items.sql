create table playlist_items (
  id uuid primary key,
  playlist_id uuid references playlists(id) on delete cascade,
  video_id uuid references videos(id),
  clip_id uuid references clips(id),
  bookmark_id uuid,
  title text,
  note text,
  sort_order integer not null default 0,
  start_time numeric,
  end_time numeric,
  created_at timestamp default now()
);

create index playlist_items_playlist_id_idx on playlist_items(playlist_id);
create index playlist_items_video_id_idx on playlist_items(video_id);
create index playlist_items_clip_id_idx on playlist_items(clip_id);
create index playlist_items_sort_order_idx on playlist_items(sort_order);
