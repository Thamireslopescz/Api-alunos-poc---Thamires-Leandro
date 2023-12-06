"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avaliacao = void 0;
const uuid_1 = require("uuid");
class Avaliacao {
    _disciplina;
    _nota;
    _id;
    constructor(_disciplina, _nota) {
        this._disciplina = _disciplina;
        this._nota = _nota;
        this._id = (0, uuid_1.v4)();
    }
    get id() {
        return this._id;
    }
    toJson() {
        return {
            id: this._id,
            nota: this._nota,
            disciplina: this._disciplina,
        };
    }
}
exports.Avaliacao = Avaliacao;
