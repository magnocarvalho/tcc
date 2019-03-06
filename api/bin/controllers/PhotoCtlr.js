"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Photo_1 = require("./../model/definitions/Photo");
const fs = require("fs");
class PhotoCtlr {
    static create(req, res, next) {
        var obj = req.body;
        Photo_1.photosModel.create(obj, (err, data) => {
            if (err)
                next(err);
            else
                res.json(data);
        });
    }
    static putPhotos(req, res, next) {
        var obj = req.body;
        var nomeAlbum = obj.nome;
        var nomePhoto = obj.namePhoto;
        var userId = obj.userID;
        var photoname = [];
        if (!fs.existsSync("./bin/assets/" + userId)) {
            fs.mkdirSync("./bin/assets/" + userId);
        }
        fs.mkdirSync("./bin/assets/" + userId + "/" + nomeAlbum + "/");
        if (obj.photo) {
            for (let i = 0; i < nomePhoto.length; i++) {
                var base64Data = obj.photo[i].replace(/^data:image\/[a-z]+;base64,/, "");
                photoname.push("assets/" + userId + "/" + nomeAlbum + "/" + nomePhoto[i] + ".png");
                fs.writeFile("./bin/assets/" +
                    userId +
                    "/" +
                    nomeAlbum +
                    "/" +
                    nomePhoto[i] +
                    ".png", base64Data, "base64", function (err) {
                    if (err)
                        console.log("err = " + err);
                });
            }
            obj.namePhotos = photoname;
        }
        Photo_1.photosModel.create(obj, (err, data) => {
            if (err)
                next(err);
            else
                res.json(data);
        });
    }
    static buscarAlbuns(req, res, next) {
        var obj = req.params.id;
        PhotoCtlr.getByIdUser(obj).then(data => {
            res.json(data);
        }, err => {
            next(err);
        });
    }
    static buscarAlbum(req, res, next) {
        var obj = req.params.id;
        PhotoCtlr.getById(obj).then(data => {
            res.json(data);
        }, err => {
            next(err);
        });
    }
    static deletarFoto(req, res, next) {
        var obj = req.body;
        // console.log(req);
        PhotoCtlr.deleteFoto(obj).then(data => {
            res.json(data);
        }, err => {
            next(err);
        });
    }
    static addFotos(req, res, next) {
        var obj = req.body;
        var nomeAlbum = obj.nome;
        var nomePhoto = obj.namePhoto;
        var userId = obj.userID;
        var photoname = [];
        if (!fs.existsSync("./bin/assets/" + userId)) {
            fs.mkdirSync("./bin/assets/" + userId);
        }
        if (!fs.existsSync("./bin/assets/" + userId + "/" + nomeAlbum)) {
            fs.mkdirSync("./bin/assets/" + userId + "/" + nomeAlbum + "/");
        }
        if (obj.photo) {
            for (let i = 0; i < nomePhoto.length; i++) {
                var base64Data = obj.photo[i].replace(/^data:image\/[a-z]+;base64,/, "");
                photoname.push("assets/" + userId + "/" + nomeAlbum + "/" + nomePhoto[i] + ".png");
                fs.writeFile("./bin/assets/" +
                    userId +
                    "/" +
                    nomeAlbum +
                    "/" +
                    nomePhoto[i] +
                    ".png", base64Data, "base64", function (err) {
                    if (err)
                        console.log("err = " + err);
                });
            }
        }
        for (let i = 0; i < photoname.length; i++) {
            obj.namePhotos = photoname[i];
        }
        console.log(photoname);
        PhotoCtlr.addFotosArray(obj).then(data => {
            res.json(data);
        }, err => {
            next(err);
        });
    }
    static addFotosArray(obj) {
        return new Promise((resolve, reject) => {
            Photo_1.photosModel.findOneAndUpdate({ _id: obj.id }, { $push: { namePhotos: obj.namePhotos } }, { safe: true, upsert: true }, function (err, doc) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.log(doc);
                    resolve(doc);
                }
            });
        });
    }
    static deleteFoto(obj) {
        return new Promise((resolve, reject) => {
            Photo_1.photosModel.findByIdAndUpdate(obj._id, { $pull: { namePhotos: obj.name } }, { safe: true, upsert: true }, function (err, doc) {
                if (err) {
                    console.log('erro a deletar a foto' + obj + err);
                    reject(err);
                }
                else {
                    console.log('deletou a foto' + obj + doc);
                    resolve(doc);
                }
            });
        });
    }
    static getById(id) {
        return new Promise((resolve, reject) => {
            Photo_1.photosModel.findOne({ isDeleted: false, _id: id }, (err, data) => {
                if (err || data === null)
                    reject(err);
                else {
                    resolve(data);
                }
            });
        });
    }
    static getByIdUser(id) {
        return new Promise((resolve, reject) => {
            Photo_1.photosModel.find({ isDeleted: false, userID: id }, (err, data) => {
                if (err || data === null)
                    reject(err);
                else {
                    resolve(data);
                }
            });
        });
    }
}
exports.default = PhotoCtlr;
