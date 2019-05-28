var mysql = require('mysql');

var dbConn = mysql.createConnection({
    host     : 'remotemysql.com',
    user     : 'LPx4ioQKlk',
    password : 'V638WJNvfq',
    database : 'LPx4ioQKlk'
});

dbConn.connect(function(err) {
    if (err) throw err;
    console.log("connected")
});

export default dbConn;