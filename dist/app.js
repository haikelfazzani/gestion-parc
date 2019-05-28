"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_middleware_1 = require("./middlewares/cors.middleware");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookeParser = require("cookie-parser");
const expressSession = require("express-session");
// Routes
const main_routes_1 = require("./routes/main.routes");
const utilisateur_routes_1 = require("./routes/utilisateur.routes");
const auth_routes_1 = require("./routes/auth.routes");
const Role_enum_1 = require("./models/Role.enum");
class App {
    constructor() {
        this.app = express();
        // cors setup
        this.app.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield this.setHeaderOrigin(req);
            next();
        }));
        // sessions
        this.app.use(expressSession({
            secret: '343ji43j4n3jn4jk3n',
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 60 * 60 * 24 * 1000,
            }
        }));
        this.app.use((req, res, next) => {
            res.locals.role = Role_enum_1.default;
            if (req.session && req.session.userInfo) {
                const { userInfo } = req.session;
                res.locals.userInfo = userInfo;
            }
            next();
        });
        // view engine setup
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'ejs');
        // set path for static assets
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookeParser());
        // Routers
        this.app.use("/auth", cors_middleware_1.default, auth_routes_1.authRoutes);
        this.app.use("/", cors_middleware_1.default, main_routes_1.mainRoutes);
        this.app.use("/utilisateur", cors_middleware_1.default, utilisateur_routes_1.utilisateurRoute);
        this.app.use("*", (req, res) => {
            res.redirect("/");
        });
    }
    setHeaderOrigin(req) {
        req.headers.origin = req.headers.origin || req.headers.host;
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map