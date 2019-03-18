"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = require("../model/definitions/Usuario");
const fs = require("fs");
class UsuarioCtrl {
    static create(req, res, next) {
        var obj = req.body;
        Usuario_1.UsuarioModel.create(obj, (err, data) => {
            if (err)
                next(err);
            else
                res.json(data);
        });
    }
    static login(req, res, next) {
        var obj = req.body;
        var uid = obj.uid;
        console.log(obj);
        // var uid = obj.
        UsuarioCtrl.getByLogin(uid).then(data => {
            if (data) {
                res.json(data);
            }
        }, err => {
            next(err);
        });
    }
    static putDadosUsuario(req, res, next) {
        var _id = req.params;
        var obj = req.body;
        var id = _id.id;
        Usuario_1.UsuarioModel.findOneAndUpdate(id, obj, (err, data) => {
            if (err)
                next(err);
            else {
                res.json(data);
            }
        });
    }
    static getDadosUsuario(req, res, next) {
        var obj = req.params.id;
        UsuarioCtrl.getById(obj).then(data => {
            res.json(data);
        }, err => {
            next(err);
        });
    }
    static getById(id) {
        return new Promise((resolve, reject) => {
            Usuario_1.UsuarioModel.findOne({ isDeleted: false, id: id }, (err, data) => {
                if (err || data === null)
                    reject(err);
                else {
                    resolve(data);
                }
            });
        });
    }
    static getByLogin(obj) {
        return new Promise((resolve, reject) => {
            Usuario_1.UsuarioModel.findOne({ isDeleted: false, uid: obj }, { pass: 0 }, (err, data) => {
                if (err || data === null)
                    reject(err);
                else {
                    resolve(data);
                }
            });
        });
    }
}
exports.default = UsuarioCtrl;
