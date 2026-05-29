create table assignments (
 id uuid primary key,
 game_id uuid references games(id),
 official_id uuid,
 position text,
 status text default 'assigned',
 created_at timestamp default now()
);