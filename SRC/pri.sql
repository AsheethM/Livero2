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
  #role INT NOT NULL COMMENT ' 1: customer | 2:shop | 4:deliverer | 3:customer-shop | 5: customer-deliverer | 6: shop-deliverer | 7 : all roles',
  creation_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  lastlogin TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)ENGINE=InnoDB;

INSERT INTO user (id, email, password, lastname, firstname, birthdate, phone)
VALUES
  (1, 'regis.titus@epita.fr', 'test', 'Regis', 'Titus', '1995-12-28', '0699027889'),
  (2, 'yvael.sehil@epita.fr', 'test', 'Sehil', 'Yvael', '1993-10-23', '0888888888'),
  (3, 'nicolas.pelletier@epita.fr', 'test', 'Pelletier', 'Nicolas', '1993-10-23', '0888888888');

CREATE TABLE IF NOT EXISTS deliverer
(
  id INT NOT NULL,
  vehicule VARCHAR(255) NOT NULL ,
  licence BOOLEAN NOT NULL,
  picture VARCHAR(1023) NOT NULL ,
  rating INT NOT NULL DEFAULT 5,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES user (id) ON DELETE CASCADE
)ENGINE=InnoDB;

INSERT INTO deliverer (id, vehicule, licence, picture)
VALUES
  (2, 'pieton', false, 'test');


CREATE TABLE IF NOT EXISTS shop
(
  id INT NOT NULL,
  shop_name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL ,
  latitude VARCHAR(255) NOT NULL,
  longitude VARCHAR(255) NOT NULL,
  phone VARCHAR(10) NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  logo VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES user(id) ON DELETE CASCADE
)ENGINE=InnoDB;

INSERT INTO shop (id, shop_name, address, latitude, longitude, phone, logo)
VALUES
  (1, 'Regis Shop', 'test_address', '100', '100', '1111111111', 'test');


CREATE TABLE IF NOT EXISTS shop_schedule
(
  id INT NOT NULL AUTO_INCREMENT,
  shop_id INT NOT NULL ,
  day VARCHAR(15) NOT NULL ,
  opening_hour TIME NOT NULL ,
  closing_hour TIME NOT NULL ,
  PRIMARY KEY (id),
  FOREIGN KEY (shop_id) REFERENCES shop(id)
)ENGINE=InnoDB;

INSERT INTO shop_schedule (id, shop_id, day, opening_hour, closing_hour) VALUES
  (1, 1, 'monday', '08:00', '20:00');


CREATE TABLE IF NOT EXISTS product
(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL ,
  shop_id INT NOT NULL ,
  description VARCHAR(255) NOT NULL DEFAULT '',
  price DOUBLE NOT NULL ,
  PRIMARY KEY (id),
  FOREIGN KEY (shop_id) REFERENCES shop(id) ON DELETE CASCADE,
  UNIQUE (shop_id, product_name)
)ENGINE=InnoDB;

INSERT INTO product (product_name, shop_id, description, price) VALUES
  ('PS4', 1, 'Console', 300),
  ('Xbox3One', 1, 'Console', 250),
  ('Wii', 1, 'Console', 300);

CREATE TABLE IF NOT EXISTS transaction
(
  id INT NOT NULL AUTO_INCREMENT,
  customer_id INT NOT NULL ,
  customer_lat VARCHAR(255) NOT NULL DEFAULT  '',
  customer_long VARCHAR(255) NOT NULL DEFAULT  '',
  dest_address VARCHAR(255) NOT NULL DEFAULT  '',
  description VARCHAR(255) NOT NULL DEFAULT '' COMMENT 'Message of the customer when he creates the transaction',
  shop_id INT NOT NULL,
  deliverer_id INT,
  customer_token VARCHAR(255) NOT NULL DEFAULT '',
  shop_token VARCHAR(255) NOT NULL DEFAULT '',
  order_price DOUBLE NOT NULL ,
  deliverer_price DOUBLE,
  status INT NOT NULL DEFAULT  1 COMMENT '1: After Creation of Transaction, 2: After Shop Confirmation, 3: After Finding Deliverer, 4: After Customer Confirmation , 5:Afer Vendor QRCode has been scanned, 6: Transaction Finished',
  isComplete BOOLEAN DEFAULT true,
  delivery_rating INT NOT NULL DEFAULT 5,
  shop_rating INT NOT NULL DEFAULT 5,
  timer DATETIME NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (customer_id) REFERENCES user(id) ON DELETE CASCADE ,
  FOREIGN KEY (shop_id) REFERENCES shop(id) ON DELETE CASCADE ,
  FOREIGN KEY (deliverer_id) REFERENCES deliverer(id) ON DELETE CASCADE
)ENGINE=InnoDB;

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
  FOREIGN KEY (deliverer_id) REFERENCES user(id) ON DELETE CASCADE ,
  FOREIGN KEY (transaction_id) REFERENCES transaction(id) ON DELETE CASCADE
)ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS transaction_product
(
  id INT NOT NULL AUTO_INCREMENT,
  product_id INt NOT NULL,
  transaction_id INT NOT NULL,
  customer_quantity INT NOT NULL,
  shop_quantity INT NOT NULL ,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE ,
  FOREIGN KEY (transaction_id) REFERENCES transaction(id) ON DELETE CASCADE,
  UNIQUE (product_id, transaction_id)
)ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS bidding
(
  id INT NOT NULL AUTO_INCREMENT,
  transaction_id INT NOT NULL,
  deliverer_id INT NOT NULL,
  bid DOUBLE NOT NULL,
  time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (transaction_id) REFERENCES transaction(id) ON DELETE CASCADE ,
  FOREIGN KEY (deliverer_id) REFERENCES user(id) ON DELETE CASCADE,
  UNIQUE (transaction_id, deliverer_id)
)ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS dispute
(
  id INT NOT NULL AUTO_INCREMENT,
  transaction_id INT NOT NULL ,
  motive VARCHAR(255) NOT NULL ,
  comment TEXT NOT NULL ,
  isClosed BOOLEAN NOT NULL DEFAULT false,
  PRIMARY KEY (id),
  FOREIGN KEY (transaction_id) REFERENCES transaction(id) ON DELETE CASCADE
)ENGINE=InnoDB;