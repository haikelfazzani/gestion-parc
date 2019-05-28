import { Request, Response } from "express";
import utilisateurDao from "../dao/utilisateur.dao";
import { Utilisateur, IUtilisateur } from "../models/IUtilisateur.model";
import { IResolve } from "../models/IResolve.model";

class UtilisateurController {

    private user: IUtilisateur;

    public async ajouter(req: Request, res: Response) {
        let { nom, email, password, role } = req.body;

        this.user = new Utilisateur(nom, email, password, role);

        await utilisateurDao.insert(this.user, (resolve: IResolve) => {
            res.render("users/ajout", { msg: resolve.data || resolve.error });
        });
    }

    public async getAll(req: Request, res: Response) {
        await utilisateurDao.getAll((resolve: IResolve) => {
            res.render("users/list-users", { msg: resolve.error, data: resolve.data });
        });
    }

}

const utilisateurController = new UtilisateurController();
export default utilisateurController;