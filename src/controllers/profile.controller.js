const utilisateurDao = require("../dao/utilisateur.dao");

class ProfileController {

    /** Modification de mot de passe de profile */
    modifier(req, res) {
        let { email, password } = req.body;

        utilisateurDao.update(email, password, (resolve) => {
            return res.render("profile/index", { msg: resolve.error || resolve.data });            
        });
    }

}

module.exports = new ProfileController();
