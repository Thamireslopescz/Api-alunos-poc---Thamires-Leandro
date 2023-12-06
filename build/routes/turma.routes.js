"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.turmaRoutes = void 0;
const express_1 = require("express");
const turma_controller_1 = require("../controllers/turma.controller");
const matricula_routes_1 = require("./matricula.routes");
const turmaRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new turma_controller_1.TurmaController();
    router.get("/", controller.list);
    router.post("/", controller.create);
    router.use("/:idTurma/matricula", (0, matricula_routes_1.matriculaRoutes)());
    return router;
};
exports.turmaRoutes = turmaRoutes;
