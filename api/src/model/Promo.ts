import { IDefault, Inject } from "./IDefault";
import * as mongoose from "mongoose";
import { Moment } from "moment";

export interface IPromo extends IDefault, mongoose.Document {
  _id: String;
  title: String;
  initDate: Moment;
  endDate: Moment;
  thumbnail: String;
  initPrice: Number;
  endPrice: Number;
  descont: Number;
  about: String;
  favorito: boolean;
}
let schema = {
  title: { type: String, required: true },
  initDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  thumbnail: { type: String, required: true },
  initPrice: { type: Number, required: true },
  endPrice: { type: Number, required: true },
  descont: { type: Number },
  about: { type: String, required: true },
  favoritos: { type: Number, default: 0 }
};

Inject(schema);
export const PromoMasterSchema = new mongoose.Schema(schema);
export const Promo = mongoose.model<IPromo>(
  "promo",
  PromoMasterSchema,
  "promo",
  false
);
