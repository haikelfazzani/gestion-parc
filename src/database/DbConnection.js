const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'LPx4ioQKlk',
    password: 'V638WJNvfq',
    database: 'LPx4ioQKlk'
});

db.connect( async (err) => {
    if (err) throw err;
    await console.log("connected")
});

module.exports = db;
