import * as express from 'express';
import ContaCorrenteCtrl from '../controllers/ContaCorrenteCtrl';
import PagamentoCtrl from '../controllers/PagamentoCtrl';

var router = express.Router();

router.post('/conta' , ContaCorrenteCtrl.create);
router.post('/pagar' , PagamentoCtrl.create);


export = router;