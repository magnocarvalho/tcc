
import { IDefault, Inject } from './IDefault';
import * as mongoose from 'mongoose';
// import { Double, Decimal128 } from 'bson';

export interface IContaCorrenteModel extends IDefault, mongoose.Document {
    id: string;
    saldo: Number;
    titular: string;
}

let schema = {
    saldo: { type: Number, required: true },
    titular: { type: String, required: true }
};

Inject(schema);
export const ContaCorrenteMasterSchema = new mongoose.Schema(schema);
export const ContaCorrenteModel = mongoose.model<IContaCorrenteModel>('contacorrente', ContaCorrenteMasterSchema, 'contacorrente', false);