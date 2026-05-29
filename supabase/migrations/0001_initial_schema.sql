create table profiles(id uuid primary key, email text, role text);
create table videos(id uuid primary key, title text, storage_path text);
create table games(id uuid primary key, game_date timestamp);
