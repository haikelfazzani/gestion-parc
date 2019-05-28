"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const car_controller_1 = require("../controllers/car.controller");
class CarRoutes {
    constructor() {
        this.router = express.Router();
        this.getAllCars();
        this.getCarByIdRoute();
    }
    getAllCars() {
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield car_controller_1.carController.getAllCars(req, res);
        }));
    }
    getCarByIdRoute() {
        this.router.get("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () { return yield car_controller_1.carController.getCarById(req, res); }));
    }
}
exports.carRoutes = new CarRoutes().router;
//# sourceMappingURL=car.routes.js.map