"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjetoService = void 0;
const prisma_connection_1 = __importDefault(require("../database/prisma.connection"));
const projeto_model_1 = require("../models/projeto.model");
class ProjetoService {
    async create(params) {
        const aluno = await prisma_connection_1.default.aluno.findFirst({
            where: {
                id: params.alunoId,
            },
        });
        if (!aluno) {
            return {
                code: 404,
                message: "Aluno not found",
            };
        }
        const projeto = new projeto_model_1.Projeto(params.descricao, params.ferramenta, "E");
        await prisma_connection_1.default.projeto.create({
            data: {
                descricao: params.descricao,
                ferramenta: params.ferramenta,
                status: projeto.status,
                alunoId: params.alunoId,
            },
        });
        return {
            code: 201,
            message: "Projeto criado com sucesso",
            data: projeto.toJson(),
        };
    }
    async list(alunoId) {
        const aluno = await prisma_connection_1.default.aluno.findFirst({
            where: {
                id: alunoId,
            },
        });
        if (!aluno) {
            return {
                code: 404,
                message: "Aluno not found",
            };
        }
        const result = await prisma_connection_1.default.projeto.findMany({
            where: {
                alunoId,
            },
        });
        return {
            code: 200,
            message: "Projetos listados com sucesso",
            data: result.map((item) => this.mapToModel(item).toJson()),
        };
    }
    async delete(params) {
        // Verifica se o user existe
        const aluno = await prisma_connection_1.default.aluno.findFirst({
            where: {
                id: params.alunoId,
            },
        });
        if (!aluno) {
            return {
                code: 404,
                message: "Aluno not found",
            };
        }
        // Verifica se o projeto existe
        const projeto = await prisma_connection_1.default.projeto.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!projeto) {
            return {
                code: 404,
                message: "Projeto not found",
            };
        }
        await prisma_connection_1.default.projeto.delete({
            where: {
                id: params.id,
            },
        });
        return {
            code: 200,
            message: "Projeto sucessfully deleted",
        };
    }
    async update(params) {
        // Verifica se o user existe
        const aluno = await prisma_connection_1.default.aluno.findFirst({
            where: {
                id: params.alunoId,
            },
        });
        if (!aluno) {
            return {
                code: 404,
                message: "Aluno not found",
            };
        }
        // Verifica se o projeto existe
        const projeto = await prisma_connection_1.default.projeto.findFirst({
            where: {
                id: params.id,
            },
        });
        if (!projeto) {
            return {
                code: 404,
                message: "Projeto not found",
            };
        }
        await prisma_connection_1.default.projeto.update({
            where: {
                id: params.id,
            },
            data: {
                descricao: params.descricao,
                ferramenta: params.ferramenta,
                status: params.status,
            },
        });
        return {
            code: 200,
            message: "Projeto sucessfully updated",
        };
    }
    mapToModel(projeto) {
        const model = new projeto_model_1.Projeto(projeto.descricao, projeto.ferramenta, projeto.status);
        model.id = projeto.id;
        return model;
    }
}
exports.ProjetoService = ProjetoService;
