
CREATE TABLE IF NOT EXISTS user
(
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL ,
  firstname VARCHAR(255) NOT NULL ,
  birthdate DATE NOT NULL ,
  phone VARCHAR(10) NOT NULL,
  phone_token VARCHAR(255),
  role INT NOT NULL COMMENT ' 1: customer | 2:shop | 4:deliverer | 3:customer-shop | 5: customer-deliverer | 6: shop-deliverer | 7 : all roles',
  creation_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  lastlogin TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS shop
(
  id INT NOT NULL AUTO_INCREMENT,
  owner_id INT NOT NULL,
  shop_name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL ,
  latitude VARCHAR(255) NOT NULL,
  longitude VARCHAR(255) NOT NULL,
  phone VARCHAR(10) NOT NULL,
  logo VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (owner_id) REFERENCES user(id)
);



CREATE TABLE IF NOT EXISTS shop_schedule
(
  id INT NOT NULL AUTO_INCREMENT,
  shop_id INT NOT NULL ,
  day VARCHAR(15) NOT NULL ,
  opening_hour TIME NOT NULL ,
  closing_hour TIME NOT NULL ,
  PRIMARY KEY (id),
  FOREIGN KEY (shop_id) REFERENCES shop(id)
);


CREATE TABLE IF NOT EXISTS product
(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL ,
  shop_id INT NOT NULL ,
  description VARCHAR(255) NOT NULL DEFAULT '',
  price DOUBLE NOT NULL ,
  PRIMARY KEY (id),
  FOREIGN KEY (shop_id) REFERENCES shop(id)
);

CREATE TABLE IF NOT EXISTS transaction
(
  id INT NOT NULL AUTO_INCREMENT,
  client_id INT NOT NULL ,
  client_lat VARCHAR(255) NOT NULL,
  client_long VARCHAR(255) NOT NULL,
  dest_address VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL COMMENT 'Message of the client when he creates the transaction',
  shop_id INT NOT NULL,
  deliverer_id INT,
  client_token VARCHAR(12) NOT NULL DEFAULT '',
  shop_token VARCHAR(12) NOT NULL DEFAULT '',
  order_price DOUBLE NOT NULL ,
  deliverer_price DOUBLE,
  status INT NOT NULL COMMENT '1: Creation of the transaction, 2: Confirmation of shop, 3: Confirmation of Client, 4: Transaction Finished',
  isComplete BOOLEAN DEFAULT true,
  PRIMARY KEY (id),
  FOREIGN KEY (client_id) REFERENCES user(id),
  FOREIGN KEY (shop_id) REFERENCES shop(id),
  FOREIGN KEY (deliverer_id) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS gps
(
  id INT NOT NULL AUTO_INCREMENT,
  deliverer_id INT NOT NULL,
  transaction_id INT NOT NULL,
  latitude VARCHAR(255) NOT NULL,
  longitude VARCHAR(255) NOT NULL,
  altitude VARCHAR(255) NOT NULL,
  accuracy VARCHAR(255) NOT NULL,
  speeed VARCHAR(255) NOT NULL,
  heading VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (deliverer_id, transaction_id),
  FOREIGN KEY (deliverer_id) REFERENCES user(id),
  FOREIGN KEY (transaction_id) REFERENCES transaction(id)
);


CREATE TABLE IF NOT EXISTS transaction_product
(
  id INT NOT NULL AUTO_INCREMENT,
  product_id INt NOT NULL,
  transaction_id INT NOT NULL,
  customer_quantity INT NOT NULL,
  shop_quantity INT NOT NULL ,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (transaction_id) REFERENCES transaction(id)
);


CREATE TABLE IF NOT EXISTS bidding
(
  id INT NOT NULL AUTO_INCREMENT,
  transaction_id INT NOT NULL,
  deliverer_id INT NOT NULL,
  bid DOUBLE NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (transaction_id) REFERENCES transaction(id),
  FOREIGN KEY (deliverer_id) REFERENCES user(id)
);