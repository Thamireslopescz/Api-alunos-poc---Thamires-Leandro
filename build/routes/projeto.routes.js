"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projetoRoutes = void 0;
const express_1 = require("express");
const projeto_controller_1 = require("../controllers/projeto.controller");
const projetoRoutes = () => {
    const router = (0, express_1.Router)({
        mergeParams: true,
    });
    const controller = new projeto_controller_1.ProjetoController();
    router.get("/", controller.list);
    router.post("/", controller.create);
    router.delete("/:id", controller.delete);
    router.put("/:id", controller.update);
    return router;
};
exports.projetoRoutes = projetoRoutes;
