"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CarService {
    constructor() { }
    validCarName(name) {
        if (name && name.length > 0) {
            return true;
        }
        return false;
    }
}
exports.carService = new CarService();
//# sourceMappingURL=validator.service.js.map