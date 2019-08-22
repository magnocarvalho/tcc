import { ContaCorrenteModel, IContaCorrenteModel } from "../model/Contacorrente";
import { reject } from "async";
import { ILancamentoModel } from "../model/Lancamento";

class ContaCorrenteCtrl {
  static create(req: { body: any; }, res: { json: (arg0: any) => void; }, next: (arg0: any) => void) {
    var obj = req.body;
    ContaCorrenteModel.create(obj, (err: any, data: any) => {
      if (err) next(err);
      else res.json(data);
    });
  }
  static getDadosUsuario(req: { params: { id: any; }; }, res: { json: (arg0: IContaCorrenteModel) => void; }, next: (arg0: any) => void) {
    var id = req.params.id;
    ContaCorrenteCtrl.getById(id).then(
      data => {
        res.json(data);
      },
      err => {
        next(err);
      }
    );
  }
  public static getById(id: any) {
    return new Promise<IContaCorrenteModel>((resolve, reject) => {
      ContaCorrenteModel.findOne({ isDeleted: false, _id: id }, (err, data) => {
        if (err || data === null) reject(err);
        else {
          resolve(data);
        }
      });
    });
  }

  public static getByIdDescontar(id: any, obj: any) {
    return new Promise<IContaCorrenteModel>((resolve, reject) => {
      ContaCorrenteModel.findByIdAndUpdate(id, obj, (err, data) => {
        if (err || data === null) reject(err);
        else {
          resolve(data);
        }
      });
    });
  }
  public static getByIdPagar(id: any, obj: any) {
    return new Promise<IContaCorrenteModel>((resolve, reject) => {
      ContaCorrenteModel.findByIdAndUpdate( id , obj, (err, data) => {
        if (err || data === null) reject(err);
        else {
          resolve(data);
        }
      });
    });
  }
  private static getByIdReceber(id: any, obj: any) {
    return new Promise<IContaCorrenteModel>((resolve, reject) => {
      ContaCorrenteModel.findOneAndUpdate({ isDeleted: false, id: id }, obj, (err, data) => {
        if (err || data === null) reject(err);
        else {
          resolve(data);
        }
      });
    });
  }
}
export default ContaCorrenteCtrl;