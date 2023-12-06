"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const auth_service_1 = require("../services/auth.service");
async function authMiddleware(req, res, next) {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(401).send({
                ok: false,
                message: "Authentication token not provided",
            });
        }
        const tokenIsValid = await new auth_service_1.AuthService().validateToken(token);
        if (!tokenIsValid) {
            return res.status(401).send({
                ok: false,
                message: "Invalid credentials",
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).send({
            ok: false,
            message: error.toString(),
        });
    }
}
exports.authMiddleware = authMiddleware;
