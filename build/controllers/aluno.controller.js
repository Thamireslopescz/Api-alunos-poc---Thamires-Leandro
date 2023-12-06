"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlunoController = void 0;
const aluno_service_1 = require("../services/aluno.service");
const auth_service_1 = require("../services/auth.service");
/**
 * Controller com todas as ações a respeito de alunos.
 */
class AlunoController {
    async list(req, res) {
        try {
            const { nome } = req.query;
            const service = new aluno_service_1.AlunoService();
            const result = await service.findAll(nome);
            res.status(200).send({
                ok: true,
                data: result.map((item) => item.toJson()),
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
            const { nome, email, password, idade } = req.body;
            // Valida se todos os campos foram informados
            if (!nome || !email || !password || !idade) {
                return res.status(400).send({
                    ok: false,
                    message: "Fields not provided",
                });
            }
            const result = await new aluno_service_1.AlunoService().create(req.body);
            res.status(result.code).send(result);
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
            const { id } = req.params;
            const { nome, idade } = req.body;
            const result = await new aluno_service_1.AlunoService().update({
                id,
                nome,
                idade,
            });
            res.status(result.code).send(result);
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
            const { id } = req.params;
            const result = await new aluno_service_1.AlunoService().delete(id);
            res.status(result.code).send(result);
        }
        catch (error) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).send({
                    ok: false,
                    message: "Fields not provided",
                });
            }
            const result = await new auth_service_1.AuthService().login(email, password);
            res.status(result.code).send(result);
        }
        catch (error) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
exports.AlunoController = AlunoController;
