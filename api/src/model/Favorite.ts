import { IDefault, Inject } from "./IDefault";
import * as mongoose from "mongoose";

export interface IFavorite extends IDefault, mongoose.Document {
    id: string;
    uid: string;
    promos: Array<any>;
}

let schema = {
    uid: { type: String, required: true, index: true, trim: true },
    promos: [{ id: { type: mongoose.Schema.Types.ObjectId, ref: "promo" } }]
};

Inject(schema);
export const FavoriteMasterSchema = new mongoose.Schema(schema);
export const Favorite = mongoose.model<IFavorite>(
    "favorite",
    FavoriteMasterSchema,
    "favorite",
    false
);
