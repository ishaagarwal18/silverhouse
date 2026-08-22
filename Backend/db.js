const sql = require('mssql/msnodesqlv8');
require('dotenv').config();

const server = process.env.DB_SERVER || '.\\SQLEXPRESS';
const database = process.env.DB_NAME || 'SilverHouse';
const connectionString = (process.env.DB_PASSWORD && process.env.DB_PASSWORD.trim() !== '')
    ? `Server=${server};Database=${database};User Id=${process.env.DB_USER};Password=${process.env.DB_PASSWORD};Encrypt=false;TrustServerCertificate=true;`
    : `Driver={ODBC Driver 17 for SQL Server};Server=${server};Database=${database};Trusted_Connection=yes;`;

const poolPromise = new sql.ConnectionPool({ connectionString })
    .connect()
    .then((pool) => {
        console.log(`[Database] Successfully connected to MSSQL Database '${database}' on '${server}'`);
        return pool;
    })
    .catch((err) => {
        console.error('[Database Error] Connection failed:', err.message);
    });

module.exports = {
    sql,
    poolPromise,
};
