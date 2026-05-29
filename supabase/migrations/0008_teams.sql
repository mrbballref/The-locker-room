create table teams (
 id uuid primary key,
 conference_id uuid references conferences(id),
 name text not null,
 short_name text,
 created_at timestamp default now()
);