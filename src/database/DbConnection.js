const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'LPx4ioQKlk',
    password: 'V638WJNvfq',
    database: 'LPx4ioQKlk'
});

db.connect(function (err) {
    if (err) throw err;
    console.log("connected")
});

module.exports = db;
