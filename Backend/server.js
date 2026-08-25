const express = require('express');
const { sql, poolPromise } = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());

// Single unified route for all stored procedure operations
app.post('/api/data', async (req, res) => {
    try {
        const { proc_name, opr, table_values, condition } = req.body;

        // 1. Basic Parameter Check
        if (!proc_name || !opr) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: proc_name and opr are mandatory.'
            });
        }

        // 2. Format JSON payload for @JSONstr
        const jsonStr = table_values ? JSON.stringify({ table_values }) : null;

        // 3. Connect and Execute Stored Procedure
        const pool = await poolPromise;
        const request = pool.request();

        request.input('proc_name', sql.NVarChar(50), proc_name);
        request.input('Opr', sql.NVarChar(10), opr);
        request.input('JSONstr', sql.NVarChar(sql.MAX), jsonStr);
        request.input('Condition', sql.NVarChar(255), condition !== undefined && condition !== null ? String(condition) : null);

        const result = await request.execute('dbo.SP_GETDATA');

        // 4. Parse Return Sets & Status
        const recordsets = result.recordsets;
        const statusRecord = recordsets[recordsets.length - 1];
        const status = statusRecord && statusRecord[0] ? statusRecord[0].Response_Status : 'OK';

        // Check if SP returned an error status string
        if (typeof status === 'string' && (status.startsWith('ERROR') || status.startsWith('VALIDATION') || status.startsWith('SECURITY') || status.startsWith('DATABASE'))) {
            return res.status(400).json({
                success: false,
                status: status
            });
        }

        // Capture returned query rows (if any)
        const data = recordsets.length > 1 ? recordsets[0] : null;

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});