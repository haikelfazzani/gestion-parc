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
const utilisateur_dao_1 = require("../dao/utilisateur.dao");
class AuthMiddleware {
    isUserExist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email } = req.body;
            yield utilisateur_dao_1.default.getOneByEmail(email, (resolve) => {
                if (resolve.data && resolve.data.length > 0) {
                    req.session.userInfo = resolve.data[0];
                    return res.redirect("/");
                }
                else {
                    return res.render("login", { msg: "utilisateur n'existe pas!!" });
                }
            });
        });
    }
    redirectLogin(req, res, next) {
        if (!req.session.userInfo) {
            res.redirect("/auth/login");
            return;
        }
        else
            next();
    }
    redirectHome(req, res, next) {
        if (req.session.userInfo) {
            res.redirect("/");
            return;
        }
        else
            next();
    }
}
exports.authMiddleware = new AuthMiddleware();
//# sourceMappingURL=auth.middleware.js.map