create table videos (
 id uuid primary key,
 title text not null,
 storage_path text not null,
 created_at timestamp default now()
);
