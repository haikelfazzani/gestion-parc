
const utilisateurDao = require("../dao/utilisateur.dao");
const Utilisateur = require("../models/Utilisateur.model");

class UtilisateurController {

    async ajouter(req, res) {
        let { nom, email, password, division, role } = req.body;
        let user = new Utilisateur(
            nom.trim(), email.trim(),
            password.trim(), division.trim(),
            role.trim()
        );

        await utilisateurDao.insert(user, (resolve) => {
            return res.render("users/ajout", { msg: resolve.data || resolve.error });
        });
    }

    async getAll(req, res) {
        await utilisateurDao.getAll((resolve) => {
            return res.render("users/list-users", { msg: resolve.error, data: resolve.data });
        });
    }

}


module.exports = new UtilisateurController();
