"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurmaController = void 0;
const prisma_connection_1 = __importDefault(require("../database/prisma.connection"));
const turma_model_1 = require("../models/turma.model");
/**
 * Controller com todas as ações a respeito de turmas.
 */
class TurmaController {
    async list(req, res) {
        try {
            // Lista todas as turmas do banco de dados
            const result = await prisma_connection_1.default.turma.findMany();
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
            // Busca os campos do body
            const { programa, edicao } = req.body;
            // Valida se todos os campos foram informados
            if (!programa || !edicao) {
                return res.status(400).send({
                    ok: false,
                    message: "Fields not provided",
                });
            }
            // Cria uma nova turma (model)
            const turma = new turma_model_1.Turma(programa, edicao, 30);
            // Salva a turma no banco de dados
            const result = await prisma_connection_1.default.turma.create({
                data: {
                    id: turma.id,
                    programa,
                    edicao,
                    maxAlunos: 30,
                },
            });
            res.status(201).send({
                ok: true,
                data: result,
                message: "Turma successfully created",
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
exports.TurmaController = TurmaController;
