import * as express from 'express';
import UsuarioCtrl from '../controllers/UsuarioCtrl';
import { photosModel } from '../model/definitions/Photo';
import PhotoCtlr from '../controllers/photoCtlr';

var mcache = require('memory-cache');

var router = express.Router();


var descache = () => {
 return (req, res, next) => {
  let key = '__express__' + req.originalUrl || req.url;
  let cachedBody = mcache.get(mcache.keys()[0]);
  if(cachedBody){
    mcache.clear();
  }
  next();
   
 }
}
router.post('/salvarUsuario',UsuarioCtrl.create);
router.post('/loginUser', UsuarioCtrl.login);

router.post('/salvarFotos' ,PhotoCtlr.putPhotos);
router.get('/carregarAlbuns/:id', PhotoCtlr.buscarAlbuns);
router.get('/carregarFotos/:id', PhotoCtlr.buscarAlbum);
router.post('/apagarFoto', PhotoCtlr.deletarFoto);
router.put('/addFotos',PhotoCtlr.addFotos);

export = router;