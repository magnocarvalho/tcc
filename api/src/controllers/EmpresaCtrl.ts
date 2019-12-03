import { IUserModel, UserModel } from "../model/Empresa";
import { ObjectId } from "bson";
import { IFavorite, Favorite } from "../model/Favorite";
import { IPromo } from "../model/Promo";

var admin = require("firebase-admin");
class UserCtrl {
  public static createUser(req, res, next) {
    let obj: IUserModel = req.body;
    UserModel.create(obj, (err: any, data: any) => {
      if (err) {
        // console.log(err);
        //  console.log(new Date().toLocaleString(), err.messagem);
        next(err);
      } else res.json(data);
    });
  }
  public static updateUser(req, res, next) {
    let obj: IUserModel = req.body;
    let uid = res.locals.uid;
    UserModel.findOneAndUpdate(
      { uid: uid },
      obj,
      { new: true },
      (err: any, data: any) => {
        if (err) {
          // console.log(err);
          //  console.log(new Date().toLocaleString(), err.messagem);
          next(err);
        } else res.json(data);
      }
    );
  }
  public static findUserUID(req, res, next) {
    let uid = res.locals.uid;
    // console.log(uid);
    UserModel.findOne({ uid: uid }, (err: any, data: any) => {
      if (err) {
        // console.log(err);
        //  console.log(new Date().toLocaleString(), err.messagem);
        next(err);
      } else {
        // console.log(data);
        if (data == undefined) {
          res.json({ error: 405 });
          // res.sendStatus(401);
        } else {
          res.json(data);
        }
      }
    });
  }
  public static async findByIdAllPromos(req, res, next) {
    let empresa = req.query.empresa;
    let uid = req.query.uid || res.locals.uid;
    // console.log(uid, empresa);
    const dateIn = new Date();
    const favorites = await Favorite.findOne({ uid: uid });
    return UserModel.aggregate(
      [
        {
          $match: { _id: new ObjectId(empresa) }
        },
        {
          $lookup: {
            from: "promo",
            localField: "_id",
            foreignField: "createdby",
            as: "promos"
          }
        },
        {
          $match: {
            $and: [
              { "promos.endDate": { $gte: dateIn } },
              { "promos.initDate": { $lt: dateIn } },
              { "promos.isDeleted": false }
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
          // console.log(data, "busca funcionou", new Date());
          let favorite: IFavorite = await favorites;
          let dados = [];
          dados = data;
          for (let i = 0; i < dados.length; i++) {
            let proms = [];
            proms = dados[i].promos;
            let prom2 = [];
            console.log(proms.length);
            for (let j = 0; j < proms.length; j++) {
              // console.log("err falso", proms[j]);
              if (!proms[j].isDeleted) {
                // console.log("err falso", proms[j]);
                prom2.push(proms[j]);
              }
            }

            dados[i].promos = prom2;
          }
          try {
            if (dados[0].promos && favorite && favorite.promos.length > 0) {
              let promocoes: IPromo[] = await dados[0].promos;
              // console.log(favorite);
              dados[0].promos = promocoes.map((p) => {
                if (favorite.promos) {
                  for (let i = 0; i < favorite.promos.length; i++) {
                    // console.log(favorite.promos[i].id, p._id, favorite.promos[i].id.toString() == p._id.toString())
                    if (favorite.promos[i].id.toString() == p._id.toString()) {
                      p.favorito = true;
                      return p;
                    } else {
                      p.favorito = false;
                    }
                  }
                }
                return p;
              });
            }
            res.json(dados);
          } catch (error) {
            next(error);
          }
        }
      }
    );
  }
}
export default UserCtrl;
