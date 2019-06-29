const userDao = require("../dao/utilisateur.dao");
const imagesDao = require("../dao/images.dao");

class ProfileController {

  async index(req, res) {
    await res.render("profile/index");
  }

  /** Modification de mot de passe de profile */
  async updateUserPassword(req, res) {

    let { email, password } = req.body;
    let { avatar } = req.session;

    await userDao.updateUserPassword(email, password, async (resolve) => {
      await res.render("profile/index", { msg: resolve.error || resolve.data, avatar });
    });
  }


  async updateAvatar(req, res) {
    const { id_utilisateur } = req.session.userInfo;
    const avatar = req.file.buffer.toString("base64");

    await imagesDao.updateAvatar(id_utilisateur, avatar, async (resolve) => {
      await res.redirect("/profile");
    });
  }

  async addAvatar(req, res) {
    const { id_utilisateur } = req.session.userInfo;
    const avatar = req.file.buffer.toString("base64");

    await imagesDao.addAvatar(id_utilisateur, avatar, async (resolve) => {
      await res.redirect("/profile");
    });
  }
}

module.exports = new ProfileController();
