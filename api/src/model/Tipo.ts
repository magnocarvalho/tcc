import { IDefault, Inject } from "./IDefault";
import * as mongoose from "mongoose";

export interface ITipo extends IDefault, mongoose.Document {
  id: string;
  value: string;
}

let schema = {
  value: { type: String, required: true }
};

Inject(schema);
export const TipoMasterSchema = new mongoose.Schema(schema);
export const Tipo = mongoose.model<ITipo>(
  "tipo",
  TipoMasterSchema,
  "tipo",
  false
);