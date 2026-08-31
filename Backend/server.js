const express = require('express');
const path = require('path');
const { sql, poolPromise } = require('./db');
require('dotenv').config();

const app = express();
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

        const data = recordsets.length > 1 ? recordsets[0] : (recordsets.length === 1 && !recordsets[0][0]?.Response_Status ? recordsets[0] : null);

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

// 2. GET or POST /api/fetch to retrieve all products with joined category & images
app.all('/api/fetch', async (req, res) => {
    try {
        const pool = await poolPromise;
        if (!pool) {
            return res.status(500).json({
                success: false,
                error: 'Database connection is not available.'
            });
        }

        const proc_name = req.body?.proc_name || req.query?.proc_name || 'product';
        const condition = req.body?.condition || req.query?.condition || null;
        const filters = req.body?.filters || (Object.keys(req.query || {}).length > 0 ? req.query : null);
        const jsonStr = filters ? JSON.stringify(filters) : null;

        const request = pool.request();
        request.input('proc_name', sql.NVarChar(50), proc_name);
        request.input('JSONstr', sql.NVarChar(sql.MAX), jsonStr);
        request.input('Condition', sql.NVarChar(255), condition !== null ? String(condition) : null);

        const result = await request.execute('dbo.SP_Fetchdata');

        const recordsets = result.recordsets;
        const statusRecord = recordsets.length > 0 ? recordsets[recordsets.length - 1] : null;
        const status = statusRecord && statusRecord[0] ? statusRecord[0].Response_Status : 'OK';

        if (typeof status === 'string' && status.startsWith('ERROR')) {
            return res.status(400).json({
                success: false,
                status: status
            });
        }

        let data = recordsets.length > 1
            ? recordsets[0]
            : (recordsets.length === 1 && !recordsets[0][0]?.Response_Status ? recordsets[0] : []);

        // Parse images_json string into a clean array of image objects
        if (Array.isArray(data)) {
            data = data.map(item => {
                if (item.images_json) {
                    try {
                        item.images = JSON.parse(item.images_json);
                    } catch (e) {
                        item.images = [];
                    }
                    delete item.images_json;
                } else {
                    item.images = [];
                }
                return item;
            });
        }

        return res.status(200).json({
            success: true,
            total: data.length,
            data: data
        });

    } catch (err) {
        console.error('[Fetch Error]:', err.message);
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// 3. Static assets & HTML views
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
    console.log(`API Fetch Endpoint: http://localhost:${PORT}/api/fetch`);
});