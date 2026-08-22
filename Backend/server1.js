const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sql, poolPromise } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', async (req, res) => {
  try {
    const pool = await poolPromise;
    if (pool) {
      res.json({ status: 'OK', message: 'Backend & Database running smoothly!', db: process.env.DB_NAME });
    } else {
      res.status(500).json({ status: 'ERROR', message: 'Database connection not ready' });
    }
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// =====================================
// GET ROUTES (FETCH DATA)
// =====================================

// GET Categories (Supports both /api/categories and /api/send/categories)
const getCategoriesHandler = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM category');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Failed to fetch categories', details: err.message });
  }
};
app.get('/api/categories', getCategoriesHandler);
app.get('/api/send/categories', getCategoriesHandler);

// GET Products (Supports both /api/products and /api/send/products)
const getProductsHandler = async (req, res) => {
  try {
    const pool = await poolPromise;
    const query = `
      SELECT p.*, c.name AS category_name, c.slug AS category_slug, img.image1, img.image2
      FROM product p
      LEFT JOIN category c ON p.category_id = c.category_id
      LEFT JOIN image img ON p.product_id = img.product_id
    `;
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
};
app.get('/api/products', getProductsHandler);
app.get('/api/send/products', getProductsHandler);

// GET Single Product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('productId', sql.Int, id)
      .query(`
        SELECT p.*, c.name AS category_name, c.slug AS category_slug, img.image1, img.image2
        FROM product p
        LEFT JOIN category c ON p.category_id = c.category_id
        LEFT JOIN image img ON p.product_id = img.product_id
        WHERE p.product_id = @productId
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Failed to fetch product details', details: err.message });
  }
});

// =====================================
// POST ROUTES (INSERT DATA)
// =====================================

// POST Categories (Supports both /api/categories and /api/send/categories)
const postCategoryHandler = async (req, res) => {
  try {
    const { category_id, name, description, slug, ideal_for } = req.body;
    if (!category_id || !name || !description || !slug) {
      return res.status(400).json({ error: 'category_id, name, description, and slug are required' });
    }

    const pool = await poolPromise;
    await pool.request()
      .input('category_id', sql.Int, category_id)
      .input('name', sql.VarChar(50), name)
      .input('description', sql.VarChar(100), description)
      .input('slug', sql.VarChar(20), slug)
      .input('ideal_for', sql.VarChar(20), ideal_for || null)
      .query(`
        INSERT INTO category (category_id, name, description, slug, ideal_for)
        VALUES (@category_id, @name, @description, @slug, @ideal_for)
      `);

    res.status(201).json({ message: 'Category created successfully', category_id });
  } catch (err) {
    console.error('Error inserting category:', err);
    res.status(500).json({ error: 'Failed to create category', details: err.message });
  }
};
app.post('/api/categories', postCategoryHandler);
app.post('/api/send/categories', postCategoryHandler);

// POST Products (Supports both /api/products and /api/send/products)
const postProductHandler = async (req, res) => {
  try {
    const {
      product_id,
      category_id,
      purity,
      weight,
      title,
      description,
      price,
      discount,
      quantity,
      ideal_for,
      packaging,
      labour_cost,
      actual_cost,
      image_id,
      image1,
      image2
    } = req.body;

    if (!product_id || !category_id || !purity || !weight || !title || !description || price == null || quantity == null || !ideal_for || actual_cost == null) {
      return res.status(400).json({
        error: 'Missing required product fields: product_id, category_id, purity, weight, title, description, price, quantity, ideal_for, actual_cost'
      });
    }

    const pool = await poolPromise;

    // 1. Insert Product
    await pool.request()
      .input('product_id', sql.Int, product_id)
      .input('category_id', sql.Int, category_id)
      .input('purity', sql.VarChar(30), purity)
      .input('weight', sql.VarChar(30), weight)
      .input('title', sql.VarChar(50), title)
      .input('description', sql.VarChar(200), description)
      .input('price', sql.Decimal(18, 2), price)
      .input('discount', sql.Decimal(4, 2), discount || 0)
      .input('quantity', sql.Int, quantity)
      .input('ideal_for', sql.VarChar(15), ideal_for)
      .input('packaging', sql.VarChar(50), packaging || null)
      .input('labour_cost', sql.Decimal(18, 2), labour_cost || 0)
      .input('actual_cost', sql.Decimal(18, 2), actual_cost)
      .query(`
        INSERT INTO product (
          product_id, category_id, purity, weight, title, description,
          price, discount, quantity, ideal_for, packaging, labour_cost, actual_cost
        )
        VALUES (
          @product_id, @category_id, @purity, @weight, @title, @description,
          @price, @discount, @quantity, @ideal_for, @packaging, @labour_cost, @actual_cost
        )
      `);

    // 2. Insert Image if provided
    if (image1 && image_id) {
      await pool.request()
        .input('image_id', sql.Int, image_id)
        .input('product_id', sql.Int, product_id)
        .input('image1', sql.VarChar(100), image1)
        .input('image2', sql.VarChar(100), image2 || null)
        .query(`
          INSERT INTO image (image_id, product_id, image1, image2)
          VALUES (@image_id, @product_id, @image1, @image2)
        `);
    }

    res.status(201).json({ message: 'Product created successfully', product_id });
  } catch (err) {
    console.error('Error inserting product:', err);
    res.status(500).json({ error: 'Failed to create product', details: err.message });
  }
};
app.post('/api/products', postProductHandler);
app.post('/api/send/products', postProductHandler);

// POST Images (Supports both /api/images and /api/send/images)
const postImageHandler = async (req, res) => {
  try {
    const { image_id, product_id, image1, image2 } = req.body;
    if (!image_id || !product_id || !image1) {
      return res.status(400).json({ error: 'image_id, product_id, and image1 are required' });
    }

    const pool = await poolPromise;
    await pool.request()
      .input('image_id', sql.Int, image_id)
      .input('product_id', sql.Int, product_id)
      .input('image1', sql.VarChar(100), image1)
      .input('image2', sql.VarChar(100), image2 || null)
      .query(`
        INSERT INTO image (image_id, product_id, image1, image2)
        VALUES (@image_id, @product_id, @image1, @image2)
      `);

    res.status(201).json({ message: 'Image added successfully', image_id });
  } catch (err) {
    console.error('Error inserting image:', err);
    res.status(500).json({ error: 'Failed to add image', details: err.message });
  }
};
app.post('/api/images', postImageHandler);
app.post('/api/send/images', postImageHandler);


const deleteproduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('product_id', sql.Int, product_id)
      .query(`
    DELETE FROM product WHERE product_id=@product_id
    `)
    res.status(200).json({ message: 'Product deleted successfully' })
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product', details: err.message })
  }
}
app.delete('/api/products/delete/:product_id', deleteproduct);
// app.delete('/api/send/products/:product_id', deleteproduct);

// Start Server
app.listen(PORT, () => {
  console.log(`[Server] SilverHouse API server running on http://localhost:${PORT}`);
});


