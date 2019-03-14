"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IDefault_1 = require("./IDefault");
const mongoose = require("mongoose");
let schema = {
    nome: { type: String },
    publicacao: { type: String },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    namePublicacao: { type: Array }
};
IDefault_1.Inject(schema);
exports.publicacaoMasterSchema = new mongoose.Schema(schema);
exports.publicacaoModel = mongoose.model('Publicacao', exports.publicacaoMasterSchema, 'publicacao', false);
