class AuthMiddleware {

    redirectLogin(req, res, next) {
        if (!req.session.userInfo) {
            res.redirect("/auth/login");
            return;
        }
        else next();
    }

    redirectHome(req, res, next) {
        if (req.session.userInfo) {
            res.redirect("/");
            return;
        }
        else next();
    }

}

const authMiddleware = new AuthMiddleware();
module.exports = authMiddleware;