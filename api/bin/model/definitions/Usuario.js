"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IDefault_1 = require("./IDefault");
const mongoose = require("mongoose");
let schema = {
    email: { type: String, required: true },
    nome: { type: String },
    empresa: { type: String },
    uid: { type: String },
    master: { type: Boolean },
    nomeFantasia: { type: String },
    cnpj: { type: String },
    rua: { type: String },
    numero: { type: String },
    cep: { type: String },
    bairro: { type: String },
    cidade: { type: String },
    estado: { type: String },
    ramo: { type: String }
};
IDefault_1.Inject(schema);
exports.UsuarioMasterSchema = new mongoose.Schema(schema);
exports.UsuarioModel = mongoose.model("Usuario", exports.UsuarioMasterSchema, "usuario", false);
