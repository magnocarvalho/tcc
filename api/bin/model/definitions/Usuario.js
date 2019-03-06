"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IDefault_1 = require("./IDefault");
const mongoose = require("mongoose");
let schema = {
    email: { type: String, required: true },
    pass: { type: String, required: true },
    nome: { type: String },
};
IDefault_1.Inject(schema);
exports.UsuarioMasterSchema = new mongoose.Schema(schema);
exports.UsuarioModel = mongoose.model('Usuario', exports.UsuarioMasterSchema, 'usuario', false);
