const express = require("express"), router = express.Router(),
  { redirectLogin } = require('../middlewares/auth.middleware');

  const imagesDao = require("../dao/images.dao");
  const imgBase = "data:image/png;base64,";

router.get("/", redirectLogin, async (req, res) => {
  
  const { id_utilisateur } = req.session.userInfo;

    await imagesDao.getAvatar(id_utilisateur, async (resolve) => {

      const data = resolve.data;

      let avatar = data && (data[0] && data[0].avatar.length) > 5 ?
        imgBase + data[0].avatar : "/img/profile.png";

      req.session.avatar = avatar;

      await res.render("index", { avatar });
    });
    
});


module.exports = router;