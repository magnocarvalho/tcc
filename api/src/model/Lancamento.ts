
import { IDefault, Inject } from './IDefault';
import * as mongoose from 'mongoose';
// import { Number, Int32, Decimal128 } from 'bson';

export interface ILancamentoModel extends IDefault, mongoose.Document{
    id: string;
    pagador:string;
    recebedor:string;
    valorTotal:Number;
    parcelas: string;
    saldoPagador:Number;
    saldoRecebedor:Number;
}

let schema = {
    pagador: {type: mongoose.Schema.Types.ObjectId, ref: 'contacorrente', required: true},
    recebedor: {type: mongoose.Schema.Types.ObjectId, ref: 'contacorrente', required: true},
    valorTotal: {type: Number, required: true},
    parcelas: {type: String, required: true},
    saldoPagador: {type: Number, required: true},
    saldoRecebedor: {type: Number, required: true}
};

Inject(schema);
export const LancamentoMasterSchema = new mongoose.Schema(schema);
export const LancamentoModel = mongoose.model<ILancamentoModel>('lancamento', LancamentoMasterSchema, 'lancamento', false);