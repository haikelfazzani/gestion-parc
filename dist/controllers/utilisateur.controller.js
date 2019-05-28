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
const IUtilisateur_model_1 = require("../models/IUtilisateur.model");
class UtilisateurController {
    ajouter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { nom, email, password, role } = req.body;
            this.user = new IUtilisateur_model_1.Utilisateur(nom, email, password, role);
            yield utilisateur_dao_1.default.insert(this.user, (resolve) => {
                res.render("users/ajout", { msg: resolve.data || resolve.error });
            });
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield utilisateur_dao_1.default.getAll((resolve) => {
                res.render("users/list-users", { msg: resolve.error, data: resolve.data });
            });
        });
    }
}
const utilisateurController = new UtilisateurController();
exports.default = utilisateurController;
//# sourceMappingURL=utilisateur.controller.js.map