import { IPagamentoModel, PagamentoModel } from "../model/Pagamento";
import * as async from 'async';
import ContaCorrenteCtrl from "./ContaCorrenteCtrl";
import { IContaCorrenteModel } from "../model/Contacorrente";
import { Double, Int32 } from "bson";
import Utils from "../utils/Utils";
import { ILancamentoModel, LancamentoModel } from "../model/Lancamento";
import LancamentoCtrl from "./LancamentosCtrl";
const Transaction = require('mongoose-transactions')
const transaction = new Transaction();

class PagamentoCtrl {


  static create(req, res, next) {
    var obj: IPagamentoModel = req.body;
    var pagamento: any = { valor: obj.valor, parcelas: obj.parcelas, pagante: obj.pagador, recebendo: obj.recebedor };
    //validando dados de entrada antes de acessar o banco de dados
    var testeDados = PagamentoCtrl.validarDados(obj);
    if (testeDados.Erro) {
      next(testeDados.Erro);
    } else {
      let passos = [async.apply(PagamentoCtrl.getPagador, pagamento),
      PagamentoCtrl.getRecebedor,
      PagamentoCtrl.getCalculos,
      PagamentoCtrl.realizarPagamento,
      PagamentoCtrl.salvaPagamento,
      PagamentoCtrl.salvaLancamento
      ];
      try {
        async.waterfall(passos,
          (err, data: any) => {
            if (err) {
              //console.log(err);
              next(err);
            }
            else {
              var retorno = { saldoOrigem: data.loglancamento.saldoPagador, saldoSaida: data.loglancamento.saldoRecebedor, status: 200, valorLiquido: data.valorLiquido };
              res.json(retorno);

            }
          });
      } catch (error) {
        //console.log("Try catch");
        //console.error(error);
        next(error);
      }
    }

  };
  public static getPagador(pag, callback) {
    ContaCorrenteCtrl.getById(pag.pagante).then(pagador => {
      pag.pagador = pagador;
      if (pagador)
        callback(null, pag);
      else
        callback("Erro ao buscar pagador", null);
    });
  }
  public static getRecebedor(pag, callback) {
    ContaCorrenteCtrl.getById(pag.recebendo).then(recebedor => {
      pag.recebedor = recebedor;
      if (recebedor)
        callback(null, pag);
      else
        callback("Erro ao buscar recebedor", null);
    });
  }
  public static getCalculos(pag, callback) {
    PagamentoCtrl.compararSaldos(pag).then(juros => {
      pag.valorLiquido = juros;
      if (juros)
        callback(null, pag);
      else
        callback("Erro ao processar juros", null);
    });
  }
  public static salvaLancamento(pag, callback) {
    //console.log(pag);
    LancamentoModel.create(pag.lancamento, (err: any, data: any) => {
      if (err) callback(err, null);
      else {
        pag.loglancamento = data
        callback(null, pag);
      }
    });
  }
  public static salvaPagamento(pag, callback) {
    PagamentoModel.create(pag.logpagamento, (err: any, data: any) => {
      if (err) callback(err, null);
      else {
        pag.log = data;
        callback(null, pag);
      }
    });
  }

  public static realizarPagamento(pag, callback) {
    var liquido = Number(pag.valorLiquido);
    var pagador: IContaCorrenteModel = pag.pagador;
    var recebedor: IContaCorrenteModel = pag.recebedor;
    // retira e adiciona dinheiro
    pagador.saldo = Number(pagador.saldo) - liquido;
    recebedor.saldo = Number(recebedor.saldo) + liquido;
    var lancamento: any = {
      saldoPagador: pagador.saldo, saldoRecebedor: recebedor.saldo,
      valorTotal: liquido, pagador: pagador._id, recebedor: recebedor._id, parcelas: pag.parcelas
    };
    var requisicao: any = {
      pagador: pagador._id, recebedor: recebedor._id, parcelas: pag.parcelas, valor: pag.valor
    };
    var varias = {};
    async function start() {
      try {
        transaction.update("contacorrente", pagador.id, pagador), (err, pago) => {
          if (err || pago === null) callback(err, err);
          else {
            varias = (pago);
          }
        };
        transaction.update("contacorrente", recebedor.id, recebedor), (err, recebido) => {
          if (err || recebido === null) callback(err, err);
          else {
            varias = (recebido);
          }
        };

        var final = await transaction.run();
        pag.transacoes = final;
        pag.lancamento = lancamento;
        pag.logpagamento = requisicao;
        callback(null, pag);

      } catch (error) {

        const rollbackObj = await transaction.rollback().catch();
        // Erro ao realizar pagamento', null);
        callback(error, null);
        transaction.clean()
      }
    }

    start()
  }

  private static validarIDContaCorrente(id: string): boolean {
    //objectID do mongo db possui 24 caracteres 
    if (id.length != 24) { return true }
    else
      return false;
  }

  private static compararSaldos(obj: any) {
    var valorComJuros = Utils.calcularJuros(obj.valor, obj.parcelas);
    var erroJuros = false;
    var labelErro = "";
    if (valorComJuros) {
      if (obj.pagador.saldo > valorComJuros) {
        erroJuros = true;
      }
      else {
        labelErro = "Saldo insuficiente";
      }
    }
    return new Promise<any>((resolve, reject) => {
      if (erroJuros) {
        resolve(valorComJuros)
      } else {
        if (labelErro) {
          reject(labelErro)
        }
        else {
          reject("Erro ao comparar juros");
        }
      }
    }).catch((erro) => {
      console.error(erro);
    });
  }

  private static validarDados(obj: any): any {
    var valor: Double;
    var parcelas: Int32;
    if (PagamentoCtrl.validarIDContaCorrente(obj.pagador)) {
      return ({ 'Erro': 'Pagador Inválido' })
    }
    if (PagamentoCtrl.validarIDContaCorrente(obj.recebedor)) {
      return ({ 'Erro': 'Recebedor Inválido' })
    }
    try {
      valor = obj.valor;
    } catch (err) {
      return ({ 'Erro': 'Valor Inválido' });
    }
    try {
      parcelas = obj.parcelas;
    } catch (err) {
      return ({ 'Erro': 'Parcelas Inválido' });
    }
    if (valor < 0) {
      return ({ 'Erro': 'Valor Negativo' });
    }
    if (parcelas < 1 || parcelas > 3) {
      return ({ 'Erro': 'Quantidade de parcelas Inválida' });
    }
    return true;
  }
}
export default PagamentoCtrl;