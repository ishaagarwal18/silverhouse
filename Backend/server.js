const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { sql, poolPromise } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Root Endpoint
app.get("/", (req, res) => {
    res.send("Welcome to SilverHouse API");
});

// Health Check Endpoint
app.get("/api/health", async (req, res) => {
    try {
        const pool = await poolPromise;
        if (pool) {
            res.json({ status: "OK", message: "Backend & Database running smoothly!", db: process.env.DB_NAME });
        } else {
            res.status(500).json({ status: "ERROR", message: "Database connection not ready" });
        }
    } catch (err) {
        res.status(500).json({ status: "ERROR", error: err.message });
    }
});

// =====================================
// GET ROUTES
// =====================================

// GET Categories
const getCategoriesHandler = async (req, res) => {
    try {
        const pool = await poolPromise;
        const query = `SELECT * FROM category`;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ status: "ERROR", error: err.message });
    }
};
app.get("/api/categories", getCategoriesHandler);

// GET Make Master
app.get("/api/make-master", async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM make_master");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ status: "ERROR", error: err.message });
    }
});

// GET Products (Joined with Category, Make Master, and Images)
const getProductsHandler = async (req, res) => {
    try {
        const pool = await poolPromise;
        const query = `
      SELECT 
        p.*, 
        c.name AS category_name, c.slug AS category_slug,
        m.type AS make_type,
        STRING_AGG(i.image_url, ',') AS image_urls
      FROM product p
      LEFT JOIN category c ON p.category_id = c.category_id
      LEFT JOIN make_master m ON p.m_id = m.m_id
      LEFT JOIN product_image pi ON p.product_id = pi.product_id
      LEFT JOIN image i ON pi.image_id = i.image_id
      GROUP BY 
        p.product_id, p.category_id, p.m_id, p.purity, p.weight, p.title, p.description, 
        p.price, p.discount, p.quantity, p.ideal_for, p.packaging, p.labour_cost, p.actual_cost, 
        c.name, c.slug, m.type
    `;
        const result = await pool.request().query(query);

        // Format image_urls into array
        const formatted = result.recordset.map(item => ({
            ...item,
            images: item.image_urls ? item.image_urls.split(',') : []
        }));

        res.json(formatted);
    } catch (err) {
        res.status(500).json({ status: "ERROR", error: err.message });
    }
};
app.get("/api/products", getProductsHandler);

// GET Single Product by ID
app.get("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;
        const query = `
      SELECT 
        p.*, 
        c.name AS category_name, c.slug AS category_slug,
        m.type AS make_type,
        STRING_AGG(i.image_url, ',') AS image_urls
      FROM product p
      LEFT JOIN category c ON p.category_id = c.category_id
      LEFT JOIN make_master m ON p.m_id = m.m_id
      LEFT JOIN product_image pi ON p.product_id = pi.product_id
      LEFT JOIN image i ON pi.image_id = i.image_id
      WHERE p.product_id = @id
      GROUP BY 
        p.product_id, p.category_id, p.m_id, p.purity, p.weight, p.title, p.description, 
        p.price, p.discount, p.quantity, p.ideal_for, p.packaging, p.labour_cost, p.actual_cost, 
        c.name, c.slug, m.type
    `;
        const result = await pool.request().input("id", sql.Int, id).query(query);
        if (result.recordset.length === 0) {
            return res.status(404).json({ status: "ERROR", error: "Product not found" });
        }

        const item = result.recordset[0];
        res.json({
            ...item,
            images: item.image_urls ? item.image_urls.split(',') : []
        });
    } catch (err) {
        res.status(500).json({ status: "ERROR", error: err.message });
    }
});

// =====================================
// POST ROUTES (INSERT DATA)
// =====================================

// POST Category (Supports single object or array of objects)
const postCategoryHandler = async (req, res) => {
    try {
        const pool = await poolPromise;
        const categoriesList = Array.isArray(req.body) ? req.body : [req.body];

        if (categoriesList.length === 0) {
            return res.status(400).json({ status: "ERROR", error: "Request body cannot be empty" });
        }

        for (const item of categoriesList) {
            const { category_id, name, description, slug, ideal_for } = item;
            if (!category_id || !name || !description || !slug) {
                return res.status(400).json({ status: "ERROR", error: "category_id, name, description, and slug are required" });
            }

            await pool.request()
                .input("category_id", sql.Int, category_id)
                .input("name", sql.VarChar(50), name)
                .input("description", sql.VarChar(100), description)
                .input("slug", sql.VarChar(50), slug)
                .input("ideal_for", sql.VarChar(20), ideal_for || 'ALL')
                .query(`
                    INSERT INTO category (category_id, name, description, slug, ideal_for)
                    VALUES (@category_id, @name, @description, @slug, @ideal_for)
                `);
        }

        res.status(201).json({ status: "OK", message: "Category(ies) added successfully" });
    } catch (err) {
        res.status(500).json({ status: "ERROR", error: err.message });
    }
};
app.post("/api/send/categories", postCategoryHandler);

// POST Make Master
const postMakeMasterHandler = async (req, res) => {
    try {
        const { m_id, type } = req.body;
        if (!m_id || !type) {
            return res.status(400).json({ status: "ERROR", error: "m_id and type are required" });
        }

        const pool = await poolPromise;
        await pool.request()
            .input("m_id", sql.Int, m_id)
            .input("type", sql.VarChar(50), type)
            .query(`
        INSERT INTO make_master (m_id, type)
        VALUES (@m_id, @type)
      `);

        res.status(201).json({ status: "OK", message: "Make master added successfully", m_id });
    } catch (err) {
        res.status(500).json({ status: "ERROR", error: err.message });
    }
};
app.post("/api/send/make-master", postMakeMasterHandler);

// POST Product (Supports single object OR array of objects)
const postProductHandler = async (req, res) => {
    try {
        const pool = await poolPromise;
        const productsList = Array.isArray(req.body) ? req.body : [req.body];

        if (productsList.length === 0) {
            return res.status(400).json({ status: "ERROR", error: "Request body cannot be empty" });
        }

        const addedIds = [];

        for (const item of productsList) {
            const {
                product_id, category_id, m_id, purity, weight, title, description,
                price, discount, quantity, ideal_for, packaging, labour_cost, actual_cost,
                image_id, image_url
            } = item;

            if (
                product_id == null || category_id == null || !purity || !weight || !title || !description ||
                price == null || quantity == null || !ideal_for || actual_cost == null
            ) {
                return res.status(400).json({ status: "ERROR", error: `Missing required fields for product_id: ${product_id || 'unknown'}` });
            }

            // Verify category_id exists in category table
            const checkCat = await pool.request()
                .input("category_id", sql.Int, category_id)
                .query("SELECT category_id FROM category WHERE category_id = @category_id");
            if (checkCat.recordset.length === 0) {
                return res.status(400).json({
                    status: "ERROR",
                    error: `Category ID ${category_id} does not exist in database. Please insert category ${category_id} first!`
                });
            }

            // Verify m_id exists in make_master table
            let validMId = null;
            if (m_id) {
                const checkMake = await pool.request()
                    .input("m_id", sql.Int, m_id)
                    .query("SELECT m_id FROM make_master WHERE m_id = @m_id");
                if (checkMake.recordset.length > 0) {
                    validMId = m_id;
                }
            }

            // 1. Insert Product
            const query = `
              INSERT INTO product (
                product_id, category_id, m_id, purity, weight, title, description,
                price, discount, quantity, ideal_for, packaging, labour_cost, actual_cost
              ) 
              VALUES (
                @product_id, @category_id, @m_id, @purity, @weight, @title, @description,
                @price, @discount, @quantity, @ideal_for, @packaging, @labour_cost, @actual_cost
              )
            `;
            await pool.request()
                .input("product_id", sql.Int, product_id)
                .input("category_id", sql.Int, category_id)
                .input("m_id", sql.Int, validMId)
                .input("purity", sql.VarChar(30), purity)
                .input("weight", sql.VarChar(30), weight)
                .input("title", sql.VarChar(50), title)
                .input("description", sql.VarChar(200), description)
                .input("price", sql.Decimal(18, 2), price)
                .input("discount", sql.Decimal(4, 2), discount || 0)
                .input("quantity", sql.Int, quantity)
                .input("ideal_for", sql.VarChar(15), ideal_for)
                .input("packaging", sql.VarChar(50), packaging || null)
                .input("labour_cost", sql.Decimal(18, 2), labour_cost || 0)
                .input("actual_cost", sql.Decimal(18, 2), actual_cost)
                .query(query);

            // 2. Insert Image and Junction mapping if image_id & image_url are provided
            if (image_id && image_url) {
                await pool.request()
                    .input("image_id", sql.Int, image_id)
                    .input("image_url", sql.VarChar(500), image_url)
                    .query(`INSERT INTO image (image_id, image_url) VALUES (@image_id, @image_url)`);

                await pool.request()
                    .input("product_id", sql.Int, product_id)
                    .input("image_id", sql.Int, image_id)
                    .query(`INSERT INTO product_image (product_id, image_id) VALUES (@product_id, @image_id)`);
            }

            addedIds.push(product_id);
        }

        res.status(201).json({ status: "OK", message: "Product(s) added successfully", product_ids: addedIds });
    } catch (err) {
        res.status(500).json({ status: "ERROR", error: err.message });
    }
};
app.post("/api/send/products", postProductHandler);

// POST Image & Link to Product
const postImagesHandler = async (req, res) => {
    try {
        const { image_id, product_id, image_url } = req.body;
        if (!image_id || !image_url) {
            return res.status(400).json({ status: "ERROR", error: "image_id and image_url are required" });
        }

        const pool = await poolPromise;

        // Insert into image table
        await pool.request()
            .input("image_id", sql.Int, image_id)
            .input("image_url", sql.VarChar(500), image_url)
            .query(`INSERT INTO image (image_id, image_url) VALUES (@image_id, @image_url)`);

        // If product_id provided, link in product_image
        if (product_id) {
            await pool.request()
                .input("product_id", sql.Int, product_id)
                .input("image_id", sql.Int, image_id)
                .query(`INSERT INTO product_image (product_id, image_id) VALUES (@product_id, @image_id)`);
        }

        res.status(201).json({ status: "OK", message: "Image added and linked successfully", image_id });
    } catch (err) {
        res.status(500).json({ status: "ERROR", error: err.message });
    }
};
app.post("/api/send/images", postImagesHandler);


const deleteproduct = async (req, res) => {
    try {
        const { product_id } = req.params;
        const pool = await poolPromise;
        await pool.request()
            .input('product_id', sql.Int, product_id)
            .query(`
    DELETE FROM product WHERE product_id=@product_id
    `)
        res.status(200).json({ status: "OK", message: 'Product deleted successfully' })
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ status: "ERROR", error: 'Failed to delete product', details: err.message })
    }
}
app.delete('/api/products/delete/:product_id', deleteproduct);

const deletecategories = async (req, res) => {
    try {
        const { category_id } = req.params;
        const pool = await poolPromise;
        await pool.request()
            .input('category_id', sql.Int, category_id)
            .query(`
    DELETE FROM category WHERE category_id=@category_id
    `)
        res.status(200).json({ status: "OK", message: 'Category deleted successfully' })
    } catch (err) {
        console.error('Error deleting category:', err);
        res.status(500).json({ status: "ERROR", error: 'Failed to delete category', details: err.message })
    }
}
app.delete('/api/categories/delete/:category_id', deletecategories);

const deleteimages = async (req, res) => {
    try {
        const { image_id } = req.params;
        const pool = await poolPromise;
        await pool.request()
            .input('image_id', sql.Int, image_id)
            .query(`
    DELETE FROM image WHERE image_id=@image_id
    `)
        res.status(200).json({ status: "OK", message: 'Image deleted successfully' })
    } catch (err) {
        console.error('Error deleting image:', err);
        res.status(500).json({ status: "ERROR", error: 'Failed to delete image', details: err.message })
    }
}
app.delete('/api/images/delete/:image_id', deleteimages);


app.listen(PORT, () => {
    console.log(`[Server] Running on http://localhost:${PORT}`);
});