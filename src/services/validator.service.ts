import { ICar } from "models/icar.model";

class CarService {

    constructor() { }

    validCarName(name:string) : boolean {
        if(name && name.length > 0) {
            return true;
        }
        return false;
    }
}

export const carService = new CarService();