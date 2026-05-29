create table evaluations (
 id uuid primary key,
 official_id uuid,
 score numeric,
 notes text,
 created_at timestamp default now()
);
