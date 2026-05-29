create table clips (
 id uuid primary key,
 video_id uuid references videos(id),
 start_time numeric,
 end_time numeric,
 title text
);
