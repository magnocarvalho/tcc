import { IUsuarioPublicacao, publicacaoModel } from './../model/definitions/Publicacao';
// import { publicacaoModel } from './../model/definitions/Photo';


const fs = require("fs");

class PublicacaoCtlr {
  static create(req, res, next) {
    var obj = req.body;
    publicacaoModel.create(obj, (err, data) => {
      if (err) next(err);
      else res.json(data);
    });
  } 
}
export default PublicacaoCtlr;
