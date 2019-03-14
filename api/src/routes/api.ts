import * as express from 'express';
import UsuarioCtrl from '../controllers/UsuarioCtrl';
import { photosModel } from '../model/definitions/Photo';
import PhotoCtlr from '../controllers/photoCtlr';
import PublicacaoCtlr from '../controllers/PublicacaoCtlr';

var mcache = require('memory-cache');

var router = express.Router();

router.post('/salvarUsuario',UsuarioCtrl.create);
router.post('/loginUser', UsuarioCtrl.login);

router.post('/salvarFotos' ,PhotoCtlr.putPhotos);
router.post('/publicacao', PublicacaoCtlr.create);
router.get('/carregarAlbuns/:id', PhotoCtlr.buscarAlbuns);
router.get('/carregarFotos/:id', PhotoCtlr.buscarAlbum);
router.post('/apagarFoto', PhotoCtlr.deletarFoto);
router.put('/addFotos',PhotoCtlr.addFotos);

export = router;