const express = require('express');
const cors = require('cors');
const path = require('path');
const { sql, poolPromise } = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const fs = require('fs');

// 1. Single unified endpoint handling all operations from forms & API
app.post('/api/data', async (req, res) => {
    try {
        const { proc_name, opr, table_values, condition } = req.body;

        if (!proc_name || !opr) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: proc_name and opr are mandatory.'
            });
        }

        const jsonStr = table_values ? JSON.stringify({ table_values }) : null;

        const pool = await poolPromise;
        if (!pool) {
            return res.status(500).json({
                success: false,
                error: 'Database connection is not available.'
            });
        }

        // Special handler: When selecting products, use SP_Fetchdata to guarantee full joined dataset (categories & images)
        if (proc_name.toLowerCase() === 'product' && opr.toUpperCase() === 'SELECT') {
            try {
                const fetchReq = pool.request();
                fetchReq.input('proc_name', sql.NVarChar(50), 'product');
                fetchReq.input('JSONstr', sql.NVarChar(sql.MAX), jsonStr);
                fetchReq.input('Condition', sql.NVarChar(255), condition !== undefined && condition !== null ? String(condition) : null);

                const fetchResult = await fetchReq.execute('dbo.SP_Fetchdata');
                const recordsets = fetchResult.recordsets;
                let data = recordsets.length > 1
                    ? recordsets[0]
                    : (recordsets.length === 1 && !recordsets[0][0]?.Response_Status ? recordsets[0] : []);

                if (Array.isArray(data)) {
                    data = data.map(item => {
                        if (item.images_json) {
                            try {
                                item.images = JSON.parse(item.images_json);
                            } catch (e) {
                                item.images = [];
                            }
                            delete item.images_json;
                        } else if (!item.images) {
                            item.images = [];
                        }
                        if (!item.product_name && item.title) {
                            item.product_name = item.title;
                        }
                        if (!item.category_name && item.category) {
                            item.category_name = item.category;
                        }
                        return item;
                    });
                }

                return res.status(200).json({
                    success: true,
                    status: 'OK',
                    total: data.length,
                    data: data
                });
            } catch (fetchErr) {
                console.warn('[API Data] SP_Fetchdata execution fallback to SP_GETDATA:', fetchErr.message);
            }
        }

        const request = pool.request();
        request.input('proc_name', sql.NVarChar(50), proc_name);
        request.input('Opr', sql.NVarChar(10), opr);
        request.input('JSONstr', sql.NVarChar(sql.MAX), jsonStr);
        request.input('Condition', sql.NVarChar(255), condition !== undefined && condition !== null ? String(condition) : null);

        const result = await request.execute('dbo.SP_GETDATA');

        const recordsets = result.recordsets;
        const statusRecord = recordsets.length > 0 ? recordsets[recordsets.length - 1] : null;
        const status = statusRecord && statusRecord[0] ? statusRecord[0].Response_Status : 'OK';

        if (typeof status === 'string' && (
            status.startsWith('ERROR') ||
            status.startsWith('VALIDATION') ||
            status.startsWith('SECURITY') ||
            status.startsWith('DATABASE') ||
            status.startsWith('Not Found') ||
            status.startsWith('Constraint Error')
        )) {
            return res.status(400).json({
                success: false,
                status: status
            });
        }

        let data = recordsets.length > 1 ? recordsets[0] : (recordsets.length === 1 && !recordsets[0][0]?.Response_Status ? recordsets[0] : null);

        if (Array.isArray(data)) {
            data = data.map(item => {
                if (item.images_json) {
                    try {
                        item.images = JSON.parse(item.images_json);
                    } catch (e) {
                        item.images = [];
                    }
                    delete item.images_json;
                }
                if (!item.product_name && item.title) {
                    item.product_name = item.title;
                }
                if (!item.category_name && item.category) {
                    item.category_name = item.category;
                }
                return item;
            });
        }

        return res.status(200).json({
            success: true,
            status: status,
            data: data
        });

    } catch (err) {
        console.error('[API Error]:', err.message);
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// 2. Static assets & HTML views
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/catalog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'catalog.html'));
});

app.get('/api/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/:file', (req, res, next) => {
    const file = req.params.file;
    const filePath = path.join(__dirname, 'public', file);
    if (file.endsWith('.html') && fs.existsSync(filePath)) {
        return res.sendFile(filePath);
    }
    next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Admin Dashboard: http://localhost:${PORT}`);
    console.log(`Product Catalog: http://localhost:${PORT}/catalog`);
    console.log(`Data API Endpoint: http://localhost:${PORT}/api/data`);
});