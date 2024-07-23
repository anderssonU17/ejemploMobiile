const sql = require('mssql');

const dbConfig = {
    user: 'AAAAAA-ISP',
    password: 'AAAAAA-ISP',
    server: '130.211.122.88',
    database: 'AAAAAA-ISP',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Database Connection Failed! Bad Config: ', err);
        throw err;
    });

module.exports = {
    sql,
    poolPromise
};
