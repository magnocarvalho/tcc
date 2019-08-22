
import { IDefault, Inject } from './IDefault';
import * as mongoose from 'mongoose';
// import { Number } from 'bson';

export interface IPagamentoModel extends IDefault, mongoose.Document {
    id: string;
    pagador: string;
    recebedor: string;
    valor: Number;
    parcelas: string;
}

let schema = {
    pagador: { type: mongoose.Schema.Types.ObjectId, ref: 'contacorrente', required: true },
    recebedor: { type: mongoose.Schema.Types.ObjectId, ref: 'contacorrente', required: true },
    valor: { type: Number, required: true },
    parcelas: { type: String, required: true }
};

Inject(schema);
export const PagamentoMasterSchema = new mongoose.Schema(schema);
export const PagamentoModel = mongoose.model<IPagamentoModel>('pagamento', PagamentoMasterSchema, 'pagamento', false);