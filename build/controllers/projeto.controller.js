"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjetoController = void 0;
const projeto_service_1 = require("../services/projeto.service");
class ProjetoController {
    async list(req, res) {
        try {
            const { alunoId } = req.params;
            const service = new projeto_service_1.ProjetoService();
            const result = await service.list(alunoId);
            res.status(result.code).send(result);
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
            const { descricao, ferramenta } = req.body;
            const { alunoId } = req.params;
            // Valida se todos os campos foram informados
            if (!descricao || !ferramenta) {
                return res.status(400).send({
                    ok: false,
                    message: "Fields not provided",
                });
            }
            const result = await new projeto_service_1.ProjetoService().create({
                descricao,
                ferramenta,
                alunoId,
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
            const { alunoId, id } = req.params;
            const service = new projeto_service_1.ProjetoService();
            const result = await service.delete({ alunoId, id });
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
            const { alunoId, id } = req.params;
            const service = new projeto_service_1.ProjetoService();
            const result = await service.update({ alunoId, id, ...req.body });
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
exports.ProjetoController = ProjetoController;
