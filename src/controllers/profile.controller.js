const utilisateurDao = require("../dao/utilisateur.dao");

const imgBase = "data:image/png;base64,";

class ProfileController {

    async index(req, res) {

        const { userInfo } = req.session;

        await utilisateurDao.getAvatar(userInfo.id, async (resolve) => {

            let avatar = resolve.data[0] && resolve.data[0].avatar.length > 5 ?
                imgBase + resolve.data[0].avatar : "/img/profile.png";

            await res.render("profile/index", { avatar });
        });
    }

    /** Modification de mot de passe de profile */
    async modifier(req, res) {
        let { email, password } = req.body;

        await utilisateurDao.update(email, password, async (resolve) => {
            await res.render("profile/index", { msg: resolve.error || resolve.data });
        });
    }


    async modifierAvatar(req, res) {
        const { userInfo } = req.session;
        const avatar = req.file.buffer.toString("base64");

        await utilisateurDao.modifierAvatar(avatar, userInfo.id, async (resolve) => {
            await res.redirect("/profile");
        });
    }

}

module.exports = new ProfileController();
