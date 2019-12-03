import { Promo, IPromo } from "../model/Promo";
import { UserModel, IUserModel } from "../model/Empresa";
import * as mongoose from "mongoose";
import { ObjectId } from "bson";

class PromoCtrl {
  public static getPromos(req, res, next) {
    let lat: Number = parseFloat(req.query.lat);
    let lng: Number = parseFloat(req.query.lng);
    let category: string[] = req.query.category || [];
    let uid = res.locals.uid;
    let coordinates = [lat, lng];
    let distance = req.query.distance;
    const cat = req.query.category
      ? { tipo: { $in: category.map((m) => new ObjectId(m)) } }
      : {};
    const dateIn = new Date();

    return UserModel.aggregate(
      [
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: coordinates
            },
            distanceField: "dist.calculated",
            maxDistance: distance,
            spherical: true
          }
        },
        {
          $match: {
            location: {
              $geoWithin: {
                $centerSphere: [coordinates, distance / 1609.34 / 3963.2]
              }
            }
          }
        },
        {
          $lookup: {
            from: "promo",
            localField: "_id",
            foreignField: "createdby",
            as: "promos"
          }
        },
        // { $match: { "promos.isDeleted": { $ne: true } } },
        {
          $match: {
            $and: [
              { "promos.endDate": { $gte: dateIn } },
              { "promos.initDate": { $lt: dateIn } },
              cat
            ]
          }
        },
        {
          $lookup: {
            from: "tipo",
            localField: "tipo",
            foreignField: "_id",
            as: "tipo"
          }
        },
        {
          $unwind: "$tipo"
        }
      ],
      async (err: any, data: any) => {
        if (err) {
          console.log(err);
          console.log(new Date().toLocaleString(), err.messagem);
          next(err);
        } else {
          let dados = [];
          dados = data;
          for (let i = 0; i < dados.length; i++) {
            let proms = [];
            proms = dados[i].promos;
            let prom2 = [];
            // console.log(proms.length);
            for (let j = 0; j < proms.length; j++) {
              // console.log("err falso", proms[j]);
              if (!proms[j].isDeleted) {
                // console.log("err falso", proms[j]);
                prom2.push(proms[j]);
              }
            }

            dados[i].promos = prom2;
          }
          res.json(dados);
        }
      }
    );
  }
  public static createPromo(req, res, next) {
    let obj: IPromo = req.body;
    return Promo.create(obj, (err: any, data: any) => {
      if (err) {
        console.log(err);
        console.log(new Date().toLocaleString(), err.messagem);
        next(err);
      } else {
        res.json(data);
      }
    });
  }
  public static deletePromo(req, res, next) {
    let obj = req.body;
    return Promo.findByIdAndUpdate(
      obj._id,
      { isDeleted: true },
      (err: any, data: any) => {
        if (err) {
          console.log(err);
          console.log(new Date().toLocaleString(), err.messagem);
          next(err);
        } else {
          res.json(data);
        }
      }
    );
  }
  public static async updatePromo(req, res, next) {
    let obj = req.body;
    let uid = res.locals.uid;
    let usuario: IUserModel = await UserModel.findOne({ uid: uid });
    if (usuario._id.toString() != obj.modifiedby.toString()) {
      console.log({ obj }, res.locals, { usuario });
      next({ error: "promo e usuario nao conferem" });
    }
    console.log(
      usuario._id.toString() == obj.modifiedby.toString(),
      res.locals
    );
    return Promo.findOneAndUpdate(
      { _id: obj._id },
      obj,
      { new: true },
      async (err: any, data: any) => {
        if (err) {
          console.log(err);
          console.log(new Date().toLocaleString(), err.messagem);
          next(err);
        } else {
          console.log("Promoção atualizada", data);
          res.json(data);
        }
      }
    );
  }
  public static getPromosIdEmpresa(req, res, next) {
    let idUser = req.query.empresa;
    return Promo.find(
      { createdby: idUser, isDeleted: false },
      (err: any, data: any) => {
        if (err) {
          console.log(err);
          console.log(new Date().toLocaleString(), err.messagem);
          next(err);
        } else res.json(data);
      }
    );
  }
  public static getPromosIdUser(req, res, next) {
    let idUser = req.query.empresa;
    return Promo.find(
      { createdby: idUser, isDeleted: false },
      (err: any, data: any) => {
        if (err) {
          console.log(err);
          console.log(new Date().toLocaleString(), err.messagem);
          next(err);
        } else res.json(data);
      }
    );
  }
}
export default PromoCtrl;
