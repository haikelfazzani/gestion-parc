
const Role = require("../models/Role.enum");

function isAdmin(req, res, next) {

    const { userInfo } = req.session;

    if (userInfo.role !== Role.admin) {
        res.redirect("/");
        return;
    }

    next();
}

module.exports = { isAdmin };
