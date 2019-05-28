import { Request, Response, NextFunction } from "express";
import utilisateurDao from "../dao/utilisateur.dao";

class AuthMiddleware {

    async isUserExist(req:any , res:Response) {
        let { email } = req.body;
        await utilisateurDao.getOneByEmail(email , (resolve) => {
            
            if(resolve.data && resolve.data.length > 0) {
                req.session.userInfo = resolve.data[0];
                return res.redirect("/");
            }
            else {
                return res.render("login", { msg : "utilisateur n'existe pas!!"});
            }
        });
    }

    redirectLogin(req: any, res:Response, next:NextFunction) {
        if (!req.session.userInfo) {
            res.redirect("/auth/login");
            return;
        }
        else next();
    }

    redirectHome(req: any, res:Response, next:NextFunction) {
        if (req.session.userInfo) {
            res.redirect("/");
            return;
        }
        else next();
    }

}

export const authMiddleware = new AuthMiddleware();