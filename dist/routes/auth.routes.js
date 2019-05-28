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
const express = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
class AuthRoutes {
    constructor() {
        this.router = express.Router();
        this.login();
        this.loginCheck();
        this.logout();
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.router.get('/login', auth_middleware_1.authMiddleware.redirectHome, (req, res) => __awaiter(this, void 0, void 0, function* () {
                return res.render("login");
            }));
        });
    }
    loginCheck() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.router.post('/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
                auth_middleware_1.authMiddleware.isUserExist(req, res);
            }));
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.router.get('/logout', (req, res) => __awaiter(this, void 0, void 0, function* () {
                req.session.destroy();
                req.session = null;
                res.locals = null;
                res.redirect("/auth/login");
            }));
        });
    }
}
exports.authRoutes = new AuthRoutes().router;
//# sourceMappingURL=auth.routes.js.map