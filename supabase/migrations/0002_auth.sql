create table if not exists profiles (
 id uuid primary key,
 email text unique,
 role text default 'official'
);
