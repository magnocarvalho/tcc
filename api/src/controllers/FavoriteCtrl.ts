import { Favorite, IFavorite } from "../model/Favorite";
import { IUserModel } from "../model/Empresa";
import { IPromo, Promo } from "../model/Promo";

class FavoriteCtrl {
  public static getFavorites(req, res, next) {
    let uid = res.locals.uid;
    const dateIn = new Date();
    return Favorite.aggregate(
      [
        {
          $match: { uid: uid }
        },
        {
          $lookup: {
            from: "promo",
            localField: "promos.id",
            foreignField: "_id",
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
            from: "user",
            localField: "promos.createdby",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $lookup: {
            from: "tipo",
            localField: "user.tipo",
            foreignField: "_id",
            as: "tipo"
          }
        }
      ],
      (err: any, data: any) => {
        if (err) {
          //  console.log(err);
          //  console.log(new Date().toLocaleString(), err.messagem);
          next(err);
        } else {
          if (data[0]) {
            let usuario = data[0].user;
            let promocao = data[0].promos;
            let tipos = data[0].tipo;
            data[0].promos = promocao.map((a) => {
              for (let i = 0; i < usuario.length; i++) {
                // console.log(usuario[i]._id.toString() == a.createdby.toString(), usuario[i]._id.toString(), a.createdby.toString())
                if (usuario[i]._id.toString() == a.createdby.toString()) {
                  a.empresa = usuario[i];
                  for (let e = 0; e < tipos.length; e++) {
                    // console.log(usuario[i].toString() == tipos[e]._id.toString(), usuario[i].tipo.toString(), tipos[e]._id.toString())
                    if (usuario[i].tipo.toString() == tipos[e]._id.toString()) {
                      a.tipo = tipos[e];
                    }
                  }
                }
              }
              return a;
            });
          }
          res.json(data);
        }
      }
    );
  }
  public static async deleteFavorite(req, res, next) {
    let obj = req.body;
    let uid = res.locals.uid;
    return Favorite.findOneAndUpdate(
      { uid: uid },
      { $pull: { promos: obj } },
      { new: true },
      (err: any, data: any) => {
        if (err) {
          //  console.log(err);
          //  console.log(new Date().toLocaleString(), err.messagem);
          next(err);
        } else res.json(data);
      }
    );
  }

  public static async createFavorites(req, res, next) {
    let obj = req.body;
    let uid = res.locals.uid;
    // console.log(uid, obj)
    let procura: IFavorite = await Favorite.findOne({ uid: uid });
    let atl = await Promo.findByIdAndUpdate(obj.id, { $inc: { favoritos: 1 } });
    console.log(atl);
    if (procura) {
      if (
        procura.promos.find((a) => {
          // console.log(a)
          return a.id == obj.id;
        })
      ) {
        // console.log(procura)
        res.json(procura);
      } else {
        return Favorite.findOneAndUpdate(
          { uid: uid },
          { $addToSet: { promos: obj } },
          { new: true },
          (err: any, data: any) => {
            if (err) {
              //  console.log(err);
              //  console.log(new Date().toLocaleString(), err.messagem);
              next(err);
            } else res.json(data);
          }
        );
      }
    } else {
      return Favorite.create(
        { uid: uid, promos: [obj] },
        (err: any, data: any) => {
          if (err) {
            //  console.log(err);
            //  console.log(new Date().toLocaleString(), err.messagem);
            next(err);
          } else res.json(data);
        }
      );
    }
  }
}
export default FavoriteCtrl;
