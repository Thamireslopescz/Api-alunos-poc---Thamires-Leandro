"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matricula = void 0;
class Matricula {
    _turmaId;
    _alunoId;
    _ativo;
    constructor(_turmaId, _alunoId, _ativo) {
        this._turmaId = _turmaId;
        this._alunoId = _alunoId;
        this._ativo = _ativo;
    }
    get turmaId() {
        return this._turmaId;
    }
    get alunoId() {
        return this._alunoId;
    }
    toJson() {
        return {
            alunoId: this._alunoId,
            turmaId: this._turmaId,
        };
    }
}
exports.Matricula = Matricula;
