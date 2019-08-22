import { LancamentoModel, ILancamentoModel } from "../model/Lancamento";

class LancamentoCtrl{
    static create(req: { body: any; }, res: { json: (arg0: any) => void; }, next: (arg0: any) => void) {
        var obj = req.body;
        LancamentoModel.create(obj, (err: any, data: any) => {
          if (err) next(err);
          else res.json(data);
        });
      }
     
}
export default LancamentoCtrl;