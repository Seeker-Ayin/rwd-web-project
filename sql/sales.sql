CREATE DATABASE IF NOT EXISTS sales_demo
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE sales_demo;

DROP TABLE IF EXISTS sales;

CREATE TABLE sales (
    sale_id INT PRIMARY KEY,
    sale_date DATE NOT NULL,
    product_id VARCHAR(20) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    channel VARCHAR(50) NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,
    quantity INT NOT NULL,
    returned_quantity INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_sale_date (sale_date),
    INDEX idx_product_id (product_id),
    INDEX idx_category (category),
    INDEX idx_channel (channel)
);
