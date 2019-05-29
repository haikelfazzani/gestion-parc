
function redirectLogin(req, res, next) {
    if (!req.session.userInfo) {
        res.redirect("/auth/login");
        return;
    }
    else next();
}

function redirectHome(req, res, next) {
    if (req.session.userInfo) {
        res.redirect("/");
        return;
    }
    else next();
}

module.exports = { redirectLogin, redirectHome };
