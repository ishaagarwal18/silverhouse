const express = require('express');
const { sql, poolPromise } = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/api/data', async (req, res) => {
    try {
        const { proc_name, opr, table_values, condition } = req.body;

        // 1. Mandatory Input Validation
        if (!proc_name || !opr) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: proc_name and opr are mandatory.'
            });
        }

        // 2. Wrap Payload into Expected JSON Structure
        const jsonStr = table_values ? JSON.stringify({ table_values }) : null;

        // 3. Database Connection & Execution
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

        // 4. Response Status Extraction
        const recordsets = result.recordsets;
        const statusRecord = recordsets.length > 0 ? recordsets[recordsets.length - 1] : null;
        const status = statusRecord && statusRecord[0] ? statusRecord[0].Response_Status : 'OK';

        // 5. Handle Validation / Schema / SP Thrown Errors
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

        // Extract primary data output (if any rows returned)
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});