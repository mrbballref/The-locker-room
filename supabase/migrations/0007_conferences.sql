create table conferences (
 id uuid primary key,
 name text not null,
 created_at timestamp default now()
);