"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Projeto = void 0;
class Projeto {
    _descricao;
    _ferramenta;
    _status;
    id;
    constructor(_descricao, _ferramenta, _status) {
        this._descricao = _descricao;
        this._ferramenta = _ferramenta;
        this._status = _status;
    }
    get status() {
        return this._status;
    }
    toJson() {
        return {
            id: this.id,
            descricao: this._descricao,
            ferramenta: this._ferramenta,
            status: this._status,
        };
    }
}
exports.Projeto = Projeto;
