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
const DbConnection_1 = require("../database/DbConnection");
class UtilisateurDao {
    constructor() {
        this.tabelName = "utilisateur";
        this.nomComplet = "nom_complet";
        this.email = "email";
        this.password = "password";
        this.role = "role";
    }
    insert(user, resolve) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `insert into ${this.tabelName} (
            ${this.nomComplet}, ${this.email}, ${this.password}, ${this.role}
        ) 
        values('${user.nomComplet}', '${user.email}', '${user.password}', '${user.role}')`;
            yield DbConnection_1.default.query(sql, (err, rows) => {
                resolve({
                    error: "erreur d'insertion!",
                    data: "un utilisateur a été bien inséré"
                });
            });
        });
    }
    update() { }
    delete() { }
    getOneByEmail(email, resolve) {
        const sql = `select * from ${this.tabelName} where ${this.email} = '${email}' `;
        DbConnection_1.default.query(sql, (err, rows) => {
            resolve({
                error: err,
                data: rows
            });
        });
    }
    getAll(resolve) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `select * from ${this.tabelName}`;
            yield DbConnection_1.default.query(sql, (err, rows) => {
                resolve({
                    error: err,
                    data: rows
                });
            });
        });
    }
}
const utilisateurDao = new UtilisateurDao();
exports.default = utilisateurDao;
//# sourceMappingURL=utilisateur.dao.js.map