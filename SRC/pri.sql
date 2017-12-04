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
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(10) NOT NULL,
  role INT NOT NULL , # 1 : customer 2:vendor 4:deliverer 3:customer - vendor 5: customer - deliverer 6: vendor - deliverer 7 : all roles
  PRIMARY KEY (id)
);

INSERT INTO user (id,lastname, firstname, birthdate, email, phone, role)
VALUES (1, 'Titus', 'Regis', '28/12/1995', 'regis.titus@epita.fr', '0123456789', 1);

INSERT INTO user (id, lastname, firstname, birthdate, email, phone, role)
VALUES (2, 'Sehil', 'Yvael', '10/11/1992', 'yvael.sehil@epita.fr', '0123456789', 2);

INSERT INTO user (id, lastname, firstname, birthdate, email, phone, role)
VALUES (3, 'Pelletier', 'Nicolas', '10/02/1993', 'nicolas.pelletier@epita.fr', '0123456789', 4);

INSERT INTO user (id, lastname, firstname, birthdate, email, phone, role)
VALUES (4, 'Seridj', 'Sadek', '14/03/1995', 'sadek.seridj@epita.fr', '0123456789', 3);


CREATE TABLE IF NOT EXISTS shop
(
  id INT NOT NULL AUTO_INCREMENT,
  owner_id INT NOT NULL ,
  shop_name VARCHAR(255) NOT NULL ,
  address VARCHAR(255) NOT NULL ,
  postcode VARCHAR(255) NOT NULL,
  town VARCHAR(255) NOT NULL ,
  phone VARCHAR(10) NOT NULL ,
  PRIMARY KEY (id),
  FOREIGN KEY (owner_id) REFERENCES user(id)
);

INSERT INTO shop (id, owner_id, shop_name, address, postcode, town, phone)
VALUES (1, 2, 'Yvael_Shop', '10 Rue Michel','93025','Asnieres', '0123456789');

INSERT INTO shop (id, owner_id, shop_name, address, postcode, town, phone)
VALUES (2, 4, 'Sadek_Shop','15 Rue Seridj','75013', 'Paris', '0123456789');

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

INSERT INTO product(id, product_name, shop_id, description, price)
VALUES (1, 'Lays', 1, 'Best Chips Ever', 3);

INSERT INTO product(id, product_name, shop_id, description, price)
VALUES
(2, 'Cake', 1, 'Best Cake Ever', 2),
(3, 'Shit', 2, 'De la Bonne Gros', 30),
(4, 'PS4', 2, 'Bon pour FIFA', 300);

CREATE TABLE IF NOT EXISTS transaction
(
  id INT NOT NULL AUTO_INCREMENT,
  customer_id INT NOT NULL ,
  shop_id INT NOT NULL,
  deliverer_id INT,
  price_command INT NOT NULL ,
  price_deliverer INT,
  status INT, # 1: Creation of the transaction, 2: Confirmation of Vendor, 3: Confirmation of Client, 4: Transaction Finished
  PRIMARY KEY (id),
  FOREIGN KEY (customer_id) REFERENCES user(id),
  FOREIGN KEY (shop_id) REFERENCES shop(id),
  FOREIGN KEY (deliverer_id) REFERENCES user(id)
);

INSERT INTO transaction (id, customer_id, shop_id, price_command, status)
VALUES (1, 1, 1, 5, 1);

INSERT INTO transaction (id, customer_id, shop_id, price_command, status)
VALUES (2, 1, 1, 7, 1);

CREATE TABLE IF NOT EXISTS command
(
  id INT NOT NULL AUTO_INCREMENT,
  product_id INt NOT NULL,
  transaction_id INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (transaction_id) REFERENCES transaction(id)
);

INSERT INTO command (id, product_id, transaction_id, quantity)
VALUES (1, 1, 1, 1);

INSERT INTO command (id, product_id, transaction_id, quantity)
VALUES (2, 2, 1, 1);


INSERT INTO command (id, product_id, transaction_id, quantity)
VALUES (3, 1, 2, 1);

INSERT INTO command (id, product_id, transaction_id, quantity)
VALUES (4, 2, 2, 2);

