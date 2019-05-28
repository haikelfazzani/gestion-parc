const express = require("express"),
    authMiddleware = require('../middlewares/auth.middleware'),
    router = express.Router();

router.get("/", authMiddleware.redirectLogin, (req, res) => {
    res.render("vehicules/index");
});

/** Add vehicule to database */
router.get("/ajout", authMiddleware.redirectLogin, (req, res) => {
    res.render("vehicules/ajout")
});


router.post("/ajout", authMiddleware.redirectLogin, (req, res) => {

});



/** Update vehicule */
router.get("/update", authMiddleware.redirectLogin, (req, res) => {
    res.render("vehicules/ajout")
});

router.post("/update", authMiddleware.redirectLogin, (req, res) => {

});



/** Delete vehicule from database */
router.get("/delete", authMiddleware.redirectLogin, (req, res) => {
    res.render("vehicules/ajout")
});

router.post("/delete", authMiddleware.redirectLogin, (req, res) => {

});



/** Get all vehicules from database */
router.get("/list", (req, res) => {
    utilisateurController.getAll(req, res);
});


module.exports = router;