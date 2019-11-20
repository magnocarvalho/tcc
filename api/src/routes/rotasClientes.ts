import * as express from "express";
import UserCtrl from "../controllers/EmpresaCtrl";
import PromoCtrl from "../controllers/PromoCtrl";
import TipoCtrl from "../controllers/TipoCtrl";
import FavoriteCtrl from "../controllers/FavoriteCtrl";
import firewallbase from "../middleware/firewallbase";

var rotasCliente = express.Router();

// tipo de comercio
rotasCliente.get("/tipos", TipoCtrl.getTipos);
//favoritos e empresa
rotasCliente.use("/", firewallbase);
rotasCliente.get("/promos:lat?:lng?:distance?", PromoCtrl.getPromos);
rotasCliente.get("/empresa:empresa?:uid?", UserCtrl.findByIdAllPromos);
rotasCliente.get("/favorites", FavoriteCtrl.getFavorites);
rotasCliente.post("/favorites", FavoriteCtrl.createFavorites);
rotasCliente.put("/favorites", FavoriteCtrl.deleteFavorite);

export = rotasCliente;
