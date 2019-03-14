"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Publicacao_1 = require("./../model/definitions/Publicacao");
// import { publicacaoModel } from './../model/definitions/Photo';
const fs = require("fs");
class PublicacaoCtlr {
    static create(req, res, next) {
        var obj = req.body;
        Publicacao_1.publicacaoModel.create(obj, (err, data) => {
            if (err)
                next(err);
            else
                res.json(data);
        });
    }
}
exports.default = PublicacaoCtlr;
