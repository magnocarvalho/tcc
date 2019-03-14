import { IDefault, Inject } from './IDefault';
import * as mongoose from 'mongoose';
import { IUsuarioModel } from './Usuario';

export interface IUsuarioPublicacao extends IDefault{

    id: string;
    nome?: string;
    publicacao?: any[];
    namePublicacao?: any[];
    userID?: string;
    
 
}

let schema = {
    
    nome: { type: String }, //Nome Completo
    publicacao: { type: String}, // arry com as fotos do album
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    namePublicacao: {type: Array}
};


Inject(schema);
export const publicacaoMasterSchema = new mongoose.Schema(schema);
export const publicacaoModel = mongoose.model<IUsuarioPublicacao>('Publicacao', publicacaoMasterSchema, 'publicacao', false);