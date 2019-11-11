import { Tipo } from "../model/Tipo";

class TipoCtrl {
  public static getTipos(req, res, next) {
    return Tipo.find((err: any, data: any) => {
      if (err) {
      //  console.log(err);
      //  console.log(new Date().toLocaleString(), err.messagem);
        next(err);
      } else res.json(data);
    });
  }
}
export default TipoCtrl;
