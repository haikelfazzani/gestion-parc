
const utilisateurDao = require("../dao/utilisateur.dao");
const Utilisateur = require("../models/Utilisateur.model");

class UtilisateurController {

    ajouter(req, res) {
        let { nom, email, password, role } = req.body;
        let user = new Utilisateur(nom, email, password, role);

        utilisateurDao.insert(user, (resolve) => {            
            return res.render("users/ajout", { msg: resolve.data || resolve.error });
        });
    }

    getAll(req, res) {
        utilisateurDao.getAll((resolve) => {
            return res.render("users/list-users", { msg: resolve.error, data: resolve.data });
        });
    }

}

const utilisateurController = new UtilisateurController();
module.exports = utilisateurController;