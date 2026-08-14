
create table category( category_id INT primary key , name VARCHAR(50) not null , description varchar(100) not null, slug varchar(20) not null, ideal_for varchar(20))

create table product(product_id INT primary key,category_id int not null, 
purity varchar(30)not null, weight varchar(30) not null, 
title varchar(50) not null, description varchar(200) not null , price decimal(18,2) not null,
discount decimal(4,2), quantity int not null , ideal_for varchar(15) not null, 
packaging varchar(50), labour_cost decimal(18,2), actual_cost decimal(18,2) not null, 
CONSTRAINT FK_product_category FOREIGN KEY (category_id) REFERENCES category(category_id))

select * from product

create table image(image_id INT primary key ,product_id INT , image1 varchar(100) not null, image2 varchar(100) , constraint product_id foreign key (product_id) references product(product_id))

create table make_master(m_id int primary key, type varchar(50))

create table product_image(p_id int constraint pro_id foreign key(p_id) references product(product_id),
imageid int constraint image_id foreign key(imageid) references image(image_id))
