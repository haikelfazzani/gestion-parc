const utilisateurDao = require("../dao/utilisateur.dao");
const imagesDao = require("../dao/images.dao");

const imgBase = "data:image/png;base64,";

class ProfileController {

    async index(req, res) { // rendering profile image

        const { userInfo } = req.session;

        await imagesDao.getAvatar(userInfo.id, async (resolve) => {

            let avatar = resolve.data && (resolve.data[0] && resolve.data[0].avatar.length) > 5 ?
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

        await imagesDao.modifierAvatar(userInfo.id, avatar, async (resolve) => {                      
            await res.redirect("/profile");
        });
    }

    async ajouterAvatar(req, res) {
        const { userInfo } = req.session;
        const avatar = req.file.buffer.toString("base64");

        await imagesDao.ajouterAvatar(userInfo.id, avatar, async (resolve) => {                  
            await res.redirect("/profile");
        });
    }
}

module.exports = new ProfileController();
