"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require('mysql');
var dbConn = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'LPx4ioQKlk',
    password: 'V638WJNvfq',
    database: 'LPx4ioQKlk'
});
dbConn.connect(function (err) {
    if (err)
        throw err;
    console.log("connected");
});
exports.default = dbConn;
//# sourceMappingURL=DbConnection.js.map