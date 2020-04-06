create table users (
    "id" int,
    username text not null unique,
    "password" text not null,
    email text not null unique, 
    firstName text not null, 
    lastName text not null, 
    birthdate date,
    profilePhoto text,


    constraint pk_user primary key ("id")

);

create table posts (
    "id" int,
    "userId" int not null, a
    publicationDate timestamp not null, 
    s3Address text not null,
    "description" text 

    constraint pk_posts primary key ("id"),
    constraint fk_user foreign key ("userId") references users("id")
);

create table likes (
    "id" int,
    "userId" int not null,
    postId int not null, 

    constraint pk_likes primary key("id"),
    constraint fk_user foreign key("userId") references users("id"),
    constraint fk_post foreign key(postId) references posts("id")
);

create table token_blacklist (
  "id" int,
  token text not null,
  userId smallint not null
  
  constraint pk_token_blacklist primary key ("id")
)


