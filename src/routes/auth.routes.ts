import * as express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { Request, Response } from "express";

class AuthRoutes {

  public router: express.Router = express.Router();

  constructor() {
    this.login();
    this.loginCheck();
    this.logout();
  }

  async login() {
    await this.router.get('/login', authMiddleware.redirectHome, async (req: Request, res: Response) => {
      return res.render("login")
    });
  }

  async loginCheck() {
    await this.router.post('/login', async (req: Request, res: Response) => {
      authMiddleware.isUserExist(req, res)
    });
  }


  async logout() {

    await this.router.get('/logout', async (req: any, res: Response) => {
      req.session.destroy();
      req.session = null;
      res.locals = null;
      res.redirect("/auth/login")
    });

  }

}

export const authRoutes = new AuthRoutes().router;