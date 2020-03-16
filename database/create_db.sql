create table users (
    "id" int,
    username text not null unique,
    "password" text not null,
    email text not null unique, 
    first_name text not null, 
    last_name text not null, 
    birthdate date,
    profile_photo text,


    constraint pk_user primary key ("id")

);

create table posts (
    "id" int,
    "user_id" int not null, 
    publication_date timestamp not null, 
    s3_address text not null,
    "description" text 

    constraint pk_posts primary key ("id"),
    constraint fk_user foreign key ("user_id") references users("id")

);

create table likes (
    "user_id" int not null,
    post_id int not null, 

    constraint pk_likes primary key("user_id", post_id),
    constraint fk_user foreign key("user_id") references users("id"),
    constraint fk_post foreign key(post_id) references posts("id")
);

create table token_blacklist (
  "id" int,
  token text not null,
  type text not null,
  attempts smallint,
  code smallint,
  
  constraint pk_token_blacklist primary key ("id")
)


