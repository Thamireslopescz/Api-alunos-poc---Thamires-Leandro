"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const authRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new controllers_1.AlunoController();
    router.post("/", controller.login);
    return router;
};
exports.authRoutes = authRoutes;
