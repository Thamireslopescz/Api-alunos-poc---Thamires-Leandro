"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlunoService = void 0;
const prisma_connection_1 = __importDefault(require("../database/prisma.connection"));
const models_1 = require("../models");
class AlunoService {
    async findAll(nome) {
        // Lista todos os alunos do banco de dados
        const result = await prisma_connection_1.default.aluno.findMany({
            // Filtro com where
            where: {
                nome: nome?.toString(),
            },
            // Define quais os campos serão selecionados
            select: {
                password: false,
                id: true,
                nome: true,
                email: true,
                idade: true,
                createdAt: true,
            },
        });
        return result.map((item) => this.mapToModel(item));
    }
    async create(params) {
        // Cria um novo aluno (model)
        const aluno = new models_1.Aluno(params.nome, params.email, params.idade, params.password);
        // Salva o aluno no banco de dados usando o Prisma
        const createdAluno = await prisma_connection_1.default.aluno.create({
            data: {
                email: params.email,
                nome: params.nome,
                password: params.password,
                // id: aluno.id,
                idade: params.idade,
            },
        });
        return {
            code: 201,
            message: "Aluno successfully created",
            data: this.mapToModel(createdAluno).toJson(),
        };
    }
    async update(params) {
        const aluno = await prisma_connection_1.default.aluno.findUnique({
            where: {
                id: params.id,
            },
        });
        if (!aluno) {
            return {
                code: 404,
                message: "Aluno not found",
            };
        }
        aluno.nome = params.nome ?? aluno.nome;
        aluno.idade = params.idade ?? aluno.idade;
        await prisma_connection_1.default.aluno.update({
            where: {
                id: params.id,
            },
            data: {
                nome: aluno.nome,
                idade: aluno.idade,
            },
        });
        return {
            code: 200,
            message: "Aluno sucessfully updated",
            data: this.mapToModel(aluno).toJson(),
        };
    }
    async delete(id) {
        const aluno = await prisma_connection_1.default.aluno.findUnique({
            where: {
                id,
            },
        });
        if (!aluno) {
            return {
                code: 404,
                message: "Aluno not found",
            };
        }
        await prisma_connection_1.default.aluno.delete({
            where: {
                id,
            },
        });
        return {
            code: 200,
            message: "Aluno successfully deleted",
        };
    }
    mapToModel(aluno) {
        return new models_1.Aluno(aluno.nome, aluno.email, aluno.idade, aluno.password, aluno.id);
    }
}
exports.AlunoService = AlunoService;
