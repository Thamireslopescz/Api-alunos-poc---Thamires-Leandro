"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aluno = void 0;
class Aluno {
    _nome;
    _email;
    _idade;
    _password;
    _id;
    _avaliacoes;
    constructor(_nome, _email, _idade, _password, _id) {
        this._nome = _nome;
        this._email = _email;
        this._idade = _idade;
        this._password = _password;
        this._id = _id;
        this._avaliacoes = [];
    }
    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    get avaliacoes() {
        return this._avaliacoes;
    }
    toJson() {
        return {
            id: this._id,
            nome: this._nome,
            email: this._email,
            idade: this._idade,
        };
    }
}
exports.Aluno = Aluno;
