const express = require("express")
const cors = require("cors")
const { sql, poolPromise } = require('./db');

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 5000;


app.get("", (req, res) => {
    res.send("Welcome")
})

app.get("/api/health", async (req, res) => {
    try {
        const pool = await poolPromise
        if (pool) {
            res.json({ status: 'OK', message: 'Backend & Database running smoothly!', db: process.env.DB_NAME });
        }
        else {
            res.status(500).json({ status: 'ERROR', message: 'Database connection not ready' });
        }
    }
    catch (err) {
        res.status(500).json({ status: 'ERROR', error: err.message });
    }
})


app.get("/api/products", async (req, res) => {
    try {
        const pool = await poolPromise
        const query = `SELECT p.*, c.name AS category_name, c.slug AS category_slug, img.image1, img.image2
                      FROM product p
                      LEFT JOIN category c ON p.category_id = c.category_id
                      LEFT JOIN image img ON p.product_id = img.product_id`;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    }
    catch (err) {
        res.status(500).json({ status: 'ERROR', error: err.message });
    }
})



app.listen(5000, () => {
    console.log("Server is running on port 5000")
})
