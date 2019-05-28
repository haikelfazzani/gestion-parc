import * as express from "express";
import { carController } from '../controllers/car.controller';

class CarRoutes { // route prefix : /car

  public router: express.Router = express.Router();

  constructor() {
    this.getAllCars();
    this.getCarByIdRoute();
  }

  getAllCars() {
    this.router.get('/', async (req: express.Request, res: express.Response) => {
      await carController.getAllCars(req, res);
    });
  }

  getCarByIdRoute() {
    this.router.get("/:id", async (req: express.Request, res: express.Response) =>
      await carController.getCarById(req, res)
    );
  }

}

export const carRoutes = new CarRoutes().router;