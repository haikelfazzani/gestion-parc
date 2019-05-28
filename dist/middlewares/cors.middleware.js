"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
class CorsMiddleware {
    constructor() {
        this.corsOptions = this.setCorsOptions();
        this.cors = cors(this.corsOptions);
    }
    setCorsOptions() {
        let whitelist = ['http://www.example.com', 'http://localhost:3000', 'localhost:3000'];
        return {
            origin: function (origin, callback) {
                if (whitelist.indexOf(origin) !== -1) {
                    callback(null, true);
                }
                else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            methods: ['GET', 'PUT', 'POST'],
            allowedHeaders: ['Content-Type', 'Authorization']
        };
    }
}
exports.default = new CorsMiddleware().cors;
//# sourceMappingURL=cors.middleware.js.map