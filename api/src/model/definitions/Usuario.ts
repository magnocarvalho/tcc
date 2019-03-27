import { IDefault, Inject } from "./IDefault";
import * as mongoose from "mongoose";

export interface IUsuarioModel extends IDefault {
  id: string;
  email: string;
  nome?: string;
  empresa: string;
  uid: string;
  master: boolean;
  nomeFantasia: string;
  cnpj: string;
  rua: string;
  numero: string;
  cep: string;
  bairro: string;
  cidade: string;
  estado: string;
  ramo: string;
  loc: any;
}

let schema = {
  email: { type: String, required: true }, //nome de usuário
  nome: { type: String }, //Nome Completo
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
  ramo: { type: String },
  local: { type: [Number], required: true } // [Long, Lat]
};

Inject(schema);
export const UsuarioMasterSchema = new mongoose.Schema(schema);
UsuarioMasterSchema.index({ local: "2dsphere" });
export const UsuarioModel = mongoose.model<IUsuarioModel>(
  "Usuario",
  UsuarioMasterSchema,
  "usuario",
  false
);
