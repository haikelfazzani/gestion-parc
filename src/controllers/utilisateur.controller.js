const utilisateurDao = require("../dao/utilisateur.dao");
const Utilisateur = require("../models/Utilisateur.model");
const { getActionName } = require("../service/url.service");

class UtilisateurController {

    async ajouter(req, res) {
        const { nom, email, password, division, role } = req.body;
        const user = new Utilisateur(
            nom.trim(),
            email.trim(),
            password.trim(),
            division.trim(),
            role.trim()
        );

        await utilisateurDao.insert(user, async (resolve) => {
            await res.render("users/ajout",
                { msg: resolve.data || resolve.error }
            );
        });
    }

    async modifier(req, res) {
        const { nom, email, password, division, role } = req.body;

        const user = new Utilisateur(
            nom.trim(),
            email.trim(),
            password.trim(),
            division.trim(),
            role.trim()
        );

        await utilisateurDao.modifier(user, async (resolve) => {
            await res.render("users/modifier",
                { msg: resolve.data || resolve.error }
            );
        });
    }

    async getUserByEmail(req, res) {
        let userEmail = req.query.u;

        await utilisateurDao.isExist(userEmail, async (resolve) => {

            await res.render(`users/${getActionName(req)}`, {
                msg: resolve.error,
                data: resolve.data
            });
        });

    }

    async getAll(req, res) {
        await utilisateurDao.getAll(async (resolve) => {
            await res.render("users/list-users",
                { msg: resolve.error, data: resolve.data }
            );
        });
    }


    async supprimer(req, res) {

        const { email } = req.body;

        await utilisateurDao.delete(email, async (resolve) => {
            await res.render("users/supprimer",
                { msg: resolve.error || resolve.data }
            );
        });
    }
}


module.exports = new UtilisateurController();
