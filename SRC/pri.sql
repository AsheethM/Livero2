DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS shop;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS transaction;

CREATE TABLE IF NOT EXISTS user
(
  id INT NOT NULL AUTO_INCREMENT,
  lastname VARCHAR(255) NOT NULL ,
  firstname VARCHAR(255) NOT NULL ,
  birthdate DATE NOT NULL ,
  mail VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(10) NOT NULL,
  role INT NOT NULL , # 1 : customer 2:vendor 4:deliverer 3:customer - vendor 5: customer - deliverer 6: vendor - deliverer 7 : all roles
  PRIMARY KEY (id)
);

INSERT INTO user (id,lastname, firstname, birthdate, mail, phone, role)
VALUES (1, 'Titus', 'Regis', '28/12/1995', 'regis.titus@epita.fr', '0123456789', 1);

INSERT INTO user (id, lastname, firstname, birthdate, mail, phone, role)
VALUES (2, 'Sehil', 'Yvael', '10/11/1992', 'yvael.sehil@epita.fr', '0123456789', 2);

INSERT INTO user (id, lastname, firstname, birthdate, mail, phone, role)
VALUES (3, 'Pelletier', 'Nicolas', '10/02/1993', 'nicolas.pelletier@epita.fr', '0123456789', 4);

INSERT INTO user (id, lastname, firstname, birthdate, mail, phone, role)
VALUES (4, 'Seridj', 'Sadek', '14/03/1995', 'sadek.seridj@epita.fr', '0123456789', 3);


CREATE TABLE IF NOT EXISTS shop
(
  id INT NOT NULL AUTO_INCREMENT,
  owner_id INT NOT NULL ,
  shop_name VARCHAR(255) NOT NULL ,
  adress VARCHAR(255) NOT NULL ,
  phone VARCHAR(10) NOT NULL ,
  PRIMARY KEY (id),
  FOREIGN KEY (owner_id) REFERENCES user(id)
);

INSERT INTO shop (id, owner_id, shop_name, adress, phone) VALUES (1, 2, 'Yvael_Shop', 'Asnieres', '0123456789');
INSERT INTO shop (id, owner_id, shop_name, adress, phone) VALUES (2, 4, 'Sadek_Shop', 'Paris-13', '0123456789');

CREATE TABLE IF NOT EXISTS product
(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL ,
  shop_id INT NOT NULL ,
  description VARCHAR(255) NOT NULL ,
  price INT NOT NULL ,
  PRIMARY KEY (id),
  FOREIGN KEY (shop_id) REFERENCES shop(id)
);

INSERT INTO product(id, product_name, shop_id, description, price) VALUES (1, 'Lays', 1, 'Best Chips Ever', 3);
INSERT INTO product(id, product_name, shop_id, description, price) VALUES (2, 'Cake', 1, 'Best Cake Ever', 2);


CREATE TABLE IF NOT EXISTS transaction
(
  id INT NOT NULL AUTO_INCREMENT,
  customer_id INT NOT NULL ,
  shop_id INT NOT NULL,
  deliverer_id INT,
  price INT ,
  status INT, # 1: Creation of the transaction, 2: Confirmation of Vendor
  PRIMARY KEY (id),
  FOREIGN KEY (customer_id) REFERENCES user(id),
  FOREIGN KEY (shop_id) REFERENCES shop(id),
  FOREIGN KEY (deliverer_id) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS command
(
  id INT NOT NULL AUTO_INCREMENT,
  product_id INt NOT NULL,
  transaction_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (transaction_id) REFERENCES transaction(id)
);