DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INT default 0,
    stock_quantity INT default 0,
    PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Beef", "Grocery", 10, 20),
("Lamb", "Grocery", 15, 10),
("Speaker", "Home Audio", 150, 8),
("Television", "Home Audio", 650, 10),
("Printer", "Office", 100, 100),
("Iphone", "Communication", 1200, 2000),
("Orange", "grocery", 2, 10000),
("Strawberry", "grocery", 5, 1050),
("PC", "Communication", 1500, 15),
("Monitor", "Home Audio", 125, 10),
("Phone Case", "Phone Accessory", 15, 10);