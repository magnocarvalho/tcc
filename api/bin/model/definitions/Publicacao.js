"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IDefault_1 = require("./IDefault");
const mongoose = require("mongoose");
let schema = {
    nome: { type: String },
    id: { type: String },
    titulo: { type: String },
    dataCriacao: { type: Date },
    descricao: { type: String },
    descontoPreco: { type: String },
    dataFinal: { type: Date },
    isDesconto: { type: Boolean },
    porcentagem: { type: String },
    preco: { type: String },
    tags: { type: Array },
    empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
};
IDefault_1.Inject(schema);
exports.publicacaoMasterSchema = new mongoose.Schema(schema);
exports.publicacaoModel = mongoose.model("Publicacao", exports.publicacaoMasterSchema, "publicacao", false);
