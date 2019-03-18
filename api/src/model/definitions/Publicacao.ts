import { IDefault, Inject } from "./IDefault";
import * as mongoose from "mongoose";
import { IUsuarioModel } from "./Usuario";

export interface IUsuarioPublicacao extends IDefault {
  id: string;
  titulo: string;
  dataCriacao: Date;
  descricao: string;
  descontoPreco: string;
  dataFinal: Date;
  isDesconto: boolean;
  porcentagem: string;
  preco: string;
  tags: any[];
  empresa: string;
}

let schema = {
  nome: { type: String }, //Nome Completo
  id:  { type: String },
  titulo:  { type: String },
  dataCriacao: { type: Date },
  descricao:  { type: String },
  descontoPreco:  { type: String },
  dataFinal: { type: Date },
  isDesconto: { type: Boolean },
  porcentagem:  { type: String },
  preco:  { type: String },
  tags: { type: Array },
  empresa:  { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'  },
};

Inject(schema);
export const publicacaoMasterSchema = new mongoose.Schema(schema);
export const publicacaoModel = mongoose.model<IUsuarioPublicacao>(
  "Publicacao",
  publicacaoMasterSchema,
  "publicacao",
  false
);
