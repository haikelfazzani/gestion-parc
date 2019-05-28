"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MainController {
    root(req, res) {
        return res.status(200).send({
            message: "main route successful!!"
        });
    }
}
exports.mainController = new MainController();
//# sourceMappingURL=main.controller.js.map