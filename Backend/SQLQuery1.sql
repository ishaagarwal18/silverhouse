-- 1. Category Table
CREATE TABLE category (
    category_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(100) NOT NULL,
    slug VARCHAR(50) NOT NULL,
    ideal_for VARCHAR(20) DEFAULT 'ALL'
);
GO

-- 2. Making Type Master (Optional: Handmade, Machine Made, Casting)
CREATE TABLE make_master (
    m_id INT PRIMARY KEY,
    type VARCHAR(50) NOT NULL
);
GO

-- 3. Product Table
CREATE TABLE product (
    product_id INT PRIMARY KEY,
    category_id INT NOT NULL,
    m_id INT,                                 
    purity VARCHAR(30) NOT NULL,
    weight VARCHAR(30) NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    price DECIMAL(18, 2) NOT NULL,
    discount DECIMAL(4, 2) DEFAULT 0,
    quantity INT NOT NULL,
    ideal_for VARCHAR(15) NOT NULL,
    packaging VARCHAR(50),
    labour_cost DECIMAL(18, 2) DEFAULT 0,
    actual_cost DECIMAL(18, 2) NOT NULL,
    
    CONSTRAINT FK_product_category FOREIGN KEY (category_id) REFERENCES category(category_id),
    CONSTRAINT FK_product_make FOREIGN KEY (m_id) REFERENCES make_master(m_id)
);
GO

CREATE TABLE image (
    image_id INT PRIMARY KEY,
    image_url VARCHAR(500) NOT NULL
);

CREATE TABLE product_image (
    product_id INT NOT NULL,
    image_id INT NOT NULL,
    PRIMARY KEY (product_id, image_id),
    CONSTRAINT FK_pi_product FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
    CONSTRAINT FK_pi_image FOREIGN KEY (image_id) REFERENCES image(image_id) ON DELETE CASCADE
);
