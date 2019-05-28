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
const utilisateur_controller_1 = require("../controllers/utilisateur.controller");
const express = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
class UtilisateurRoute {
    constructor() {
        this.router = express.Router();
        this.main();
        this.displayAddUser();
        this.add();
        this.getAll();
        this.update();
        this.delete();
    }
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.router.get("/", auth_middleware_1.authMiddleware.redirectLogin, (req, res) => __awaiter(this, void 0, void 0, function* () {
                //await utilisateurController.root(req, res)
                res.render("users/index");
            }));
        });
    }
    displayAddUser() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.router.get("/ajout", auth_middleware_1.authMiddleware.redirectLogin, (req, res) => __awaiter(this, void 0, void 0, function* () {
                res.render("users/ajout");
            }));
        });
    }
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.router.post("/ajout", auth_middleware_1.authMiddleware.redirectLogin, (req, res) => __awaiter(this, void 0, void 0, function* () {
                yield utilisateur_controller_1.default.ajouter(req, res);
            }));
        });
    }
    /** Modifier un utilisateur */
    update() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    /** Supprimer un utilisateur */
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    /** Lister tous les utlisateurs */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.router.get("/list", (req, res) => __awaiter(this, void 0, void 0, function* () {
                utilisateur_controller_1.default.getAll(req, res);
            }));
        });
    }
}
exports.utilisateurRoute = new UtilisateurRoute().router;
//# sourceMappingURL=utilisateur.routes.js.map