import * as express from 'express';
import UsuarioCtrl from '../controllers/UsuarioCtrl';
import { photosModel } from '../model/definitions/Photo';
import PhotoCtlr from '../controllers/photoCtlr';

var mcache = require('memory-cache');

var router = express.Router();

var cache = (duration) => {
  return (req, res, next) => {
   let key = '__express__' + req.originalUrl || req.url
   let cachedBody = mcache.get(key)
   if (cachedBody) {
    console.log("tem algo no cache");
     res.send(cachedBody)
     return
   } else {
    console.log("não existe");
     res.sendResponse = res.send
     res.send = (body) => {
       //console.log(body);
       mcache.put(key, body, duration * 100000);
       res.sendResponse(body)
     }
    next();
   }
 }
}
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

router.post('/salvarFotos', descache() ,PhotoCtlr.putPhotos);
router.get('/carregarAlbuns/:id', cache(10), PhotoCtlr.buscarAlbuns);
router.get('/carregarFotos/:id', cache(10), PhotoCtlr.buscarAlbum);
router.post('/apagarFoto', PhotoCtlr.deletarFoto);
router.put('/addFotos', descache(),PhotoCtlr.addFotos);

export = router;