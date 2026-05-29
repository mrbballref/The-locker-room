create table seasons (
 id uuid primary key,
 team_id uuid references teams(id),
 name text not null,
 start_date date,
 end_date date,
 created_at timestamp default now()
);