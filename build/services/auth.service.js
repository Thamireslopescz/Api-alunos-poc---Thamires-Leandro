"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_connection_1 = __importDefault(require("../database/prisma.connection"));
const uuid_1 = require("uuid");
class AuthService {
    async login(email, password) {
        const result = await prisma_connection_1.default.aluno.findUnique({
            where: {
                email,
                password,
            },
        });
        if (!result) {
            return {
                code: 401,
                message: "Invalid credentials",
            };
        }
        const token = (0, uuid_1.v4)();
        await prisma_connection_1.default.aluno.update({
            where: {
                id: result.id,
            },
            data: {
                authToken: token,
            },
        });
        return {
            code: 200,
            message: "Login successfuly done",
            data: {
                id: result.id,
                token,
            },
        };
    }
    async validateToken(token) {
        const user = await prisma_connection_1.default.aluno.findFirst({
            where: {
                authToken: token,
            },
        });
        return !!user;
    }
}
exports.AuthService = AuthService;
