"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Turma = void 0;
const uuid_1 = require("uuid");
class Turma {
    _programa;
    _edicao;
    _maxAlunos;
    _id;
    constructor(_programa, _edicao, _maxAlunos) {
        this._programa = _programa;
        this._edicao = _edicao;
        this._maxAlunos = _maxAlunos;
        this._id = (0, uuid_1.v4)();
    }
    get id() {
        return this._id;
    }
    toJson() {
        return {
            id: this._id,
            programa: this._programa,
            edicao: this._edicao,
            maxAlunos: this._maxAlunos,
        };
    }
}
exports.Turma = Turma;
