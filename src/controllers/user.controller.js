const userDao = require("../dao/utilisateur.dao");
const Utilisateur = require("../models/Utilisateur.model");
const { getActionName } = require("../service/url.service");

class UserController {

    async addUser(req, res) {
        const { nom, email, password, division, role } = req.body;

        const user = new Utilisateur(
            nom.trim(),
            email.trim(),
            password.trim(),
            division.trim(),
            role.trim()
        );

        await userDao.addUser(user, async (resolve) => {
            await res.render("users/add-user",
                { msg: resolve.data || resolve.error }
            );
        });

    }

    async updateUser(req, res) {
        const { nom, email, password, division, role } = req.body;

        const user = new Utilisateur(
            nom.trim(),
            email.trim(),
            password.trim(),
            division.trim(),
            role.trim()
        );

        await userDao.updateUser(user, async (resolve) => {
            await res.render("users/update-user",
                { msg: resolve.data || resolve.error }
            );
        });
    }

    async getUserByEmail(req, res) {
        let userEmail = req.query.u;

        await userDao.isExist(userEmail, async (resolve) => {

            await res.render(`users/${getActionName(req)}-user`, {
                msg: resolve.error,
                data: resolve.data
            });
        });

    }

    async getUsers(req, res) {
        await userDao.getUsers(async (resolve) => {
            await res.render("users/list-users",
                { msg: resolve.error, data: resolve.data }
            );
        });
    }


    async deleteUser(req, res) {

        const { email } = req.body;

        await userDao.deleteUser(email, async (resolve) => {
            await res.render("users/delete-user",
                { msg: resolve.error || resolve.data }
            );
        });
    }
}


module.exports = new UserController();
