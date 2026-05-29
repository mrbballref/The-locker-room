create table organizations (
 id uuid primary key,
 name text not null,
 slug text unique,
 created_at timestamp default now()
);