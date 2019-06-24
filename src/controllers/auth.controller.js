const userDao = require("../dao/utilisateur.dao");
const staticFiles = require("../config/static.config");

class AuthController {

  async login(req, res) {

    let { email, password } = req.body;

    await userDao.getOneByEmail(email, password, async (resolve) => {

      if (resolve.data && resolve.data.length > 0) {

        req.session.userInfo = resolve.data[0];

        await res.cookie('user', JSON.stringify(resolve.data[0]),
          { expires: new Date(Date.now() + 900000) })
          .redirect("/");

      }
      else await res.render("login", { msg: resolve.error, staticFiles });      
    });
  }

}


module.exports = new AuthController();
