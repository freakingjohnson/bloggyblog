create table blogs (id serial primary key, title text, body text, post_date text);

create table messages (id serial primary key, author_name varchar(16), message_body text, message_date text)

create table images (id serial primary key, img text, image_id text)
