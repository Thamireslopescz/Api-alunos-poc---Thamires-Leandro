"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avaliacaoRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const avaliacaoRoutes = () => {
    const router = (0, express_1.Router)({
        mergeParams: true,
    });
    const controller = new controllers_1.AvaliacaoController();
    router.get("/", controller.list);
    router.post("/", controller.create);
    router.put("/:idAvaliacao", controller.update);
    router.delete("/:idAvaliacao", controller.delete);
    return router;
};
exports.avaliacaoRoutes = avaliacaoRoutes;
