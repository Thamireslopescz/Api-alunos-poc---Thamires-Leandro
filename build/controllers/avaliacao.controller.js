"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvaliacaoController = void 0;
const prisma_connection_1 = __importDefault(require("../database/prisma.connection"));
const avaliacao_model_1 = require("../models/avaliacao.model");
class AvaliacaoController {
    async list(req, res) {
        try {
            const { idAluno } = req.params;
            // Verifica se o aluno existe
            const aluno = await prisma_connection_1.default.aluno.findUnique({
                where: {
                    id: idAluno,
                },
            });
            // Se o aluno não existe, retorna 404
            if (!aluno) {
                return res.status(404).send({
                    ok: false,
                    message: "Aluno does not exist",
                });
            }
            // Lista todos os alunos do banco de dados
            const result = await prisma_connection_1.default.avaliacao.findMany({
                where: {
                    idAluno,
                },
                // Faz um JOIN com outra tabela (aluno)
                include: {
                    aluno: {
                        // Traz apenas o ID e o nome do aluno no JOIN
                        select: {
                            id: true,
                            nome: true,
                        },
                    },
                },
            });
            res.status(200).send({
                ok: true,
                data: result,
            });
        }
        catch (error) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
    async create(req, res) {
        try {
            const { idAluno } = req.params;
            const { disciplina, nota } = req.body;
            // Valida os campos obrigatórios
            if (!disciplina || !nota) {
                return res.status(400).send({
                    ok: false,
                    message: "Fields not provided.",
                });
            }
            const notaNum = Number(nota);
            if (notaNum < 0 || notaNum > 10) {
                return res.status(400).send({
                    ok: false,
                    message: "Nota must be between 0 and 10",
                });
            }
            // Verifica se o aluno existe
            const aluno = await prisma_connection_1.default.aluno.findUnique({
                where: {
                    id: idAluno,
                },
            });
            // Se o aluno não existe, retorna 404
            if (!aluno) {
                return res.status(404).send({
                    ok: false,
                    message: "Aluno does not exist",
                });
            }
            // Cria a instância da avaliação (model)
            const avaliacao = new avaliacao_model_1.Avaliacao(disciplina, nota);
            // Salva a avaliação no banco de dados
            const result = await prisma_connection_1.default.avaliacao.create({
                data: {
                    id: avaliacao.id,
                    idAluno: aluno.id,
                    disciplina,
                    nota,
                },
            });
            res.status(201).send({
                ok: true,
                data: result,
                message: "Avaliacao successfully created",
            });
        }
        catch (error) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
    async update(req, res) {
        try {
            const { idAluno, idAvaliacao } = req.params;
            const { disciplina, nota } = req.body;
            // Valida os campos obrigatórios
            if (!disciplina || !nota) {
                return res.status(400).send({
                    ok: false,
                    message: "Fields not provided.",
                });
            }
            const notaNum = Number(nota);
            if (notaNum < 0 || notaNum > 10) {
                return res.status(400).send({
                    ok: false,
                    message: "Nota must be between 0 and 10",
                });
            }
            // Verifica se o aluno existe
            const aluno = await prisma_connection_1.default.aluno.findUnique({
                where: {
                    id: idAluno,
                },
            });
            // Se o aluno não existe, retorna 404
            if (!aluno) {
                return res.status(404).send({
                    ok: false,
                    message: "Aluno does not exist",
                });
            }
            // Salva a avaliação no banco de dados
            const result = await prisma_connection_1.default.avaliacao.update({
                where: {
                    id: idAvaliacao,
                },
                data: {
                    disciplina,
                    nota,
                },
            });
            res.status(200).send({
                ok: true,
                data: result,
                message: "Avaliacao successfully updated",
            });
        }
        catch (error) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
    async delete(req, res) {
        try {
            const { idAluno, idAvaliacao } = req.params;
            // Verifica se o aluno existe
            const aluno = await prisma_connection_1.default.aluno.findUnique({
                where: {
                    id: idAluno,
                },
            });
            // Se o aluno não existe, retorna 404
            if (!aluno) {
                return res.status(404).send({
                    ok: false,
                    message: "Aluno does not exist",
                });
            }
            // Salva a avaliação no banco de dados
            const result = await prisma_connection_1.default.avaliacao.delete({
                where: {
                    id: idAvaliacao,
                },
            });
            res.status(200).send({
                ok: true,
                data: result,
                message: "Avaliacao successfully deleted",
            });
        }
        catch (error) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
exports.AvaliacaoController = AvaliacaoController;
