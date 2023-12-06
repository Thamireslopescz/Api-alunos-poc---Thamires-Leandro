"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matriculaRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const matriculaRoutes = () => {
    const router = (0, express_1.Router)({
        mergeParams: true,
    });
    const controller = new controllers_1.MatriculaController();
    router.get("/", controller.list);
    router.post("/", controller.create);
    return router;
};
exports.matriculaRoutes = matriculaRoutes;
