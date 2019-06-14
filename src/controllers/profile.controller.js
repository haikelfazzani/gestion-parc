const userDao = require("../dao/user.dao");
const imagesDao = require("../dao/images.dao");

const imgBase = "data:image/png;base64,";

class ProfileController {

    async index(req, res) { // rendering profile image

        const { userInfo } = req.session;

        await imagesDao.getAvatar(userInfo.id_user, async (resolve) => {

            let avatar = resolve.data && (resolve.data[0] && resolve.data[0].avatar.length) > 5 ?
                imgBase + resolve.data[0].avatar : "/img/profile.png";

            req.session.avatar = avatar;

            await res.render("profile/index", { avatar });
        });
    }

    /** Modification de mot de passe de profile */
    async updateUserPassword(req, res) {
        let { email, password } = req.body;
        let { avatar } = req.session;

        await userDao.updateUserPassword(email, password, async (resolve) => {
            await res.render("profile/index",
                { msg: resolve.error || resolve.data, avatar }
            );
        });
    }


    async updateAvatar(req, res) {
        const { userInfo } = req.session;
        const avatar = req.file.buffer.toString("base64");

        await imagesDao.updateAvatar(userInfo.id_user, avatar, async (resolve) => {
            await res.redirect("/profile");
        });
    }

    async addAvatar(req, res) {
        const { userInfo } = req.session;
        const avatar = req.file.buffer.toString("base64");

        await imagesDao.addAvatar(userInfo.id_user, avatar, async (resolve) => {
            await res.redirect("/profile");
        });
    }
}

module.exports = new ProfileController();
