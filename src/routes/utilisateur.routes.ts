import utilisateurController from '../controllers/utilisateur.controller';
import * as express from "express";
import { authMiddleware } from '../middlewares/auth.middleware';

class UtilisateurRoute {

  public router: express.Router = express.Router();

  constructor() {
    this.main();
    this.displayAddUser();

    this.add();
    this.getAll();
    this.update();
    this.delete();
  }

  async main() {
    await this.router.get("/", authMiddleware.redirectLogin, 
    async (req: express.Request, res: express.Response) => {
      //await utilisateurController.root(req, res)
      res.render("users/index");
    });
  }

  async displayAddUser() {
    await this.router.get("/ajout", authMiddleware.redirectLogin, 
    async (req: express.Request, res: express.Response) => {
      res.render("users/ajout")
    });
  }

  async add() {
    await this.router.post("/ajout", authMiddleware.redirectLogin, 
    async (req: express.Request, res: express.Response) => {
      await utilisateurController.ajouter(req, res)
    });
  }

  /** Modifier un utilisateur */
  async update() {

  }

  /** Supprimer un utilisateur */
  async delete() {

  }

  /** Lister tous les utlisateurs */
  async getAll() {
    await this.router.get("/list", async (req: express.Request, res: express.Response) => {
      utilisateurController.getAll(req, res);
    });
  }

}

export const utilisateurRoute = new UtilisateurRoute().router;