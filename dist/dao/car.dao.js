"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CarDao {
    constructor() {
        // just testing
        this.cars = [{ name: 'golf' }, { name: 'fiat' }, { name: 'bmw' }];
    }
    getAllCars(resolve) {
        resolve({ error: '', data: this.cars });
    }
    getCarByName(name, resolve) {
        resolve({ error: '', data: this.cars.find((c) => c.name === name) });
    }
}
exports.cardDao = new CarDao();
//# sourceMappingURL=car.dao.js.map