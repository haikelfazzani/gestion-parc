import * as express from "express";
import { authMiddleware } from '../middlewares/auth.middleware';

class MainRoute {

  public router: express.Router = express.Router();

  constructor() {
    this.mainRoute();
  }

  async mainRoute() {
    await this.router.get("/", authMiddleware.redirectLogin, 
    async (req: express.Request, res: express.Response) => {      
      res.render("index");
    });
  }

}

export const mainRoutes = new MainRoute().router;